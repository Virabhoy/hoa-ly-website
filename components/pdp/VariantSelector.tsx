"use client";

import { useState, useMemo } from "react";
import { Phone } from "lucide-react";
import type { ProductVariant } from "@/lib/supabase/types";
import { STORE_PHONE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  variants: ProductVariant[];
}

function getUniqueColors(variants: ProductVariant[]) {
  const seen = new Set<string>();
  return variants.filter((v) => {
    if (seen.has(v.color_name)) return false;
    seen.add(v.color_name);
    return true;
  });
}

function getUniqueSizes(variants: ProductVariant[]) {
  const order = ["XS", "S", "M", "L", "XL", "XXL"];
  const seen = new Set<string>();
  const sizes: string[] = [];
  variants.forEach((v) => {
    if (!seen.has(v.size)) { seen.add(v.size); sizes.push(v.size); }
  });
  return sizes.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export default function VariantSelector({ variants }: VariantSelectorProps) {
  const colors = useMemo(() => getUniqueColors(variants), [variants]);
  const sizes = useMemo(() => getUniqueSizes(variants), [variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0]?.color_name ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filteredByColor = useMemo(
    () => variants.filter((v) => v.color_name === selectedColor),
    [variants, selectedColor]
  );

  const getStockForSize = (size: string) => {
    return filteredByColor.find((v) => v.size === size)?.stock ?? 0;
  };

  const selectedVariant = useMemo(
    () => variants.find((v) => v.color_name === selectedColor && v.size === selectedSize),
    [variants, selectedColor, selectedSize]
  );

  const stockStatus = useMemo(() => {
    if (!selectedVariant) return null;
    if (selectedVariant.stock === 0) return { label: "Épuisé", class: "text-red-600" };
    if (selectedVariant.stock <= 3)
      return { label: `Dernières pièces (${selectedVariant.stock} restantes)`, class: "text-[#C8A882]" };
    return { label: "En stock", class: "text-green-700" };
  }, [selectedVariant]);

  return (
    <div className="space-y-6">
      {/* Color */}
      {colors.length > 0 && (
        <div>
          <p className="text-xs tracking-widest uppercase mb-3">
            Couleur{selectedColor ? ` — ${selectedColor}` : ""}
          </p>
          <div className="flex gap-2 flex-wrap">
            {colors.map((v) => (
              <button
                key={v.color_name}
                title={v.color_name}
                onClick={() => { setSelectedColor(v.color_name); setSelectedSize(null); }}
                className={cn(
                  "w-7 h-7 rounded-full border-2 transition-all duration-150",
                  selectedColor === v.color_name
                    ? "border-[#0A0A0A] scale-110"
                    : "border-transparent hover:border-[#6B6B6B]"
                )}
                style={{ backgroundColor: v.color_hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <p className="text-xs tracking-widest uppercase mb-3">Taille</p>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => {
              const stock = getStockForSize(size);
              const isAvailable = stock > 0;
              return (
                <button
                  key={size}
                  onClick={() => isAvailable && setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={cn(
                    "w-12 h-10 text-xs tracking-wider border transition-all duration-150",
                    selectedSize === size
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : isAvailable
                      ? "border-[#E5E5E5] hover:border-[#0A0A0A]"
                      : "border-[#E5E5E5] text-[#C8C8C8] cursor-not-allowed line-through"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock status */}
      {stockStatus && (
        <p className={`text-sm ${stockStatus.class}`}>{stockStatus.label}</p>
      )}

      {/* CTA */}
      <a
        href={`tel:${STORE_PHONE}`}
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#0A0A0A] text-white text-xs tracking-widest uppercase hover:bg-[#C8A882] transition-colors duration-200"
      >
        <Phone size={14} />
        Réserver en boutique
      </a>

      <p className="text-xs text-[#6B6B6B] text-center">
        Appelez-nous ou passez directement en boutique pour essayer et réserver cette pièce.
      </p>
    </div>
  );
}
