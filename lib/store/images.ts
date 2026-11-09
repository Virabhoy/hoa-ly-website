import sharp from "sharp";
import { ValidationError } from "./types";

/*
 * Traitement des photos envoyées depuis l'admin, avant tout enregistrement :
 * 1. format déclaré et taille vérifiés ;
 * 2. contenu réel vérifié (signature du fichier), sans se fier à ce que dit le navigateur ;
 * 3. image réencodée en WebP : métadonnées supprimées (dont la position GPS des photos de téléphone),
 *    orientation appliquée, dimensions plafonnées pour alléger le site.
 */

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const MAX_DIMENSION = 2400;

const PIXEL_LIMIT = 60_000_000;

function startsWith(bytes: Buffer, signature: number[], offset = 0): boolean {
  return signature.every((b, i) => bytes[offset + i] === b);
}

/** Reconnaît JPEG, PNG, WebP et AVIF d'après les premiers octets du fichier. */
function hasImageSignature(bytes: Buffer): boolean {
  if (bytes.length < 12) return false;
  const ascii = (start: number, end: number) => bytes.subarray(start, end).toString("latin1");
  return (
    startsWith(bytes, [0xff, 0xd8, 0xff]) ||
    startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) ||
    (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") ||
    (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12)))
  );
}

export interface ProcessedImage {
  data: Buffer;
  extension: "webp";
  contentType: "image/webp";
}

export async function processImage(file: File): Promise<ProcessedImage> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new ValidationError("Format non pris en charge : utilisez JPG, PNG, WEBP ou AVIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) throw new ValidationError("Photo trop lourde (15 Mo maximum).");

  const input = Buffer.from(await file.arrayBuffer());
  if (!hasImageSignature(input)) throw new ValidationError("Ce fichier n'est pas une image valide.");

  try {
    const data = await sharp(input, { limitInputPixels: PIXEL_LIMIT })
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    return { data, extension: "webp", contentType: "image/webp" };
  } catch {
    throw new ValidationError("Image illisible ou endommagée.");
  }
}

/** Zone à conserver, en pourcentage de l'image (comme renvoyé par l'outil de recadrage de l'admin). */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Recadre puis redimensionne une image, à partir de l'original et en un seul encodage.
 * `targetWidth` fixe la largeur finale (jamais d'agrandissement, 2400 px maximum de côté).
 */
export async function cropImage(input: Buffer, area: CropArea, targetWidth?: number): Promise<ProcessedImage> {
  if (!hasImageSignature(input)) throw new ValidationError("Ce fichier n'est pas une image valide.");
  try {
    const meta = await sharp(input, { limitInputPixels: PIXEL_LIMIT }).metadata();
    // Dimensions telles qu'affichées, orientation de l'appareil photo appliquée.
    const W = meta.autoOrient?.width ?? meta.width;
    const H = meta.autoOrient?.height ?? meta.height;
    if (!W || !H) throw new Error("dimensions inconnues");

    const left = Math.min(W - 1, Math.max(0, Math.round((area.x / 100) * W)));
    const top = Math.min(H - 1, Math.max(0, Math.round((area.y / 100) * H)));
    const width = Math.max(1, Math.min(W - left, Math.round((area.width / 100) * W)));
    const height = Math.max(1, Math.min(H - top, Math.round((area.height / 100) * H)));

    const data = await sharp(input, { limitInputPixels: PIXEL_LIMIT })
      .autoOrient()
      .extract({ left, top, width, height })
      .resize({
        width: Math.min(targetWidth ?? MAX_DIMENSION, MAX_DIMENSION),
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();
    return { data, extension: "webp", contentType: "image/webp" };
  } catch {
    throw new ValidationError("Recadrage impossible : image illisible ou zone invalide.");
  }
}
