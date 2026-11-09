"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Crop, ImagePlus, Star, X } from "lucide-react";
import ImageCropDialog from "@/components/admin/ImageCropDialog";
import Spinner from "@/components/ui/Spinner";
import { errorMessage, uploadImage } from "@/lib/admin-client";
import { cn } from "@/lib/utils";

interface ImageListEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
  /** Nombre maximum de photos (1 pour une photo de couverture seule). */
  max?: number;
  hint?: string;
  onUploadingChange?: (uploading: boolean) => void;
  /** Format proposé par défaut dans l'outil de recadrage. */
  cropFormat?: React.ComponentProps<typeof ImageCropDialog>["defaultFormat"];
}

/** Envoi, suppression et réorganisation de photos. La première photo est la photo principale. */
export default function ImageListEditor({
  images,
  onChange,
  max = 20,
  hint,
  onUploadingChange,
  cropFormat = "3:4",
}: ImageListEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  // Index de la photo en cours de recadrage.
  const [cropping, setCropping] = useState<number | null>(null);

  async function addFiles(files: File[]) {
    const room = max - images.length;
    if (room <= 0) return;
    const batch = files.filter((f) => f.type.startsWith("image/")).slice(0, room);
    if (!batch.length) return;

    setError("");
    setUploading(batch.length);
    onUploadingChange?.(true);
    const added: string[] = [];
    for (const file of batch) {
      try {
        added.push(await uploadImage(file));
      } catch (e) {
        setError(`${file.name} : ${errorMessage(e)}`);
      }
      setUploading((n) => n - 1);
    }
    onChange([...images, ...added].slice(0, max));
    onUploadingChange?.(false);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  const canAdd = images.length < max;

  return (
    <div>
      <div
        className={cn(
          "grid gap-3",
          max === 1 ? "grid-cols-2 sm:grid-cols-3 max-w-xs" : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
        )}
      >
        {images.map((url, i) => (
          <div key={url} className="group relative aspect-[3/4] bg-[#F0EDE8] overflow-hidden">
            <Image src={url} alt={`Photo ${i + 1}`} fill sizes="160px" className="object-cover" />
            {i === 0 && max > 1 && (
              <span className="absolute top-1.5 left-1.5 bg-motif text-white text-[9px] tracking-wider uppercase px-1.5 py-0.5">
                Principale
              </span>
            )}
            <button
              type="button"
              onClick={() => setCropping(i)}
              className="absolute top-1.5 right-8 bg-black/60 text-white p-1 hover:bg-[#0A0A0A] transition-colors"
              aria-label={`Rogner et redimensionner la photo ${i + 1}`}
              title="Rogner et redimensionner"
            >
              <Crop size={12} />
            </button>
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1 hover:bg-red-600 transition-colors"
              aria-label="Retirer la photo"
              title="Retirer"
            >
              <X size={12} />
            </button>
            {max > 1 && images.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/55 text-white">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  className="p-1.5 disabled:opacity-30 hover:bg-black/40"
                  aria-label="Déplacer vers la gauche"
                >
                  <ArrowLeft size={12} />
                </button>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => move(i, 0)}
                    className="p-1.5 hover:bg-black/40"
                    aria-label="Choisir comme photo principale"
                    title="Photo principale"
                  >
                    <Star size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === images.length - 1}
                  className="p-1.5 disabled:opacity-30 hover:bg-black/40"
                  aria-label="Déplacer vers la droite"
                >
                  <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        ))}

        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(Array.from(e.dataTransfer.files));
            }}
            disabled={uploading > 0}
            className={cn(
              "aspect-[3/4] border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center px-2 transition-colors",
              dragOver ? "border-motif text-motif bg-red-50" : "border-[#E5E5E5] text-[#6B6B6B] hover:border-motif hover:text-motif"
            )}
          >
            {uploading > 0 ? (
              <>
                <Spinner />
                <span className="text-[10px]">Envoi ({uploading})...</span>
              </>
            ) : (
              <>
                <ImagePlus size={20} />
                <span className="text-[10px] leading-tight">{max === 1 ? "Choisir une photo" : "Ajouter des photos"}</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={max > 1}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(Array.from(e.target.files));
          e.target.value = "";
        }}
      />

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      {hint && <p className="mt-3 text-xs text-[#6B6B6B]">{hint}</p>}
      {images.length > 0 && (
        <p className="mt-1 text-xs text-[#6B6B6B]">
          <Crop size={11} className="inline -mt-0.5 mr-1" aria-hidden />
          Cliquez sur l&apos;icône de recadrage d&apos;une photo pour ajuster son cadrage et sa taille.
        </p>
      )}

      {cropping !== null && images[cropping] && (
        <ImageCropDialog
          src={images[cropping]}
          defaultFormat={cropFormat}
          onClose={() => setCropping(null)}
          onCropped={(url) => {
            onChange(images.map((img, idx) => (idx === cropping ? url : img)));
            setCropping(null);
          }}
        />
      )}
    </div>
  );
}
