import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";
import { OrnamentDivider } from "@/components/ui/ChineseMotifs";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2
              className="text-3xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Coup de cœur
            </h2>
            <OrnamentDivider className="mt-2 w-28 text-motif" />
          </div>
          <Link
            href="/catalogue"
            className="text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors border-b border-[#6B6B6B] pb-0.5"
          >
            Tout voir
          </Link>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="pl-4 sm:pl-6 lg:pl-8 overflow-x-auto pb-4 flex gap-4 scrollbar-hide">
        <div className="flex gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produit/${product.slug}`}
              className="group flex-shrink-0 w-56 sm:w-64"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8] relative">
                {product.cover_image ? (
                  <Image
                    src={product.cover_image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E5E5E5] to-[#C8A882]/20" />
                )}
              </div>
              <div className="mt-3">
                <p className="text-xs tracking-widest uppercase text-[#6B6B6B]">
                  {(product as { category?: { name: string } }).category?.name ?? ""}
                </p>
                <p className="text-sm mt-0.5 group-hover:text-[#C8A882] transition-colors">
                  {product.name}
                </p>
                <p className="text-sm text-[#6B6B6B] mt-0.5">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
