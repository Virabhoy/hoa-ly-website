"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/supabase/types";
import { LatticeCorner, OrnamentDivider } from "@/components/ui/ChineseMotifs";

interface CollectionsHeroProps {
  collections: Collection[];
}

export default function CollectionsHero({ collections }: CollectionsHeroProps) {
  const [activeId, setActiveId] = useState(collections[0]?.id);

  if (!collections.length) return null;

  const active = collections.find((c) => c.id === activeId) ?? collections[0];
  const current = collections.filter((c) => !c.is_archived);
  const archived = collections.filter((c) => c.is_archived);

  return (
    <section className="grid grid-cols-1 md:grid-cols-[3fr_7fr] md:h-[calc(100svh-4rem)] bg-[#FAFAF9]">
      {/* Liste des collections (30 %) */}
      <div className="order-2 md:order-1 flex flex-col justify-between min-h-0 overflow-y-auto px-6 sm:px-10 py-10 md:py-12 md:border-r border-[#E5E5E5]">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#6B6B6B]">Nos collections</p>
          <OrnamentDivider className="mt-3 w-28 text-motif" />

          <ul className="mt-8 space-y-1">
            {current.map((c) => (
              <CollectionItem key={c.id} collection={c} active={c.id === active.id} onSelect={setActiveId} />
            ))}
          </ul>

          {archived.length > 0 && (
            <>
              <p className="mt-10 text-xs tracking-[0.3em] uppercase text-[#6B6B6B]">Anciennes collections</p>
              <ul className="mt-4 space-y-1">
                {archived.map((c) => (
                  <CollectionItem key={c.id} collection={c} active={c.id === active.id} onSelect={setActiveId} small />
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-10">
          <p className="text-sm text-[#6B6B6B] leading-relaxed">{active.description}</p>
          <Link
            href="/catalogue"
            className="inline-block mt-6 px-8 py-3 bg-[#0A0A0A] text-white text-xs tracking-widest uppercase hover:bg-motif transition-colors duration-300"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>

      {/* Image de la collection (70 %) */}
      <div className="order-1 md:order-2 relative h-[60svh] md:h-auto overflow-hidden bg-[#0A0A0A]">
        {collections.map((c, i) => {
          const isActive = c.id === active.id;
          return (
            <div
              key={c.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
            >
              {c.cover_image && (
                <Image
                  src={c.cover_image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 768px) 70vw, 100vw"
                  preload={i === 0}
                  className={`object-cover object-top transition-transform duration-[1500ms] ease-out ${isActive ? "scale-100" : "scale-105"}`}
                />
              )}
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="pointer-events-none absolute bottom-10 left-8 sm:bottom-14 sm:left-12 text-white">
          <p className="text-xs tracking-[0.3em] uppercase text-white/75">
            {active.is_archived ? "Ancienne collection" : "Collection"} · {active.short_name}
          </p>
          <p
            className="mt-2 text-4xl sm:text-6xl font-light tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {active.name}
          </p>
        </div>

        <LatticeCorner className="pointer-events-none absolute top-6 left-6 w-14 sm:w-20 text-white/70" />
        <LatticeCorner className="pointer-events-none absolute bottom-6 right-6 w-14 sm:w-20 text-white/70 rotate-180" />
      </div>
    </section>
  );
}

interface CollectionItemProps {
  collection: Collection;
  active: boolean;
  onSelect: (id: string) => void;
  small?: boolean;
}

function CollectionItem({ collection, active, onSelect, small }: CollectionItemProps) {
  return (
    <li>
      <button
        type="button"
        onMouseEnter={() => onSelect(collection.id)}
        onFocus={() => onSelect(collection.id)}
        onClick={() => onSelect(collection.id)}
        aria-pressed={active}
        className={`w-full border-l-2 pl-3 py-1.5 text-left font-light leading-tight transition-colors duration-300 ${
          small ? "text-lg" : "text-xl lg:text-2xl xl:text-3xl"
        } ${active ? "border-motif text-[#0A0A0A]" : "border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]"}`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {collection.name}
      </button>
    </li>
  );
}
