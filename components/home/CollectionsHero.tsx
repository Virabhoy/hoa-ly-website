"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { Collection } from "@/lib/catalog/types";
import { LatticeCorner, OrnamentDivider } from "@/components/ui/ChineseMotifs";

const DELAI_MS = 5000;

interface CollectionsHeroProps {
  collections: Collection[];
}

export default function CollectionsHero({ collections }: CollectionsHeroProps) {
  // La collection du moment : la première non archivée.
  const collection = collections.find((c) => !c.is_archived) ?? collections[0];
  const photos = collection?.images?.length
    ? collection.images
    : collection?.cover_image
      ? [collection.cover_image]
      : [];

  const [index, setIndex] = useState(0);
  // Pause demandée par le visiteur (bouton), ou temporaire pendant le survol / la navigation au clavier.
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Photos déjà chargées : on n'avance que vers une photo prête, pour ne jamais afficher un fond noir.
  const loaded = useRef(new Set<number>());
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Photos déjà chargées avant l'hydratation : leur événement onLoad n'a pas été capté.
    carouselRef.current?.querySelectorAll("img").forEach((img, i) => {
      if (img.complete && img.naturalWidth > 0) loaded.current.add(i);
    });
  }, []);

  const autoplay = photos.length > 1 && !reducedMotion;

  useEffect(() => {
    if (!autoplay || paused || hovered) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % photos.length;
        return loaded.current.has(next) ? next : i;
      });
    }, DELAI_MS);
    return () => clearInterval(id);
  }, [autoplay, paused, hovered, photos.length]);

  if (!collection) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-[3fr_7fr] md:h-[78svh] bg-[#FAFAF9]">
      {/* Collection du moment (30 %) */}
      <div className="order-2 md:order-1 flex flex-col justify-center px-6 sm:px-10 py-12 md:border-r border-[#EFEAE6]">
        <p className="text-[11px] tracking-[0.3em] uppercase text-motif">
          Collection {collection.short_name}
        </p>
        <h1
          className="mt-4 text-4xl lg:text-5xl font-light leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {collection.name}
        </h1>
        <OrnamentDivider className="mt-5 w-32 text-motif" />
        {collection.description && (
          <p className="mt-6 text-sm text-[#6B6B6B] leading-relaxed">{collection.description}</p>
        )}
        <Link
          href={`/collections/${collection.slug}`}
          className="inline-block self-start mt-8 px-8 py-3 bg-motif text-white text-xs tracking-widest uppercase hover:bg-[#0A0A0A] transition-colors duration-300"
        >
          Découvrir la collection
        </Link>
      </div>

      {/* Carrousel de la collection (70 %) */}
      <div
        ref={carouselRef}
        role="group"
        aria-roledescription="carrousel"
        aria-label={`Photos de la collection ${collection.name}`}
        className="order-1 md:order-2 relative h-[60svh] md:h-auto overflow-hidden bg-[#0A0A0A]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
        }}
      >
        {photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? collection.name : ""}
            aria-hidden={i !== index}
            fill
            sizes="(min-width: 768px) 70vw, 100vw"
            // La première photo est prioritaire ; les suivantes se chargent tout de suite, mais en second plan.
            {...(i === 0 ? { preload: true } : { loading: "eager" as const, fetchPriority: "low" as const })}
            onLoad={() => loaded.current.add(i)}
            className={`object-cover object-top transition-opacity duration-[1400ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Relancer le diaporama" : "Mettre le diaporama en pause"}
                className="min-w-6 min-h-6 p-1.5 flex items-center justify-center text-white/90 hover:text-white"
              >
                {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
              </button>
            )}
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1} sur ${photos.length}`}
                aria-current={i === index}
                className="min-w-6 min-h-6 px-1.5 flex items-center justify-center group/dot"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-7 bg-white" : "w-1.5 bg-white/50 group-hover/dot:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <LatticeCorner className="pointer-events-none absolute top-6 left-6 w-14 sm:w-20 text-white/70" />
        <LatticeCorner className="pointer-events-none absolute bottom-6 right-6 w-14 sm:w-20 text-white/70 rotate-180" />
      </div>
    </section>
  );
}
