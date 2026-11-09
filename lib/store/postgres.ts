import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { Pool, type PoolClient, type PoolConfig } from "pg";
import type { Category, Collection, Json, Product, ProductVariant } from "@/lib/catalog/types";
import { localStore } from "./local";
import { uniqueSlug } from "./validate";
import {
  NotFoundError,
  ValidationError,
  type CatalogStore,
  type CategoryInput,
  type CollectionInput,
  type ProductInput,
  type VariantInput,
} from "./types";

/*
 * Stockage PostgreSQL, utilisé dès que DATABASE_URL est renseignée.
 * Fonctionne avec PostgreSQL sur le VPS, IONOS Cloud DBaaS ou Supabase (schéma : db/schema.sql).
 * Les photos restent des fichiers sur le serveur (HOALY_DATA_DIR/uploads), servies par /media.
 */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Chiffrement de la connexion, réglé par DATABASE_SSL :
 * - auto (défaut) : aucun en local, chiffré pour une base distante ;
 * - require : chiffré, sans vérifier le certificat du serveur ;
 * - verify : chiffré et certificat vérifié (DATABASE_SSL_CA = chemin du certificat d'autorité si besoin) ;
 * - disable : jamais chiffré.
 */
export function postgresConfig(): PoolConfig {
  const url = new URL(process.env.DATABASE_URL ?? "");
  // Le mode SSL est géré ici, pas dans l'adresse (les interprétations de « sslmode » varient selon les versions).
  for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) url.searchParams.delete(key);

  const mode = process.env.DATABASE_SSL ?? "auto";
  let ssl: PoolConfig["ssl"] = false;
  if (mode === "verify") {
    ssl = {
      rejectUnauthorized: true,
      ...(process.env.DATABASE_SSL_CA ? { ca: readFileSync(process.env.DATABASE_SSL_CA, "utf8") } : {}),
    };
  } else if (mode === "require" || (mode === "auto" && !LOCAL_HOSTS.has(url.hostname))) {
    ssl = { rejectUnauthorized: false };
  }
  return {
    connectionString: url.toString(),
    ssl,
    max: Number(process.env.DATABASE_POOL_MAX) || 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };
}

// Un seul groupe de connexions pour tout le serveur (y compris entre rechargements en développement).
const shared = globalThis as unknown as { __hoalyPgPool?: Pool };

function pool(): Pool {
  shared.__hoalyPgPool ??= new Pool(postgresConfig());
  return shared.__hoalyPgPool;
}

/** Erreurs PostgreSQL traduites en messages lisibles pour l'admin. */
function translate(e: unknown): never {
  const code = (e as { code?: string })?.code;
  if (code === "23503") throw new ValidationError("La catégorie ou la collection choisie n'existe plus.");
  if (code === "23505") throw new ValidationError("Ce nom est déjà utilisé.");
  if (code === "23514") throw new ValidationError("Valeur invalide (prix ou stock négatif).");
  throw e;
}

async function query<T>(text: string, params: unknown[] = [], client?: PoolClient): Promise<T[]> {
  try {
    const result = await (client ?? pool()).query(text, params);
    return result.rows as T[];
  } catch (e) {
    translate(e);
  }
}

async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool().connect();
  try {
    await client.query("begin");
    const result = await fn(client);
    await client.query("commit");
    return result;
  } catch (e) {
    await client.query("rollback").catch(() => undefined);
    throw e;
  } finally {
    client.release();
  }
}

// ─── Conversion des lignes ────────────────────────────────────────

const iso = (d: unknown) => (d instanceof Date ? d.toISOString() : String(d ?? ""));

function toCategory(r: Record<string, unknown>): Category {
  return { ...(r as unknown as Category), created_at: iso(r.created_at) };
}

function toCollection(r: Record<string, unknown>): Collection {
  return { ...(r as unknown as Collection), images: (r.images as string[]) ?? [], created_at: iso(r.created_at) };
}

function toVariant(r: Record<string, unknown>): ProductVariant {
  return r as unknown as ProductVariant;
}

