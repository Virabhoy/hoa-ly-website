import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseStock } from "@/lib/store/validate";

interface Params { id: string }

// Mise à jour rapide du stock d'une variante (page Stocks de l'admin).
export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(
    async () => getStore().updateVariantStock((await params).id, parseStock(await readJson(req))),
    { refresh: true }
  );
}
