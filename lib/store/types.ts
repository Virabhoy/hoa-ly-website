import type { Category, Collection, Json, Product } from "@/lib/catalog/types";
import type { ProcessedImage } from "./images";

export interface CategoryInput {
  name: string;
  description: string | null;
  cover_image: string | null;
  display_order: number;
}

export interface CollectionInput {
  name: string;
  short_name: string;
  description: string | null;
  images: string[];
  is_archived: boolean;
  display_order: number;
}

export interface VariantInput {
  id?: string;
  color_name: string;
  color_hex: string;
  size: string;
  stock: number;
}

export interface ProductInput {
  name: string;
  description: string | null;
  category_id: string | null;
  collection_id: string | null;
  price: number;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  variants: VariantInput[];
}

/**
 * Point d'accès unique aux données du catalogue.
 * Deux implémentations : fichier local (tant que Supabase n'est pas branché) et Supabase.
 */
export interface CatalogStore {
  readonly mode: "local" | "postgres";

  listCategories(): Promise<Category[]>;
  createCategory(input: CategoryInput): Promise<Category>;
  updateCategory(id: string, input: Partial<CategoryInput>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  listCollections(): Promise<Collection[]>;
  createCollection(input: CollectionInput): Promise<Collection>;
  updateCollection(id: string, input: Partial<CollectionInput>): Promise<Collection>;
  deleteCollection(id: string): Promise<void>;

  /** Tous les produits (visibles ou non), avec catégorie, collection et variantes. */
  listProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  createProduct(input: ProductInput): Promise<Product>;
  /** Si `variants` est fourni, il remplace l'ensemble des variantes du produit. */
  updateProduct(id: string, input: Partial<ProductInput>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  updateVariantStock(id: string, stock: number): Promise<void>;

  getSettings(): Promise<Record<string, Json>>;
  setSetting(key: string, value: Json): Promise<void>;

  /** Contrôle, réencode et enregistre une photo envoyée ; renvoie son URL publique. */
  saveImage(file: File): Promise<string>;
  /** Enregistre une image déjà traitée (ex. recadrée) ; renvoie son URL publique. */
  storeImage(image: ProcessedImage): Promise<string>;
}

export class ValidationError extends Error {}
export class NotFoundError extends Error {}
