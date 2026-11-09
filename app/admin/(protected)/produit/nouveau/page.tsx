export const dynamic = "force-dynamic";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { getStore } from "@/lib/store";
import { requireAdmin } from "@/lib/auth";

export default async function NewProductPage() {
  await requireAdmin();
  const store = getStore();
  const [categories, collections] = await Promise.all([store.listCategories(), store.listCollections()]);
  const byOrder = <T extends { display_order: number }>(a: T, b: T) => a.display_order - b.display_order;

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <Link href="/admin/produits" className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#0A0A0A] mb-4">
        <ChevronLeft size={14} /> Produits
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Nouveau produit</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Ajoutez un article au catalogue.</p>
      </div>
      <ProductForm categories={categories.sort(byOrder)} collections={collections.sort(byOrder)} />
    </div>
  );
}
