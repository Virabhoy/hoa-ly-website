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

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category_id: string | null;
  price: number;
  images: string[];
  cover_image: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
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
  relativeTime: string;
}

export interface GooglePlaceData {
  name: string;
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
}
