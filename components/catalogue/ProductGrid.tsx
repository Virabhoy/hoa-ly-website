import type { Product } from "@/lib/supabase/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="text-center py-24">
        <p
          className="text-2xl font-light text-[#6B6B6B]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Aucun produit disponible
        </p>
        <p className="text-sm text-[#6B6B6B] mt-2">
          Revenez bientôt pour découvrir nos nouvelles pièces.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
