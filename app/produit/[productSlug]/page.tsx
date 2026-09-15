import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/pdp/ProductGallery";
import VariantSelector from "@/components/pdp/VariantSelector";
import ProductGrid from "@/components/catalogue/ProductGrid";
import {
  getProductBySlug,
  getAllProducts,
  getRelatedProducts,
} from "@/lib/supabase/queries";
import { formatPrice } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { OrnamentDivider } from "@/components/ui/ChineseMotifs";

interface Params {
  productSlug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description:
      product.description ??
      `Découvrez ${product.name} — ${formatPrice(product.price)} — disponible chez Hoa Ly Paris 75013.`,
    openGraph: {
      images: product.cover_image ? [product.cover_image] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ productSlug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  const related = product.category_id
    ? await getRelatedProducts(product.category_id, product.id, 4)
    : [];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-8">
            <Link href="/" className="link-underline hover:text-[#0A0A0A] transition-colors duration-300">
              Accueil
            </Link>
            <ChevronRight size={12} />
            <Link href="/catalogue" className="link-underline hover:text-[#0A0A0A] transition-colors duration-300">
              Catalogue
            </Link>
            {product.category && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/catalogue/${product.category.slug}`}
                  className="link-underline hover:text-[#0A0A0A] transition-colors duration-300"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-[#0A0A0A]">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images ?? []} name={product.name} />

            {/* Info */}
            <div className="lg:sticky lg:top-24 space-y-6 self-start">
              {product.category && (
                <p className="text-xs tracking-widest uppercase text-[#6B6B6B]">
                  {product.category.name}
                </p>
              )}
              <h1
                className="text-3xl md:text-4xl font-light tracking-wide leading-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {product.name}
              </h1>
              <OrnamentDivider className="-mt-3 w-28 text-motif" />
              <p className="text-2xl font-light">{formatPrice(product.price)}</p>

              {product.description && (
                <p className="text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E5E5E5] pt-6">
                  {product.description}
                </p>
              )}

              <div className="border-t border-[#E5E5E5] pt-6">
                <VariantSelector variants={product.variants ?? []} />
              </div>

              {/* Care / info */}
              <div className="border-t border-[#E5E5E5] pt-6 text-xs text-[#6B6B6B] space-y-1">
                <p>• Composition disponible en boutique</p>
                <p>• Retours acceptés sous 14 jours en magasin</p>
                <p>• Disponible exclusivement chez Hoa Ly — Paris 75013</p>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="mb-8">
                <h2
                  className="text-2xl font-light tracking-wide"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Vous aimerez aussi
                </h2>
                <OrnamentDivider className="mt-2 w-28 text-motif" />
              </div>
              <ProductGrid products={related} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
