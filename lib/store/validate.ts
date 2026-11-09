import { slugify } from "@/lib/utils";
import type { Json } from "@/lib/catalog/types";
import {
  ValidationError,
  type CategoryInput,
  type CollectionInput,
  type ProductInput,
  type VariantInput,
} from "./types";

// Lecture et contrôle des données envoyées par l'admin, avant tout enregistrement.
// Les limites protègent le site : une saisie aberrante (ou un compte admin compromis)
// ne doit jamais pouvoir faire planter les pages publiques.

export const LIMITS = {
  name: 150,
  shortName: 40,
  description: 5000,
  colorName: 40,
  size: 12,
  price: 100_000,
  stock: 100_000,
  order: 10_000,
  images: 20,
  url: 600,
  hours: 60,
  announcement: 300,
};

type Body = Record<string, unknown>;

function asBody(value: unknown): Body {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("Données invalides.");
  }
  return value as Body;
}

function text(body: Body, key: string, label: string, max: number, required = false): string | null {
  const raw = body[key];
  if (raw === undefined || raw === null || raw === "") {
    if (required) throw new ValidationError(`${label} est obligatoire.`);
    return null;
  }
  if (typeof raw !== "string") throw new ValidationError(`${label} est invalide.`);
  const value = raw.trim();
  if (required && !value) throw new ValidationError(`${label} est obligatoire.`);
  if (value.length > max) throw new ValidationError(`${label} : ${max} caractères maximum.`);
  return value || null;
}

function num(body: Body, key: string, label: string, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}): number {
  const raw = body[key];
  const value = typeof raw === "string" ? Number(raw.replace(",", ".")) : raw;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    throw new ValidationError(`${label} est invalide.`);
  }
  return value;
}

function bool(body: Body, key: string): boolean {
  return body[key] === true;
}

function order(body: Body): number {
  if (body.display_order === undefined) return 0;
  return Math.round(num(body, "display_order", "L'ordre", { min: -LIMITS.order, max: LIMITS.order }));
}

// ─── Photos ───────────────────────────────────────────────────────

/**
 * Seules des photos du site sont acceptées : envoyées depuis l'admin (/media), fournies avec le site
 * (/images) ou, pour le catalogue de démonstration, hébergées par Unsplash. Toute autre adresse
 * (javascript:, data:, site inconnu) ferait planter l'affichage des images.
 */
export function isAllowedImageUrl(url: string): boolean {
  if (url.length > LIMITS.url) return false;
  return (
    /^\/media\/[a-z0-9-]+\.(webp|jpe?g|png|avif)$/i.test(url) ||
    /^\/images\/[A-Za-z0-9 ._()+-]+\.(jpe?g|png|webp|avif)$/i.test(url) ||
    /^https:\/\/(images|plus)\.unsplash\.com\/[^\s"'<>\\]+$/.test(url)
  );
}

function image(body: Body, key: string): string | null {
  const url = text(body, key, "La photo", LIMITS.url);
  if (url && !isAllowedImageUrl(url)) throw new ValidationError("Adresse de photo non autorisée.");
  return url;
}

function images(body: Body, key: string): string[] {
  const raw = body[key] ?? [];
  if (!Array.isArray(raw) || raw.some((u) => typeof u !== "string" || !u)) {
    throw new ValidationError("Liste de photos invalide.");
  }
  if (raw.length > LIMITS.images) throw new ValidationError(`${LIMITS.images} photos maximum.`);
  if (raw.some((u) => !isAllowedImageUrl(u))) throw new ValidationError("Adresse de photo non autorisée.");
  return raw as string[];
}

/** Ne garde que les champs présents dans le corps, pour les mises à jour partielles. */
function pick<T extends object>(body: Body, full: () => T, keys: (keyof T)[]): Partial<T> {
  const present = keys.filter((k) => k in body);
  if (!present.length) return {};
  // On complète avec des valeurs neutres pour réutiliser les mêmes contrôles.
  const parsed = full();
  return Object.fromEntries(present.map((k) => [k, parsed[k]])) as Partial<T>;
}

// ─── Catégories ───────────────────────────────────────────────────

export function parseCategory(value: unknown): CategoryInput {
  const body = asBody(value);
  return {
    name: text(body, "name", "Le nom", LIMITS.name, true)!,
    description: text(body, "description", "La description", LIMITS.description),
    cover_image: image(body, "cover_image"),
    display_order: order(body),
  };
}

export function parseCategoryPatch(value: unknown): Partial<CategoryInput> {
  const body = asBody(value);
  return pick(body, () => parseCategory({ name: "x", ...body }), ["name", "description", "cover_image", "display_order"]);
}

// ─── Collections ──────────────────────────────────────────────────

export function parseCollection(value: unknown): CollectionInput {
  const body = asBody(value);
  const name = text(body, "name", "Le nom", LIMITS.name, true)!;
  return {
    name,
    short_name: text(body, "short_name", "Le nom court", LIMITS.shortName) ?? name.slice(0, LIMITS.shortName),
    description: text(body, "description", "La description", LIMITS.description),
    images: images(body, "images"),
    is_archived: bool(body, "is_archived"),
    display_order: order(body),
  };
}

export function parseCollectionPatch(value: unknown): Partial<CollectionInput> {
  const body = asBody(value);
  return pick(body, () => parseCollection({ name: "x", ...body }), [
    "name",
    "short_name",
    "description",
    "images",
    "is_archived",
    "display_order",
  ]);
}

// ─── Produits ─────────────────────────────────────────────────────

function parseVariants(raw: unknown): VariantInput[] {
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) throw new ValidationError("Variantes invalides.");
  if (raw.length > 500) throw new ValidationError("Trop de variantes.");
  return raw.map((item) => {
    const body = asBody(item);
    const id = typeof body.id === "string" && body.id && body.id.length <= 100 ? body.id : undefined;
    const color = /^#[0-9a-f]{6}$/i.test(String(body.color_hex)) ? String(body.color_hex) : "#000000";
    return {
      ...(id ? { id } : {}),
      color_name: text(body, "color_name", "Le nom de couleur", LIMITS.colorName, true)!,
      color_hex: color,
      size: text(body, "size", "La taille", LIMITS.size, true)!,
      stock: Math.round(num(body, "stock", "Le stock", { max: LIMITS.stock })),
    };
  });
}

