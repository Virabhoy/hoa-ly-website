import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/supabase/types";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-10">
        <h2
          className="text-3xl font-light tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Nos Collections
        </h2>
        <Link
          href="/catalogue"
          className="text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors border-b border-[#6B6B6B] pb-0.5"
        >
          Tout voir
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.slice(0, 6).map((cat, i) => (
          <Link
            key={cat.id}
            href={`/catalogue/${cat.slug}`}
            className={`group relative overflow-hidden bg-[#F0EDE8] ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <div className={`aspect-[3/4] ${i === 0 ? "md:aspect-auto md:h-full" : ""} relative`}>
              {cat.cover_image ? (
                <Image
                  src={cat.cover_image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5E5E5] to-[#C8A882]/30" />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-xs tracking-widest uppercase mb-1 opacity-80">
                  Collection
                </p>
                <p
                  className="text-white text-2xl font-light tracking-wide"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {cat.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
