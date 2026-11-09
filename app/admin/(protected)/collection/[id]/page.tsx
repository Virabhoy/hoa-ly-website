export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import CollectionForm from "@/components/admin/CollectionForm";
import { getStore } from "@/lib/store";
import { requireAdmin } from "@/lib/auth";

interface Params { id: string }

export default async function EditCollectionPage({ params }: { params: Promise<Params> }) {
  await requireAdmin();
  const { id } = await params;
  const store = getStore();
  const [collections, products] = await Promise.all([store.listCollections(), store.listProducts()]);
  const collection = collections.find((c) => c.id === id);
  if (!collection) notFound();
  const count = products.filter((p) => p.collection_id === id).length;

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <Link href="/admin/collections" className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#0A0A0A] mb-4">
        <ChevronLeft size={14} /> Collections
      </Link>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium">Modifier la collection</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">{collection.name}</p>
        </div>
        <Link
          href={`/admin/produits?collection=${collection.id}`}
          className="text-xs tracking-widest uppercase text-motif hover:underline"
        >
          Voir ses {count} produit{count > 1 ? "s" : ""}
        </Link>
      </div>
      <CollectionForm collection={collection} />
    </div>
  );
}
