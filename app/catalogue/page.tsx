export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalogue/ProductGrid";
import { getAllProducts, getCategories } from "@/lib/supabase/queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Découvrez toutes nos collections de prêt-à-porter féminin.",
};

export default async function CataloguePage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-10 border-b border-[#E5E5E5] mb-10">
            <h1
              className="text-4xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Tout le catalogue
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-2">{products.length} articles</p>
          </div>

          {/* Category filters */}
          <div className="flex gap-3 flex-wrap mb-10">
            <Link
              href="/catalogue"
              className="px-4 py-2 text-xs tracking-widest uppercase bg-[#0A0A0A] text-white"
            >
              Tout
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue/${cat.slug}`}
                className="px-4 py-2 text-xs tracking-widest uppercase border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
