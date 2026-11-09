import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Category, Collection, Json, Product, ProductVariant } from "@/lib/catalog/types";
import { DEMO_CATEGORIES, DEMO_COLLECTIONS, DEMO_PRODUCTS } from "@/lib/demo-data";
import { STORE_HOURS } from "@/lib/constants";
import { uniqueSlug } from "./validate";
import { processImage } from "./images";
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
 * Stockage en fichiers, utilisé quand aucune base PostgreSQL n'est configurée (DATABASE_URL vide).
 * Tout le catalogue tient dans catalogue.json, les photos envoyées vont dans uploads/
 * et sont servies par la route /media/[file].
 * Sur le serveur, HOALY_DATA_DIR place ces fichiers hors du dossier du site (ex. /var/lib/hoaly),
 * pour qu'ils survivent aux mises à jour et soient sauvegardés à part.
 */

const DATA_DIR = process.env.HOALY_DATA_DIR || path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "catalogue.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

type StoredProduct = Omit<Product, "category" | "collection" | "variants">;

interface LocalDb {
  version: 1;
  categories: Category[];
  collections: Collection[];
  products: StoredProduct[];
  variants: ProductVariant[];
  settings: Record<string, Json>;
}

// ─── Données de départ (catalogue de démonstration) ───────────────

function seed(): LocalDb {
  const now = new Date().toISOString();
  const collectionFor = (cover: string | null) =>
    cover ? DEMO_COLLECTIONS.find((c) => c.images.includes(cover))?.id ?? null : null;

  return {
    version: 1,
    categories: DEMO_CATEGORIES.map((c) => ({ ...c, created_at: now })),
    collections: DEMO_COLLECTIONS.map((c) => ({ ...c, created_at: now })),
    products: DEMO_PRODUCTS.map(({ category: _c, variants: _v, ...p }) => ({
      ...p,
      collection_id: collectionFor(p.cover_image),
      created_at: now,
      updated_at: now,
    })),
    variants: DEMO_PRODUCTS.flatMap((p) => (p.variants ?? []).map((v, i) => ({ ...v, display_order: i }))),
    settings: {
      store_hours: STORE_HOURS,
      announcement: { enabled: false, text: "" },
    },
  };
}

// ─── Lecture / écriture du fichier ────────────────────────────────

function isReadOnlyError(e: unknown): boolean {
  const code = (e as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

// État partagé entre les modules (en dev, chaque route peut charger sa propre copie de ce fichier).
const shared = globalThis as unknown as {
  __hoalyStoreQueue?: Promise<unknown>;
  __hoalyStoreSeeding?: Promise<LocalDb>;
};

async function load(): Promise<LocalDb> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as LocalDb;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
      // Fichier présent mais illisible : on ne l'écrase surtout pas.
      throw new Error(`Impossible de lire ${DB_FILE} : ${(e as Error).message}`);
    }
    // Premier lancement : un seul appel crée le fichier, les lectures simultanées l'attendent.
    shared.__hoalyStoreSeeding ??= createSeedFile().finally(() => {
      shared.__hoalyStoreSeeding = undefined;
    });
    return shared.__hoalyStoreSeeding;
  }
}

async function createSeedFile(): Promise<LocalDb> {
  const db = seed();
  try {
    await save(db);
  } catch (err) {
    // Hébergement en lecture seule (ex. Vercel sans base) : on sert la démo sans l'enregistrer.
    if (!isReadOnlyError(err)) throw err;
  }
  return db;
}

async function save(db: LocalDb): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_FILE);
}

// Les écritures passent l'une après l'autre pour ne jamais perdre une modification.
const globalQueue = shared;

function mutate<T>(fn: (db: LocalDb) => T): Promise<T> {
  const previous = globalQueue.__hoalyStoreQueue ?? Promise.resolve();
  const run = previous.then(async () => {
    const db = await load();
    const result = fn(db);
    try {
      await save(db);
    } catch (e) {
      if (isReadOnlyError(e)) {
        throw new ValidationError(
          "Le stockage en fichiers est en lecture seule sur cet hébergement : branchez une base PostgreSQL (DATABASE_URL) pour modifier le catalogue."
        );
      }
      throw e;
    }
    return result;
  });
  globalQueue.__hoalyStoreQueue = run.catch(() => undefined);
  return run;
}

// ─── Assemblage d'un produit avec ses relations ───────────────────

function hydrate(db: LocalDb, p: StoredProduct): Product {
  return {
    ...p,
    category: db.categories.find((c) => c.id === p.category_id) ?? null,
    collection: db.collections.find((c) => c.id === p.collection_id) ?? null,
    variants: db.variants
      .filter((v) => v.product_id === p.id)
      .sort((a, b) => a.display_order - b.display_order),
  };
}

function findIndex<T extends { id: string }>(list: T[], id: string, label: string): number {
  const i = list.findIndex((item) => item.id === id);
  if (i === -1) throw new NotFoundError(`${label} introuvable.`);
  return i;
}

function checkRefs(db: LocalDb, input: Partial<ProductInput>) {
  if (input.category_id && !db.categories.some((c) => c.id === input.category_id)) {
    throw new ValidationError("Cette catégorie n'existe plus.");
  }
  if (input.collection_id && !db.collections.some((c) => c.id === input.collection_id)) {
    throw new ValidationError("Cette collection n'existe plus.");
  }
}

