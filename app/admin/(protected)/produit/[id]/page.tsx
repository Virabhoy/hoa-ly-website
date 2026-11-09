export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { getStore } from "@/lib/store";
import { requireAdmin } from "@/lib/auth";

interface Params { id: string }

export default async function EditProductPage({ params }: { params: Promise<Params> }) {
  await requireAdmin();
  const { id } = await params;
  const store = getStore();
  const [product, categories, collections] = await Promise.all([
    store.getProduct(id),
    store.listCategories(),
    store.listCollections(),
  ]);
  if (!product) notFound();
  const byOrder = <T extends { display_order: number }>(a: T, b: T) => a.display_order - b.display_order;

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <Link href="/admin/produits" className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#0A0A0A] mb-4">
        <ChevronLeft size={14} /> Produits
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Modifier le produit</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">{product.name}</p>
      </div>
      <ProductForm
        key={product.updated_at}
        product={product}
        categories={categories.sort(byOrder)}
        collections={collections.sort(byOrder)}
      />
    </div>
  );
}
