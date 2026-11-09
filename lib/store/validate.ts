import { slugify } from "@/lib/utils";
import {
  ValidationError,
  type CategoryInput,
  type CollectionInput,
  type ProductInput,
  type VariantInput,
} from "./types";

// Lecture et contrôle des données envoyées par l'admin, avant tout enregistrement.

type Body = Record<string, unknown>;

function asBody(value: unknown): Body {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("Données invalides.");
  }
  return value as Body;
}

function text(body: Body, key: string, label: string, required = false): string | null {
  const raw = body[key];
  if (raw === undefined || raw === null || raw === "") {
    if (required) throw new ValidationError(`${label} est obligatoire.`);
    return null;
  }
  if (typeof raw !== "string") throw new ValidationError(`${label} est invalide.`);
  const value = raw.trim();
  if (required && !value) throw new ValidationError(`${label} est obligatoire.`);
  return value || null;
}

function num(body: Body, key: string, label: string, { min = 0 } = {}): number {
  const raw = body[key];
  const value = typeof raw === "string" ? Number(raw.replace(",", ".")) : raw;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min) {
    throw new ValidationError(`${label} est invalide.`);
  }
  return value;
}

function bool(body: Body, key: string): boolean {
  return body[key] === true;
}

function urls(body: Body, key: string): string[] {
  const raw = body[key] ?? [];
  if (!Array.isArray(raw) || raw.some((u) => typeof u !== "string" || !u)) {
    throw new ValidationError("Liste de photos invalide.");
  }
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
    name: text(body, "name", "Le nom", true)!,
    description: text(body, "description", "La description"),
    cover_image: text(body, "cover_image", "La photo"),
    display_order: body.display_order === undefined ? 0 : Math.round(num(body, "display_order", "L'ordre")),
  };
}

export function parseCategoryPatch(value: unknown): Partial<CategoryInput> {
  const body = asBody(value);
  return pick(body, () => parseCategory({ name: "x", ...body }), ["name", "description", "cover_image", "display_order"]);
}

// ─── Collections ──────────────────────────────────────────────────

export function parseCollection(value: unknown): CollectionInput {
  const body = asBody(value);
  const name = text(body, "name", "Le nom", true)!;
  return {
    name,
    short_name: text(body, "short_name", "Le nom court") ?? name,
    description: text(body, "description", "La description"),
    images: urls(body, "images"),
    is_archived: bool(body, "is_archived"),
    display_order: body.display_order === undefined ? 0 : Math.round(num(body, "display_order", "L'ordre")),
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
  return raw.map((item) => {
    const body = asBody(item);
    const id = typeof body.id === "string" && body.id ? body.id : undefined;
    const color = /^#[0-9a-f]{6}$/i.test(String(body.color_hex)) ? String(body.color_hex) : "#000000";
    return {
      ...(id ? { id } : {}),
      color_name: text(body, "color_name", "Le nom de couleur", true)!,
      color_hex: color,
      size: text(body, "size", "La taille", true)!,
      stock: Math.round(num(body, "stock", "Le stock")),
    };
  });
}

export function parseProduct(value: unknown): ProductInput {
  const body = asBody(value);
  return {
    name: text(body, "name", "Le nom", true)!,
    description: text(body, "description", "La description"),
    category_id: text(body, "category_id", "La catégorie"),
    collection_id: text(body, "collection_id", "La collection"),
    price: num(body, "price", "Le prix"),
    images: urls(body, "images"),
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

// ─── Utilitaires partagés par les deux stockages ──────────────────

/** Slug unique : « robe-rouge », puis « robe-rouge-2 », « robe-rouge-3 »... */
export function uniqueSlug(name: string, taken: Iterable<string>): string {
  const base = slugify(name) || "article";
  const used = new Set(taken);
  if (!used.has(base)) return base;
  let i = 2;
  while (used.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
