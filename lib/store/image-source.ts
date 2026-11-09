import { promises as fs } from "fs";
import path from "path";
import { MAX_IMAGE_BYTES } from "./images";
import { UPLOADS_DIR } from "./local";
import { ValidationError } from "./types";

/*
 * Lecture de l'image d'origine à recadrer, à partir de l'adresse utilisée sur le site.
 * Seules trois provenances sont acceptées (protection contre la lecture de fichiers arbitraires
 * et contre les requêtes vers d'autres serveurs) :
 * - /media/... : photos envoyées depuis l'admin (stockage en fichiers) ;
 * - /images/... et autres fichiers de public/ ;
 * - Unsplash, seul hébergeur autorisé dans next.config.ts (photos de démonstration).
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;
const REMOTE_HOSTS = [/^images\.unsplash\.com$/, /^plus\.unsplash\.com$/];

async function readLocal(file: string): Promise<Buffer> {
  try {
    const stat = await fs.stat(file);
    if (!stat.isFile() || stat.size > MAX_IMAGE_BYTES) throw new Error();
    return await fs.readFile(file);
  } catch {
    throw new ValidationError("Image introuvable.");
  }
}

export async function loadImageSource(src: string): Promise<Buffer> {
  if (typeof src !== "string" || !src || src.length > 2000) throw new ValidationError("Image invalide.");

  if (src.startsWith("/media/")) {
    const name = src.slice("/media/".length);
    if (!/^[a-z0-9-]+\.(webp|jpe?g|png|avif)$/i.test(name)) throw new ValidationError("Image invalide.");
    return readLocal(path.join(UPLOADS_DIR, name));
  }

  if (src.startsWith("/")) {
    let decoded: string;
    try {
      decoded = decodeURIComponent(src.split("?")[0]);
    } catch {
      throw new ValidationError("Image invalide.");
    }
    const file = path.resolve(PUBLIC_DIR, `.${decoded}`);
    if (!file.startsWith(PUBLIC_DIR + path.sep) || !IMAGE_FILE.test(file)) {
      throw new ValidationError("Image invalide.");
    }
    return readLocal(file);
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    throw new ValidationError("Image invalide.");
  }
  const allowed = url.protocol === "https:" && REMOTE_HOSTS.some((host) => host.test(url.hostname));
  if (!allowed) throw new ValidationError("Provenance d'image non autorisée.");

  try {
    const res = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error();
    if (Number(res.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES) throw new Error();
    const data = Buffer.from(await res.arrayBuffer());
    if (data.length > MAX_IMAGE_BYTES) throw new Error();
    return data;
  } catch {
    throw new ValidationError("Image distante inaccessible.");
  }
}
