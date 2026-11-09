export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CloudMotif, OrnamentDivider } from "@/components/ui/ChineseMotifs";
import { getCollections } from "@/lib/catalog/queries";
import { pageMetadata } from "@/lib/site";
import type { Collection } from "@/lib/catalog/types";

export const metadata = pageMetadata({
  title: "Collections",
  description: "Les collections saisonnières Hoa Ly, de la saison en cours aux collections passées.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const collections = await getCollections();
  const current = collections.filter((c) => !c.is_archived);
  const archived = collections.filter((c) => c.is_archived);

  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-12 mb-6 overflow-hidden text-center">
            <CloudMotif className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 hidden sm:block" />
            <CloudMotif className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-56 sm:w-72 text-motif opacity-15 -scale-x-100 hidden sm:block" />
            <h1
              className="relative text-4xl sm:text-5xl font-light tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Nos collections
            </h1>
            <OrnamentDivider className="relative mx-auto mt-4 w-40 text-motif" />
          </div>

          {current.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.map((c, i) => (
                <CollectionCard key={c.id} collection={c} priority={i === 0} />
              ))}
            </div>
          )}

          {archived.length > 0 && (
            <section className="mt-20">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Anciennes collections
                </h2>
                <OrnamentDivider className="mx-auto mt-2 w-28 text-motif" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {archived.map((c) => (
                  <CollectionCard key={c.id} collection={c} small />
                ))}
              </div>
            </section>
          )}

          {collections.length === 0 && (
            <p className="py-24 text-center text-[#6B6B6B]">Nos collections arrivent bientôt.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function CollectionCard({ collection, small, priority }: { collection: Collection; small?: boolean; priority?: boolean }) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EDE8]">
        {collection.cover_image && (
          <Image
            src={collection.cover_image}
            alt={collection.name}
            fill
            sizes={small ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            preload={priority}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/80">{collection.short_name}</p>
          <p
            className={`mt-1 font-light leading-tight ${small ? "text-xl sm:text-2xl" : "text-3xl"}`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {collection.name}
          </p>
        </div>
      </div>
      {!small && collection.description && (
        <p className="mt-4 text-sm text-[#6B6B6B] leading-relaxed">{collection.description}</p>
      )}
    </Link>
  );
}
