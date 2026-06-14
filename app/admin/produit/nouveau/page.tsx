export const dynamic = "force-dynamic";

import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/supabase/queries";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Nouveau produit</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Ajoutez un nouvel article à la boutique.</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
