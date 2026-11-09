export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getStore } from "@/lib/store";
import { requireAdmin } from "@/lib/auth";

export default async function AdminCollectionsPage() {
  await requireAdmin();
  const store = getStore();
  const [collections, products] = await Promise.all([store.listCollections(), store.listProducts()]);
  collections.sort((a, b) => a.display_order - b.display_order);
  const featuredId = collections.find((c) => !c.is_archived)?.id;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-medium">Collections</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Les saisons de la boutique. La première collection en cours est mise en avant sur l&apos;accueil.
          </p>
        </div>
        <Link href="/admin/collection/nouveau" className="inline-flex items-center justify-center px-6 py-3 bg-[#0A0A0A] text-white text-xs font-medium tracking-widest uppercase hover:bg-[#333] transition-colors">
          <Plus size={14} className="mr-2" /> Nouvelle collection
        </Link>
      </div>

      {collections.length === 0 ? (
        <p className="bg-white border border-[#E5E5E5] text-center py-12 text-sm text-[#6B6B6B]">
          Aucune collection pour l&apos;instant.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {collections.map((c) => {
            const count = products.filter((p) => p.collection_id === c.id).length;
            return (
              <div key={c.id} className="bg-white border border-[#E5E5E5] flex flex-col">
                <Link href={`/admin/collection/${c.id}`} className="relative aspect-[4/3] bg-[#F0EDE8] overflow-hidden block">
                  {c.cover_image && (
                    <Image src={c.cover_image} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {c.id === featuredId && <Badge variant="error">À l&apos;accueil</Badge>}
                    {c.is_archived && <Badge>Archivée</Badge>}
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-motif">{c.short_name}</p>
                  <p className="mt-1 text-lg font-medium">{c.name}</p>
                  <p className="mt-1 mb-4 text-xs text-[#6B6B6B]">
                    {c.images.length} photo{c.images.length > 1 ? "s" : ""}, {count} produit{count > 1 ? "s" : ""}
                    {" "}- ordre {c.display_order}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#F5F5F5] flex items-center justify-between gap-2">
                    <Link
                      href={`/admin/produits?collection=${c.id}`}
                      className="text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A]"
                    >
                      Produits
                    </Link>
                    <Link
                      href={`/admin/collection/${c.id}`}
                      className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase hover:text-motif"
                    >
                      <Pencil size={12} /> Modifier
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
