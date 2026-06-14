import { createServerClient } from "./server";
import type { Category, Product } from "./types";
import {
  DEMO_CATEGORIES,
  DEMO_PRODUCTS,
  getDemoCategoryBySlug,
  getDemoProductsByCategory,
  getDemoProductBySlug,
  getDemoFeatured,
  getDemoRelated,
} from "../demo-data";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.startsWith("https://") && !url.includes("VOTRE_PROJECT_ID");
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return DEMO_CATEGORIES;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) return DEMO_CATEGORIES;
    return data;
  } catch {
    return DEMO_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) return getDemoCategoryBySlug(slug);
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return getDemoCategoryBySlug(slug);
    return data;
  } catch {
    return getDemoCategoryBySlug(slug);
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) return getDemoProductsByCategory(categoryId);
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, variants:product_variants(*)")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error) return getDemoProductsByCategory(categoryId);
    return data;
  } catch {
    return getDemoProductsByCategory(categoryId);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return getDemoProductBySlug(slug);
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*)")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    if (error) return getDemoProductBySlug(slug);
    return data;
  } catch {
    return getDemoProductBySlug(slug);
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  if (!isSupabaseConfigured()) return getDemoFeatured(limit);
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(name, slug)")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .limit(limit);
    if (error) return getDemoFeatured(limit);
    return data;
  } catch {
    return getDemoFeatured(limit);
  }
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  if (!isSupabaseConfigured()) return getDemoRelated(categoryId, excludeId, limit);
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .neq("id", excludeId)
      .limit(limit);
    if (error) return getDemoRelated(categoryId, excludeId, limit);
    return data;
  } catch {
    return getDemoRelated(categoryId, excludeId, limit);
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return DEMO_PRODUCTS;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(name, slug), variants:product_variants(*)")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) return DEMO_PRODUCTS;
    return data;
  } catch {
    return DEMO_PRODUCTS;
  }
}

export async function getSetting(key: string): Promise<unknown> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();
    if (error) return null;
    return data?.value;
  } catch {
    return null;
  }
}
