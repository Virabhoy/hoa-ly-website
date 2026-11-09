export const dynamic = "force-dynamic";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CollectionForm from "@/components/admin/CollectionForm";
import { getStore } from "@/lib/store";
import { requireAdmin } from "@/lib/auth";

export default async function NewCollectionPage() {
  await requireAdmin();
  const collections = await getStore().listCollections();
  const nextOrder = collections.reduce((max, c) => Math.max(max, c.display_order + 1), 0);

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <Link href="/admin/collections" className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#0A0A0A] mb-4">
        <ChevronLeft size={14} /> Collections
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Nouvelle collection</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Créez la collection, puis rattachez-y des produits depuis leur fiche.
        </p>
      </div>
      <CollectionForm nextOrder={nextOrder} />
    </div>
  );
}
