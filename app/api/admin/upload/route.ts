import { adminRoute } from "@/lib/admin-api";
import { getStore, ValidationError } from "@/lib/store";

export async function POST(req: Request) {
  return adminRoute(async () => {
    const formData = await req.formData().catch(() => null);
    const file = formData?.get("file");
    if (!(file instanceof File)) throw new ValidationError("Aucun fichier reçu.");
    return { url: await getStore().saveImage(file) };
  });
}
