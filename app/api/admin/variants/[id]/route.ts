import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore, ValidationError } from "@/lib/store";

interface Params { id: string }

// Mise à jour rapide du stock d'une variante (page Stocks de l'admin).
export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(
    async () => {
      const body = (await readJson(req)) as { stock?: unknown };
      const stock = Number(body?.stock);
      if (!Number.isInteger(stock) || stock < 0) throw new ValidationError("Stock invalide.");
      await getStore().updateVariantStock((await params).id, stock);
    },
    { refresh: true }
  );
}
