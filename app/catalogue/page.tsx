export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalogue/ProductGrid";
import { getAllProducts, getCategories } from "@/lib/catalog/queries";
import Link from "next/link";
import { CloudMotif, OrnamentDivider } from "@/components/ui/ChineseMotifs";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Catalogue",
  description: "Toutes les pièces de la boutique Hoa Ly : robes, áo dài, qipao, hauts, vestes et accessoires.",
  path: "/catalogue",
});

export default async function CataloguePage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative py-12 mb-10 overflow-hidden text-center">
            <CloudMotif className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 hidden sm:block" />
            <CloudMotif className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 -scale-x-100 hidden sm:block" />
            <h1
              className="relative text-4xl sm:text-5xl font-light tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Tout le catalogue
            </h1>
            <OrnamentDivider className="relative mx-auto mt-4 w-40 text-motif" />
            <p className="relative text-xs tracking-[0.2em] uppercase text-[#6B6B6B] mt-4">{products.length} articles</p>
          </div>

          {/* Category filters */}
          <div className="flex gap-3 flex-wrap justify-center mb-12">
            <Link
              href="/catalogue"
              className="px-6 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase bg-motif text-white"
            >
              Tout
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue/${cat.slug}`}
                className="px-6 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase border border-[#E5E5E5] hover:border-motif hover:text-motif transition-colors duration-300"
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