function toProduct(
  r: Record<string, unknown>,
  categories: Map<string, Category>,
  collections: Map<string, Collection>,
  variants: ProductVariant[]
): Product {
  const p = r as unknown as Product;
  return {
    ...p,
    price: Number(r.price),
    images: (r.images as string[]) ?? [],
    created_at: iso(r.created_at),
    updated_at: iso(r.updated_at),
    category: p.category_id ? categories.get(p.category_id) ?? null : null,
    collection: p.collection_id ? collections.get(p.collection_id) ?? null : null,
    variants: variants.filter((v) => v.product_id === p.id).sort((a, b) => a.display_order - b.display_order),
  };
}

async function takenSlugs(table: string, excludeId?: string, client?: PoolClient): Promise<string[]> {
  const rows = await query<{ slug: string }>(
    `select slug from ${table} where id <> $1`,
    [excludeId ?? ""],
    client
  );
  return rows.map((r) => r.slug);
}

/** Construit « col1 = $1, col2 = $2 » à partir des seuls champs fournis. */
function setClause(fields: Record<string, unknown>, allowed: string[], start = 1) {
  const keys = Object.keys(fields).filter((k) => allowed.includes(k) && fields[k] !== undefined);
  return {
    sql: keys.map((k, i) => `${k} = $${start + i}`).join(", "),
    values: keys.map((k) => fields[k]),
  };
}

