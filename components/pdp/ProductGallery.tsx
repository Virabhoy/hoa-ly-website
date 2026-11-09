"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[3/4] bg-[#F0EDE8] flex items-center justify-center">
        <span
          className="text-6xl text-[#C8A882]/30 font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          HL
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px]">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Afficher la photo ${i + 1} sur ${images.length}`}
              aria-current={i === active}
              className={`flex-shrink-0 w-16 h-20 relative overflow-hidden transition-all ${
                i === active ? "ring-1 ring-[#0A0A0A]" : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 aspect-[3/4] relative overflow-hidden bg-[#F0EDE8] group">
        <Image
          src={images[active]}
          alt={images.length > 1 ? `${name}, photo ${active + 1} sur ${images.length}` : name}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          preload={active === 0}
          className="object-cover object-center"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              aria-label="Image précédente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              aria-label="Image suivante"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
