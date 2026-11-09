#!/usr/bin/env node
// =============================================================================
// Prépare la base PostgreSQL du site Hoa Ly.
//   1. crée les tables (db/schema.sql), sans rien effacer ;
//   2. si la base est vide, importe le catalogue en fichiers (catalogue.json) :
//      catégories, collections, produits, variantes et réglages.
//
// Usage :
//   npm run db:setup                  -> tables + import si la base est vide
//   npm run db:setup -- --remplacer   -> vide la base puis réimporte le catalogue en fichiers
//
// Lit DATABASE_URL (et HOALY_DATA_DIR) dans .env.local, comme le site.
// =============================================================================
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import pg from "pg";

nextEnv.loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL est vide : renseignez-la dans .env.local (voir deploy/GUIDE-BDD.md).");
  process.exit(1);
}

// Même règle de chiffrement que le site (lib/store/postgres.ts).
function config() {
  const u = new URL(url);
  for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) u.searchParams.delete(key);
  const mode = process.env.DATABASE_SSL ?? "auto";
  const local = ["localhost", "127.0.0.1", "::1"].includes(u.hostname);
  let ssl = false;
  if (mode === "verify") {
    ssl = {
      rejectUnauthorized: true,
      ...(process.env.DATABASE_SSL_CA ? { ca: readFileSync(process.env.DATABASE_SSL_CA, "utf8") } : {}),
    };
  }
  else if (mode === "require" || (mode === "auto" && !local)) ssl = { rejectUnauthorized: false };
  return { connectionString: u.toString(), ssl, connectionTimeoutMillis: 15_000 };
}

const replace = process.argv.includes("--remplacer");
const dataDir = process.env.HOALY_DATA_DIR || path.join(process.cwd(), "data");
const date = (v) => (v ? v : null);

const client = new pg.Client(config());
try {
  await client.connect();
} catch (e) {
  console.error(`Connexion impossible à la base : ${e.message}`);
  process.exit(1);
}

try {
  await client.query(await readFile(path.join(process.cwd(), "db", "schema.sql"), "utf8"));
  console.log("Tables prêtes.");

  const { rows } = await client.query("select count(*)::int as n from products");
  if (rows[0].n > 0 && !replace) {
    console.log(`La base contient déjà ${rows[0].n} produits : import ignoré (ajoutez --remplacer pour réimporter).`);
    process.exit(0);
  }

  let data;
  try {
    data = JSON.parse(await readFile(path.join(dataDir, "catalogue.json"), "utf8"));
  } catch {
    console.log(`Aucun catalogue en fichiers dans ${dataDir} : la base reste vide.`);
    process.exit(0);
  }

  await client.query("begin");
  if (replace) await client.query("truncate product_variants, products, collections, categories, site_settings");

  for (const c of data.categories ?? []) {
    await client.query(
      `insert into categories (id, slug, name, description, cover_image, display_order, created_at)
       values ($1, $2, $3, $4, $5, $6, coalesce($7::timestamptz, now()))`,
      [c.id, c.slug, c.name, c.description, c.cover_image, c.display_order ?? 0, date(c.created_at)]
    );
  }
  for (const c of data.collections ?? []) {
    await client.query(
      `insert into collections (id, slug, name, short_name, description, cover_image, images, is_archived, display_order, created_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, coalesce($10::timestamptz, now()))`,
      [c.id, c.slug, c.name, c.short_name, c.description, c.cover_image, c.images ?? [], !!c.is_archived, c.display_order ?? 0, date(c.created_at)]
    );
  }
  for (const p of data.products ?? []) {
    await client.query(
      `insert into products (id, slug, name, description, category_id, collection_id, price, images, cover_image,
                             is_featured, is_active, display_order, created_at, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, coalesce($13::timestamptz, now()), coalesce($14::timestamptz, now()))`,
      [
        p.id, p.slug, p.name, p.description, p.category_id, p.collection_id ?? null, p.price, p.images ?? [],
        p.cover_image, !!p.is_featured, p.is_active !== false, p.display_order ?? 0, date(p.created_at), date(p.updated_at),
      ]
    );
  }
  for (const v of data.variants ?? []) {
    await client.query(
      `insert into product_variants (id, product_id, color_name, color_hex, size, stock, sku, display_order)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [v.id, v.product_id, v.color_name, v.color_hex, v.size, v.stock ?? 0, v.sku ?? null, v.display_order ?? 0]
    );
  }
  for (const [key, value] of Object.entries(data.settings ?? {})) {
    await client.query(
      `insert into site_settings (key, value) values ($1, $2)
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    );
  }
  await client.query("commit");

  console.log(
    `Catalogue importé : ${data.categories?.length ?? 0} catégories, ${data.collections?.length ?? 0} collections, ` +
      `${data.products?.length ?? 0} produits, ${data.variants?.length ?? 0} variantes.`
  );
  console.log("Les photos restent dans le dossier uploads/ du serveur : rien à déplacer.");
} catch (e) {
  await client.query("rollback").catch(() => undefined);
  console.error(`Échec : ${e.message}`);
  process.exitCode = 1;
} finally {
  await client.end();
}