async function replaceVariants(client: PoolClient, productId: string, variants: VariantInput[]) {
  await query("delete from product_variants where product_id = $1", [productId], client);
  for (const [i, v] of variants.entries()) {
    await query(
      `insert into product_variants (id, product_id, color_name, color_hex, size, stock, display_order)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [v.id ?? randomUUID(), productId, v.color_name, v.color_hex, v.size, v.stock, i],
      client
    );
  }
}

async function loadProducts(where = "", params: unknown[] = []): Promise<Product[]> {
  const [rows, variants, categories, collections] = await Promise.all([
    query<Record<string, unknown>>(`select * from products ${where} order by created_at desc, id`, params),
    query<Record<string, unknown>>(
      where
        ? `select * from product_variants where product_id in (select id from products ${where})`
        : "select * from product_variants",
      params
    ),
    query<Record<string, unknown>>("select * from categories"),
    query<Record<string, unknown>>("select * from collections"),
  ]);
  const catMap = new Map(categories.map((c) => [c.id as string, toCategory(c)]));
  const colMap = new Map(collections.map((c) => [c.id as string, toCollection(c)]));
  const vars = variants.map(toVariant);
  return rows.map((r) => toProduct(r, catMap, colMap, vars));
}

// ─── Implémentation ───────────────────────────────────────────────

const CATEGORY_FIELDS = ["name", "slug", "description", "cover_image", "display_order"];
const COLLECTION_FIELDS = ["name", "slug", "short_name", "description", "images", "cover_image", "is_archived", "display_order"];
const PRODUCT_FIELDS = [
  "name", "slug", "description", "category_id", "collection_id", "price",
  "images", "cover_image", "is_featured", "is_active",
];

export const postgresStore: CatalogStore = {
  mode: "postgres",

  // Catégories
  async listCategories() {
    return (await query<Record<string, unknown>>("select * from categories order by display_order, name")).map(toCategory);
  },

  async createCategory(input: CategoryInput) {
    const slug = uniqueSlug(input.name, await takenSlugs("categories"));
    const [row] = await query<Record<string, unknown>>(
      `insert into categories (id, slug, name, description, cover_image, display_order)
       values ($1, $2, $3, $4, $5, $6) returning *`,
      [randomUUID(), slug, input.name, input.description, input.cover_image, input.display_order]
    );
    return toCategory(row);
  },

  async updateCategory(id, input) {
    return transaction(async (client) => {
      const [current] = await query<{ name: string }>("select name from categories where id = $1", [id], client);
      if (!current) throw new NotFoundError("Catégorie introuvable.");
      const fields: Record<string, unknown> = { ...input };
      if (input.name && input.name !== current.name) {
        fields.slug = uniqueSlug(input.name, await takenSlugs("categories", id, client));
      }
      const set = setClause(fields, CATEGORY_FIELDS, 2);
      const [row] = set.sql
        ? await query<Record<string, unknown>>(`update categories set ${set.sql} where id = $1 returning *`, [id, ...set.values], client)
        : await query<Record<string, unknown>>("select * from categories where id = $1", [id], client);
      return toCategory(row);
    });
  },

  async deleteCategory(id) {
    const rows = await query("delete from categories where id = $1 returning id", [id]);
    if (!rows.length) throw new NotFoundError("Catégorie introuvable.");
  },

  // Collections
  async listCollections() {
    return (await query<Record<string, unknown>>("select * from collections order by display_order, name")).map(toCollection);
  },

  async createCollection(input: CollectionInput) {
    const slug = uniqueSlug(input.name, await takenSlugs("collections"));
    const [row] = await query<Record<string, unknown>>(
      `insert into collections (id, slug, name, short_name, description, images, cover_image, is_archived, display_order)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
      [
        randomUUID(), slug, input.name, input.short_name, input.description, input.images,
        input.images[0] ?? null, input.is_archived, input.display_order,
      ]
    );
    return toCollection(row);
  },

  async updateCollection(id, input) {
    return transaction(async (client) => {
      const [current] = await query<{ name: string }>("select name from collections where id = $1", [id], client);
      if (!current) throw new NotFoundError("Collection introuvable.");
      const fields: Record<string, unknown> = { ...input };
      if (input.name && input.name !== current.name) {
        fields.slug = uniqueSlug(input.name, await takenSlugs("collections", id, client));
      }
      if (input.images) fields.cover_image = input.images[0] ?? null;
      const set = setClause(fields, COLLECTION_FIELDS, 2);
      const [row] = set.sql
        ? await query<Record<string, unknown>>(`update collections set ${set.sql} where id = $1 returning *`, [id, ...set.values], client)
        : await query<Record<string, unknown>>("select * from collections where id = $1", [id], client);
      return toCollection(row);
    });
  },

  async deleteCollection(id) {
    const rows = await query("delete from collections where id = $1 returning id", [id]);
    if (!rows.length) throw new NotFoundError("Collection introuvable.");
  },

  // Produits
  async listProducts() {
    return loadProducts();
  },

  async getProduct(id) {
    return (await loadProducts("where id = $1", [id]))[0] ?? null;
  },

  async createProduct(input: ProductInput) {
    const id = randomUUID();
    await transaction(async (client) => {
      const { variants, ...fields } = input;
      const slug = uniqueSlug(input.name, await takenSlugs("products", undefined, client));
      await query(
        `insert into products (id, slug, name, description, category_id, collection_id, price, images, cover_image, is_featured, is_active)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          id, slug, fields.name, fields.description, fields.category_id, fields.collection_id, fields.price,
          fields.images, fields.images[0] ?? null, fields.is_featured, fields.is_active,
        ],
        client
      );
      await replaceVariants(client, id, variants);
    });
    return (await postgresStore.getProduct(id))!;
  },

  async updateProduct(id, input) {
    await transaction(async (client) => {
      const [current] = await query<{ name: string }>("select name from products where id = $1 for update", [id], client);
      if (!current) throw new NotFoundError("Produit introuvable.");
      const { variants, ...rest } = input;
      const fields: Record<string, unknown> = { ...rest };
      if (rest.name && rest.name !== current.name) {
        fields.slug = uniqueSlug(rest.name, await takenSlugs("products", id, client));
      }
      if (rest.images) fields.cover_image = rest.images[0] ?? null;
      const set = setClause(fields, PRODUCT_FIELDS, 2);
      await query(
        `update products set ${set.sql ? `${set.sql}, ` : ""}updated_at = now() where id = $1`,
        [id, ...set.values],
        client
      );
      if (variants) await replaceVariants(client, id, variants);
    });
    return (await postgresStore.getProduct(id))!;
  },

  async deleteProduct(id) {
    const rows = await query("delete from products where id = $1 returning id", [id]);
    if (!rows.length) throw new NotFoundError("Produit introuvable.");
  },

  async updateVariantStock(id, stock) {
    const rows = await query("update product_variants set stock = $2 where id = $1 returning id", [id, stock]);
    if (!rows.length) throw new NotFoundError("Variante introuvable.");
  },

  // Réglages
  async getSettings() {
    const rows = await query<{ key: string; value: Json }>("select key, value from site_settings");
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },

  async setSetting(key, value) {
    await query(
      `insert into site_settings (key, value, updated_at) values ($1, $2, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    );
  },

  // Photos : fichiers sur le serveur, comme pour le stockage en fichiers.
  saveImage(file) {
    return localStore.saveImage(file);
  },

  storeImage(image) {
    return localStore.storeImage(image);
  },
};