export function parseProduct(value: unknown): ProductInput {
  const body = asBody(value);
  return {
    name: text(body, "name", "Le nom", LIMITS.name, true)!,
    description: text(body, "description", "La description", LIMITS.description),
    category_id: text(body, "category_id", "La catégorie", 100),
    collection_id: text(body, "collection_id", "La collection", 100),
    price: Math.round(num(body, "price", "Le prix", { max: LIMITS.price }) * 100) / 100,
    images: images(body, "images"),
    is_featured: bool(body, "is_featured"),
    is_active: body.is_active === undefined ? true : bool(body, "is_active"),
    variants: parseVariants(body.variants),
  };
}

export function parseProductPatch(value: unknown): Partial<ProductInput> {
  const body = asBody(value);
  return pick(body, () => parseProduct({ name: "x", price: 0, ...body }), [
    "name",
    "description",
    "category_id",
    "collection_id",
    "price",
    "images",
    "is_featured",
    "is_active",
    "variants",
  ]);
}

/** Stock seul (page Stocks). */
export function parseStock(value: unknown): number {
  const body = asBody(value);
  const stock = num(body, "stock", "Le stock", { max: LIMITS.stock });
  if (!Number.isInteger(stock)) throw new ValidationError("Le stock est invalide.");
  return stock;
}

// ─── Réglages ─────────────────────────────────────────────────────

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

/** Contrôle la forme de chaque réglage : une valeur mal formée casserait l'affichage des pages. */
export function parseSetting(value: unknown): { key: string; value: Json } {
  const body = asBody(value);
  if (body.key === "store_hours") {
    const hours = asBody(body.value);
    const result: Record<string, string> = {};
    for (const day of DAYS) {
      const v = text(hours, day, `L'horaire du ${day.toLowerCase()}`, LIMITS.hours);
      result[day] = v ?? "Fermé";
    }
    return { key: "store_hours", value: result };
  }
  if (body.key === "announcement") {
    const a = asBody(body.value);
    return {
      key: "announcement",
      value: { enabled: bool(a, "enabled"), text: text(a, "text", "Le texte du bandeau", LIMITS.announcement) ?? "" },
    };
  }
  throw new ValidationError("Paramètre inconnu.");
}

// ─── Utilitaires partagés par les deux stockages ──────────────────

/** Slug unique : « robe-rouge », puis « robe-rouge-2 », « robe-rouge-3 »... */
export function uniqueSlug(name: string, taken: Iterable<string>): string {
  const base = slugify(name).slice(0, 80).replace(/-+$/, "") || "article";
  const used = new Set(taken);
  if (!used.has(base)) return base;
  let i = 2;
  while (used.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