function replaceVariants(db: LocalDb, productId: string, variants: VariantInput[]) {
  const previous = new Map(db.variants.filter((v) => v.product_id === productId).map((v) => [v.id, v]));
  db.variants = db.variants.filter((v) => v.product_id !== productId);
  variants.forEach((v, i) => {
    const kept = v.id ? previous.get(v.id) : undefined;
    db.variants.push({
      id: kept?.id ?? randomUUID(),
      product_id: productId,
      color_name: v.color_name,
      color_hex: v.color_hex,
      size: v.size,
      stock: v.stock,
      sku: kept?.sku ?? null,
      display_order: i,
    });
  });
}

// ─── Implémentation ───────────────────────────────────────────────

export const localStore: CatalogStore = {
  mode: "local",

  // Catégories
  async listCategories() {
    return (await load()).categories;
  },

  createCategory(input: CategoryInput) {
    return mutate((db) => {
      const category: Category = {
        id: randomUUID(),
        slug: uniqueSlug(input.name, db.categories.map((c) => c.slug)),
        ...input,
        created_at: new Date().toISOString(),
      };
      db.categories.push(category);
      return category;
    });
  },

  updateCategory(id, input) {
    return mutate((db) => {
      const i = findIndex(db.categories, id, "Catégorie");
      const current = db.categories[i];
      const slug =
        input.name && input.name !== current.name
          ? uniqueSlug(input.name, db.categories.filter((c) => c.id !== id).map((c) => c.slug))
          : current.slug;
      db.categories[i] = { ...current, ...input, slug };
      return db.categories[i];
    });
  },

  deleteCategory(id) {
    return mutate((db) => {
      findIndex(db.categories, id, "Catégorie");
      db.categories = db.categories.filter((c) => c.id !== id);
      for (const p of db.products) if (p.category_id === id) p.category_id = null;
    });
  },

  // Collections
  async listCollections() {
    return (await load()).collections;
  },

  createCollection(input: CollectionInput) {
    return mutate((db) => {
      const collection: Collection = {
        id: randomUUID(),
        slug: uniqueSlug(input.name, db.collections.map((c) => c.slug)),
        ...input,
        cover_image: input.images[0] ?? null,
        created_at: new Date().toISOString(),
      };
      db.collections.push(collection);
      return collection;
    });
  },

  updateCollection(id, input) {
    return mutate((db) => {
      const i = findIndex(db.collections, id, "Collection");
      const current = db.collections[i];
      const slug =
        input.name && input.name !== current.name
          ? uniqueSlug(input.name, db.collections.filter((c) => c.id !== id).map((c) => c.slug))
          : current.slug;
      const images = input.images ?? current.images;
      db.collections[i] = { ...current, ...input, slug, images, cover_image: images[0] ?? null };
      return db.collections[i];
    });
  },

  deleteCollection(id) {
    return mutate((db) => {
      findIndex(db.collections, id, "Collection");
      db.collections = db.collections.filter((c) => c.id !== id);
      for (const p of db.products) if (p.collection_id === id) p.collection_id = null;
    });
  },

  // Produits
  async listProducts() {
    const db = await load();
    return db.products.map((p) => hydrate(db, p));
  },

  async getProduct(id) {
    const db = await load();
    const p = db.products.find((item) => item.id === id);
    return p ? hydrate(db, p) : null;
  },

  createProduct(input: ProductInput) {
    return mutate((db) => {
      checkRefs(db, input);
      const { variants, ...fields } = input;
      const now = new Date().toISOString();
      const product: StoredProduct = {
        id: randomUUID(),
        slug: uniqueSlug(input.name, db.products.map((p) => p.slug)),
        ...fields,
        cover_image: fields.images[0] ?? null,
        display_order: 0,
        created_at: now,
        updated_at: now,
      };
      // Les nouveautés apparaissent en tête de liste.
      db.products.unshift(product);
      replaceVariants(db, product.id, variants);
      return hydrate(db, product);
    });
  },

  updateProduct(id, input) {
    return mutate((db) => {
      const i = findIndex(db.products, id, "Produit");
      checkRefs(db, input);
      const { variants, ...fields } = input;
      const current = db.products[i];
      const slug =
        fields.name && fields.name !== current.name
          ? uniqueSlug(fields.name, db.products.filter((p) => p.id !== id).map((p) => p.slug))
          : current.slug;
      const images = fields.images ?? current.images;
      db.products[i] = {
        ...current,
        ...fields,
        slug,
        images,
        cover_image: images[0] ?? null,
        updated_at: new Date().toISOString(),
      };
      if (variants) replaceVariants(db, id, variants);
      return hydrate(db, db.products[i]);
    });
  },

  deleteProduct(id) {
    return mutate((db) => {
      findIndex(db.products, id, "Produit");
      db.products = db.products.filter((p) => p.id !== id);
      db.variants = db.variants.filter((v) => v.product_id !== id);
    });
  },

  updateVariantStock(id, stock) {
    return mutate((db) => {
      const i = findIndex(db.variants, id, "Variante");
      db.variants[i] = { ...db.variants[i], stock };
    });
  },

  // Paramètres
  async getSettings() {
    return (await load()).settings;
  },

  setSetting(key, value) {
    return mutate((db) => {
      db.settings[key] = value;
    });
  },

  // Photos
  async saveImage(file) {
    return localStore.storeImage(await processImage(file));
  },

  async storeImage(image) {
    const name = `${Date.now()}-${randomUUID().slice(0, 8)}.${image.extension}`;
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOADS_DIR, name), image.data);
    } catch (e) {
      if (isReadOnlyError(e)) {
        throw new ValidationError("Impossible d'enregistrer la photo : le dossier des photos n'est pas accessible en écriture sur ce serveur.");
      }
      throw e;
    }
    return `/media/${name}`;
  },
};
