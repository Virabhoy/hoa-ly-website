import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalogue/ProductGrid";
import { getCategoryBySlug, getCategories, getProductsByCategory } from "@/lib/supabase/queries";
import Link from "next/link";

interface Params {
  categorySlug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { title: "Collection introuvable" };
  return {
    title: category.name,
    description: category.description ?? `Découvrez notre collection ${category.name}.`,
  };
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((c) => ({ categorySlug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [products, allCategories] = await Promise.all([
    getProductsByCategory(category.id),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero banner */}
        <div className="relative h-64 md:h-80 bg-[#F0EDE8] overflow-hidden">
          {category.cover_image && (
            <Image
              src={category.cover_image}
              alt={category.name}
              fill
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Collection</p>
              <h1
                className="text-4xl md:text-6xl font-light text-white tracking-wide"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {category.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Category nav */}
          <div className="flex gap-3 flex-wrap mb-10">
            <Link
              href="/catalogue"
              className="px-4 py-2 text-xs tracking-widest uppercase border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
            >
              Tout
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue/${cat.slug}`}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  cat.slug === categorySlug
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "border-[#E5E5E5] hover:border-[#0A0A0A]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between">
            {category.description && (
              <p className="text-sm text-[#6B6B6B] max-w-xl">{category.description}</p>
            )}
            <p className="text-sm text-[#6B6B6B] ml-auto">{products.length} articles</p>
          </div>

          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
