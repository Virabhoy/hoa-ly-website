import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

function getStockStatus(product: Product): { label: string; color: string } {
  if (!product.variants?.length) return { label: "", color: "" };
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  if (totalStock === 0) return { label: "Épuisé", color: "text-red-600" };
  if (totalStock <= 3) return { label: "Dernières pièces", color: "text-[#C8A882]" };
  return { label: "En stock", color: "text-green-700" };
}

export default function ProductCard({ product }: ProductCardProps) {
  const stock = getStockStatus(product);

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8] relative">
        {product.cover_image ? (
          <Image
            src={product.cover_image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E5E5E5] to-[#C8A882]/20 flex items-center justify-center">
            <span
              className="text-4xl text-[#C8A882]/40 font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              HL
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-0.5">
        <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B]">
          {product.category?.name ?? ""}
        </p>
        <p className="text-sm group-hover:text-[#C8A882] transition-colors leading-snug">
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6B6B6B]">{formatPrice(product.price)}</p>
          {stock.label && (
            <p className={`text-[10px] tracking-wide ${stock.color}`}>{stock.label}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
