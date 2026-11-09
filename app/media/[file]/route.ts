import { promises as fs } from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/store/local";

// Sert les photos envoyées depuis l'admin quand le catalogue est en stockage local.

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = /^[a-z0-9-]+\.([a-z]+)$/i.exec(file);
  const type = match && TYPES[match[1].toLowerCase()];
  if (!type) return new Response("Introuvable", { status: 404 });

  try {
    const data = await fs.readFile(path.join(UPLOADS_DIR, file));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Introuvable", { status: 404 });
  }
}
