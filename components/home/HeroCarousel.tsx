"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";

interface HeroCarouselProps {
  products: Product[];
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % products.length), [products.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + products.length) % products.length), [products.length]);

  useEffect(() => {
    if (products.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, products.length]);

  if (!products.length) {
    return (
      <div className="h-[85vh] bg-[#F0EDE8] flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hoa Ly
          </p>
          <p className="mt-4 text-xs tracking-widest uppercase text-[#6B6B6B]">
            Nouvelle Collection
          </p>
          <Link
            href="/catalogue"
            className="inline-block mt-8 px-8 py-3 bg-[#0A0A0A] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-colors"
          >
            Découvrir
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[85vh] overflow-hidden bg-[#0A0A0A]">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {product.cover_image && (
            <Image
              src={product.cover_image}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-16 left-8 sm:left-16 text-white">
            <p className="text-xs tracking-widest uppercase text-white/70 mb-2">
              {product.category?.name ?? "Collection"}
            </p>
            <h2
              className="text-4xl sm:text-6xl font-light tracking-wide leading-tight max-w-md"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {product.name}
            </h2>
            <p className="mt-3 text-lg font-light">{formatPrice(product.price)}</p>
            <Link
              href={`/produit/${product.slug}`}
              className="inline-block mt-6 px-8 py-3 bg-white text-[#0A0A0A] text-xs tracking-widest uppercase hover:bg-[#C8A882] hover:text-white transition-colors duration-200"
            >
              Voir le produit
            </Link>
          </div>
        </div>
      ))}

      {/* Controls */}
      {products.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-6" : "bg-white/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
