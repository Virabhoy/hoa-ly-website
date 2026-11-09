export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsHero from "@/components/home/CollectionsHero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import GoogleReviews from "@/components/home/GoogleReviews";
import StoreCard from "@/components/home/StoreCard";
import { getCategories, getCollections, getFeaturedProducts, getStoreHours } from "@/lib/catalog/queries";
import { getGoogleReviews } from "@/lib/google-reviews";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/site";
import { storeJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({ path: "/" });

export default async function HomePage() {
  const [collections, categories, featured, reviews, hours] = await Promise.all([
    getCollections(),
    getCategories(),
    getFeaturedProducts(8),
    getGoogleReviews(),
    getStoreHours(),
  ]);

  return (
    <>
      <JsonLd data={storeJsonLd(hours)} />
      <Navbar />
      <main id="contenu">
        <CollectionsHero collections={collections} />
        <CategoryGrid categories={categories} />
        <FeaturedProducts products={featured} />
        <GoogleReviews data={reviews} />
        <StoreCard hours={hours} />
      </main>
      <Footer />
    </>
  );
}
