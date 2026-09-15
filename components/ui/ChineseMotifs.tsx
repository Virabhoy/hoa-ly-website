// Motifs décoratifs d'inspiration chinoise (nuages, treillis, frise).
// SVG en currentColor : la couleur se règle avec une classe text-*.

interface MotifProps {
  className?: string;
}

/** Nuage stylisé (xiangyun) : volutes + barres arrondies. */
export function CloudMotif({ className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 240 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M92 52 C90 30 118 20 132 34 C144 46 130 60 120 52 C112 46 120 36 128 42" />
      <path d="M138 52 C142 36 166 30 176 42 C184 52 172 62 164 55 C158 50 164 43 170 47" />
      <rect x="20" y="52" width="170" height="14" rx="7" />
      <path d="M32 59 H96" />
      <rect x="62" y="72" width="160" height="14" rx="7" />
      <path d="M150 79 H210" />
      <path d="M4 59 H14" />
      <path d="M228 79 H236" />
    </svg>
  );
}

/** Coin en treillis (fretwork). Orienté en haut à gauche ; faire pivoter avec rotate-*. */
export function LatticeCorner({ className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 98 V2 H98" />
      <path d="M10 98 V10 H98" />
      <path d="M10 34 H22 V22 H34 V10" />
      <rect x="26" y="26" width="10" height="10" />
      <rect x="46" y="10" width="12" height="12" />
      <rect x="10" y="46" width="12" height="12" />
      <path d="M58 16 H80" />
      <path d="M16 58 V80" />
    </svg>
  );
}

/** Séparateur ornemental à placer sous un titre. */
export function OrnamentDivider({ className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 160 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 8 H56" />
      <path d="M60 8 C62 3 70 3 70 8 C70 11 66 11 66 8" />
      <path d="M80 2 L86 8 L80 14 L74 8 Z" />
      <circle cx="80" cy="8" r="1.5" fill="currentColor" />
      <path d="M100 8 C98 3 90 3 90 8 C90 11 94 11 94 8" />
      <path d="M104 8 H160" />
    </svg>
  );
}

/** Frise géométrique répétée sur toute la largeur. Un seul usage par page (id fixe). */
export function FretBorder({ className }: MotifProps) {
  return (
    <svg width="100%" height="12" aria-hidden="true" className={className}>
      <defs>
        <pattern id="hoaly-fret" width="20" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 11 H3 V1 H15 V8 H8 V4 H11 M15 11 H20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#hoaly-fret)" />
    </svg>
  );
}
