"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { api, errorMessage } from "@/lib/admin-client";
import { cn } from "@/lib/utils";

/** Formats proposés ; « original » reprend les proportions de la photo. */
const FORMATS = [
  { key: "3:4", label: "3:4", hint: "Portrait (catalogue)", ratio: 3 / 4 },
  { key: "4:5", label: "4:5", hint: "Portrait", ratio: 4 / 5 },
  { key: "1:1", label: "1:1", hint: "Carré", ratio: 1 },
  { key: "4:3", label: "4:3", hint: "Paysage", ratio: 4 / 3 },
  { key: "16:9", label: "16:9", hint: "Bannière", ratio: 16 / 9 },
  { key: "original", label: "Origine", hint: "Proportions de la photo", ratio: null },
] as const;

type FormatKey = (typeof FORMATS)[number]["key"];

/** Largeurs finales proposées ; le serveur n'agrandit jamais et plafonne à 2400 px. */
const WIDTHS = [
  { value: 0, label: "Maximale (jusqu'à 2400 px)" },
  { value: 2000, label: "2000 px" },
  { value: 1600, label: "1600 px" },
  { value: 1200, label: "1200 px (recommandé pour le site)" },
  { value: 800, label: "800 px (léger)" },
];

const MAX_SIDE = 2400;

interface ImageCropDialogProps {
  src: string;
  /** Format sélectionné à l'ouverture (ex. 3:4 pour les produits). */
  defaultFormat?: FormatKey;
  onClose: () => void;
  /** Reçoit l'adresse de la nouvelle image recadrée. */
  onCropped: (url: string) => void;
}

/** Aperçu servi par l'optimiseur de Next : même origine (compatible CSP), orientation déjà appliquée. */
function previewUrl(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=3840&q=75`;
}

export default function ImageCropDialog({ src, defaultFormat = "3:4", onClose, onCropped }: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [format, setFormat] = useState<FormatKey>(defaultFormat);
  const [targetWidth, setTargetWidth] = useState(1200);
  const [area, setArea] = useState<Area | null>(null);
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const ratio =
    FORMATS.find((f) => f.key === format)?.ratio ?? (natural ? natural.width / natural.height : 3 / 4);

  // Fermeture avec Échap, page figée derrière la fenêtre, focus placé dans la fenêtre.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, saving]);

  // Dimensions finales estimées (le serveur applique exactement la même règle).
  const output = useMemo(() => {
    if (!area || !natural) return null;
    const w = (area.width / 100) * natural.width;
    const h = (area.height / 100) * natural.height;
    const scale = Math.min(1, (targetWidth || MAX_SIDE) / w, MAX_SIDE / h, MAX_SIDE / w);
    return { width: Math.round(w * scale), height: Math.round(h * scale), small: w < 800 };
  }, [area, natural, targetWidth]);

  async function apply() {
    if (!area) return;
    setSaving(true);
    setError("");
    try {
      const { url } = await api<{ url: string }>("/api/admin/images/crop", "POST", {
        src,
        area,
        ...(targetWidth ? { width: targetWidth } : {}),
      });
      onCropped(url);
    } catch (e) {
      setError(errorMessage(e));
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 flex items-stretch sm:items-center justify-center sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="crop-title"
        tabIndex={-1}
        className="bg-white w-full sm:max-w-3xl flex flex-col max-h-full sm:max-h-[94vh] outline-none"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]">
          <h2 id="crop-title" className="text-sm font-medium tracking-widest uppercase">
            Rogner et redimensionner
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-1.5 text-[#6B6B6B] hover:text-[#0A0A0A]"
            aria-label="Fermer sans enregistrer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Zone de recadrage : glisser pour déplacer, molette ou pincement pour zoomer. */}
        <div className="relative flex-1 min-h-[45vh] sm:min-h-0 sm:h-[52vh] bg-[#111]">
          {loadError ? (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-white/80 px-6 text-center">
              Impossible de charger cette photo.
            </p>
          ) : (
            <Cropper
              image={previewUrl(src)}
              crop={crop}
              zoom={zoom}
              aspect={ratio}
              minZoom={1}
              maxZoom={4}
              showGrid
              objectFit="contain"
              disableAutomaticStylesInjection
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(percentages) => setArea(percentages)}
              onMediaLoaded={(m) => setNatural({ width: m.naturalWidth, height: m.naturalHeight })}
              mediaProps={{ onError: () => setLoadError(true), alt: "Photo à recadrer" }}
            />
          )}
          {!natural && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Spinner className="w-6 h-6 border-white/20 border-t-white" />
            </div>
          )}
        </div>

        <div className="px-5 py-4 space-y-4 overflow-y-auto">
          {/* Zoom */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
              className="p-1 text-[#6B6B6B] hover:text-[#0A0A0A]"
              aria-label="Dézoomer"
            >
              <ZoomOut size={16} />
            </button>
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-[#C30202]"
              aria-label="Zoom"
            />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)))}
              className="p-1 text-[#6B6B6B] hover:text-[#0A0A0A]"
              aria-label="Zoomer"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Format */}
          <fieldset>
            <legend className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Format</legend>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFormat(f.key)}
                  aria-pressed={format === f.key}
                  className={cn(
                    "px-3 py-1.5 text-xs border transition-colors",
                    format === f.key
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "border-[#E5E5E5] hover:border-[#0A0A0A]"
                  )}
                >
                  {f.label} <span className={format === f.key ? "text-white/70" : "text-[#767676]"}>{f.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Taille finale */}
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="crop-width" className="text-xs tracking-widest uppercase text-[#6B6B6B]">
              Largeur finale
            </label>
            <select
              id="crop-width"
              value={targetWidth}
              onChange={(e) => setTargetWidth(Number(e.target.value))}
              className="border border-[#E5E5E5] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
            >
              {WIDTHS.map((w) => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </select>
            {output && (
              <p className="text-xs text-[#4A4A4A]">
                Résultat : <strong className="font-medium">{output.width} × {output.height} px</strong>
                {output.small && <span className="text-amber-800"> (zone petite : la photo pourra paraître floue)</span>}
              </p>
            )}
          </div>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <p className="text-xs text-[#6B6B6B]">
            La photo d&apos;origine n&apos;est pas modifiée : la version recadrée la remplace dans la liste.
          </p>
        </div>

        <div className="flex gap-3 justify-end px-5 py-4 border-t border-[#E5E5E5]">
          <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
            Annuler
          </Button>
          <Button type="button" onClick={apply} disabled={saving || !area || loadError}>
            {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
            Appliquer
          </Button>
        </div>
      </div>
    </div>
  );
}
