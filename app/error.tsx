"use client";

import { useEffect } from "react";
import Link from "next/link";

// Affichée si une page plante (ex. base de données momentanément indisponible).
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenu" className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-2xl font-bold tracking-[0.18em] text-motif" style={{ fontFamily: "var(--font-poppins)" }}>
          HOA LY
        </p>
        <h1 className="mt-8 text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
          Un problème est survenu
        </h1>
        <p className="mt-4 text-sm text-[#4A4A4A] leading-relaxed">
          La page n&apos;a pas pu s&apos;afficher. Réessayez dans un instant ; si le problème persiste, appelez la
          boutique.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => retry()}
            className="px-8 py-3 bg-motif text-white text-xs tracking-widest uppercase hover:bg-[#0A0A0A] transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
