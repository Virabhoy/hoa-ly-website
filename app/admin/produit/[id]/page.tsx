export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/supabase/queries";
import { createAdminClient } from "@/lib/supabase/server";

interface Params { id: string }

export default async function EditProductPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [categories] = await Promise.all([getCategories()]);

  const supabase = createAdminClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*)")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Modifier le produit</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">{product.name}</p>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
