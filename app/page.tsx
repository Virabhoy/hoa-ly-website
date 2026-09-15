export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsHero from "@/components/home/CollectionsHero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import GoogleReviews from "@/components/home/GoogleReviews";
import StoreCard from "@/components/home/StoreCard";
import { getCategories, getCollections, getFeaturedProducts } from "@/lib/supabase/queries";
import type { GooglePlaceData } from "@/lib/supabase/types";

async function getGoogleReviews(): Promise<GooglePlaceData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/public/google-reviews`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [collections, categories, featured, reviews] = await Promise.all([
    getCollections(),
    getCategories(),
    getFeaturedProducts(8),
    getGoogleReviews(),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CollectionsHero collections={collections} />
        <CategoryGrid categories={categories} />
        <FeaturedProducts products={featured} />
        <GoogleReviews data={reviews} />
        <StoreCard />
      </main>
      <Footer />
    </>
  );
}
