import { cache } from "react";
import { getStore } from "@/lib/store";
import { STORE_HOURS } from "@/lib/constants";
import type { Category, Collection, Product } from "./types";

// Lectures du site public. Les données viennent du stockage actif (local ou Supabase).
// `cache` évite de relire le catalogue plusieurs fois pendant le rendu d'une même page.

const byOrder = <T extends { display_order: number }>(a: T, b: T) => a.display_order - b.display_order;

const loadProducts = cache(async () => (await getStore().listProducts()).sort(byOrder));
const loadCategories = cache(async () => (await getStore().listCategories()).sort(byOrder));
const loadCollections = cache(async () => (await getStore().listCollections()).sort(byOrder));
const loadSettings = cache(async () => getStore().getSettings());

/** Produits visibles sur le site (les produits masqués depuis l'admin sont exclus). */
async function visibleProducts(): Promise<Product[]> {
  return (await loadProducts()).filter((p) => p.is_active);
}

export async function getCategories(): Promise<Category[]> {
  return loadCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return (await loadCategories()).find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return (await visibleProducts()).filter((p) => p.category_id === categoryId);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return (await visibleProducts()).find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return (await visibleProducts()).filter((p) => p.is_featured).slice(0, limit);
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 4): Promise<Product[]> {
  return (await visibleProducts())
    .filter((p) => p.category_id === categoryId && p.id !== excludeId)
    .slice(0, limit);
}

export async function getAllProducts(): Promise<Product[]> {
  return visibleProducts();
}

export async function getCollections(): Promise<Collection[]> {
  return loadCollections();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return (await loadCollections()).find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  return (await visibleProducts()).filter((p) => p.collection_id === collectionId);
}

export async function getStoreHours(): Promise<Record<string, string>> {
  const hours = (await loadSettings()).store_hours;
  return hours && typeof hours === "object" && !Array.isArray(hours)
    ? (hours as Record<string, string>)
    : STORE_HOURS;
}

/** Texte du bandeau d'annonce s'il est activé dans l'admin, sinon null. */
export async function getAnnouncement(): Promise<string | null> {
  const value = (await loadSettings()).announcement as { enabled?: boolean; text?: string } | undefined;
  return value?.enabled && value.text?.trim() ? value.text.trim() : null;
}
