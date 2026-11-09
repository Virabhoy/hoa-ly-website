export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  display_order: number;
  created_at: string;
}

// Collection saisonnière (ex. Printemps-Été 2026).
// La première collection non archivée (par ordre d'affichage) est mise en avant sur l'accueil.
export interface Collection {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  description: string | null;
  cover_image: string | null;
  images: string[];
  is_archived: boolean;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category_id: string | null;
  collection_id: string | null;
  price: number;
  images: string[];
  cover_image: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  collection?: Collection | null;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  color_name: string;
  color_hex: string;
  size: string;
  stock: number;
  sku: string | null;
  display_order: number;
}

export interface SiteSetting {
  key: string;
  value: Json;
  updated_at: string;
}

export interface GoogleReview {
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string | null;
  authorUrl: string | null;
  relativeTime: string;
}

export interface GooglePlaceData {
  name: string;
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
}
