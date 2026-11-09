import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore, ValidationError } from "@/lib/store";
import { cropImage, type CropArea } from "@/lib/store/images";
import { loadImageSource } from "@/lib/store/image-source";

function parseArea(value: unknown): CropArea {
  const a = (value ?? {}) as Record<string, unknown>;
  const nums = [a.x, a.y, a.width, a.height].map(Number);
  const [x, y, width, height] = nums;
  const valid =
    nums.every(Number.isFinite) &&
    x >= 0 && y >= 0 && width > 0 && height > 0 &&
    x + width <= 100.5 && y + height <= 100.5;
  if (!valid) throw new ValidationError("Zone de recadrage invalide.");
  return { x, y, width, height };
}

/**
 * Recadre une photo existante et l'enregistre comme nouvelle image.
 * Corps : { src, area: { x, y, width, height } en %, width?: largeur finale en px }.
 * L'image d'origine n'est pas modifiée.
 */
export async function POST(req: Request) {
  return adminRoute(async () => {
    const body = (await readJson(req)) as { src?: unknown; area?: unknown; width?: unknown };
    const area = parseArea(body?.area);
    let width: number | undefined;
    if (body?.width !== undefined && body.width !== null) {
      width = Number(body.width);
      if (!Number.isInteger(width) || width < 100 || width > 4000) throw new ValidationError("Largeur invalide.");
    }
    const input = await loadImageSource(String(body?.src ?? ""));
    const image = await cropImage(input, area, width);
    return { url: await getStore().storeImage(image) };
  });
}
