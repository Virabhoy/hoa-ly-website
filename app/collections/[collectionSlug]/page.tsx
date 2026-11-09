import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalogue/ProductGrid";
import { LatticeCorner, OrnamentDivider } from "@/components/ui/ChineseMotifs";
import { getCollectionBySlug, getCollections, getProductsByCollection } from "@/lib/catalog/queries";
import { pageMetadata } from "@/lib/site";

interface Params {
  collectionSlug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { collectionSlug } = await params;
  const collection = await getCollectionBySlug(collectionSlug);
  if (!collection) return { title: "Collection introuvable" };
  return pageMetadata({
    title: collection.name,
    description: collection.description ?? `La collection ${collection.name} de Hoa Ly Paris.`,
    path: `/collections/${collection.slug}`,
    image: collection.cover_image,
  });
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ collectionSlug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { collectionSlug } = await params;
  const collection = await getCollectionBySlug(collectionSlug);
  if (!collection) notFound();

  const [products, collections] = await Promise.all([getProductsByCollection(collection.id), getCollections()]);
  const lookbook = collection.images.slice(1);

  return (
    <>
      <Navbar />
      <main id="contenu">
        {/* Couverture */}
        <div className="relative h-[55svh] md:h-[70svh] bg-[#0A0A0A] overflow-hidden">
          {collection.cover_image && (
            <Image
              src={collection.cover_image}
              alt={collection.name}
              fill
              sizes="100vw"
              preload
              className="object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-white/75">
                {collection.is_archived ? "Ancienne collection" : "Collection"} · {collection.short_name}
              </p>
              <h1
                className="mt-2 text-5xl md:text-7xl font-light tracking-wide"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {collection.name}
              </h1>
            </div>
          </div>
          <LatticeCorner className="pointer-events-none absolute top-5 left-5 w-12 md:w-16 text-white/70" />
          <LatticeCorner className="pointer-events-none absolute bottom-5 right-5 w-12 md:w-16 text-white/70 rotate-180" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {collection.description && (
            <div className="max-w-2xl mx-auto text-center">
              <OrnamentDivider className="mx-auto w-32 text-motif" />
              <p
                className="mt-6 text-xl sm:text-2xl font-light leading-relaxed text-[#3A3A3A]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {collection.description}
              </p>
            </div>
          )}

          {/* Lookbook */}
          {lookbook.length > 0 && (
            <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {lookbook.map((src) => (
                <div key={src} className="relative aspect-[3/4] overflow-hidden bg-[#F0EDE8]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pièces de la collection */}
          <section className="mt-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
                Les pièces de la collection
              </h2>
              <OrnamentDivider className="mx-auto mt-2 w-28 text-motif" />
              {products.length > 0 && (
                <p className="mt-3 text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">{products.length} articles</p>
              )}
            </div>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <p className="text-center text-sm text-[#6B6B6B] py-10">
                Les pièces de cette collection sont à découvrir directement en boutique.
              </p>
            )}
          </section>

          {/* Autres collections */}
          {collections.length > 1 && (
            <div className="mt-20 flex gap-3 flex-wrap justify-center">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  href={`/collections/${c.slug}`}
                  className={`px-6 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase border transition-colors duration-300 ${
                    c.id === collection.id
                      ? "bg-motif text-white border-motif"
                      : "border-[#E5E5E5] hover:border-motif hover:text-motif"
                  }`}
                >
                  {c.short_name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
