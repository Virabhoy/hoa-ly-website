import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore, NotFoundError } from "@/lib/store";
import { parseProductPatch } from "@/lib/store/validate";

interface Params { id: string }

export async function GET(_: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(async () => {
    const product = await getStore().getProduct((await params).id);
    if (!product) throw new NotFoundError("Produit introuvable.");
    return product;
  });
}

export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(
    async () => getStore().updateProduct((await params).id, parseProductPatch(await readJson(req))),
    { refresh: true }
  );
}

export async function DELETE(_: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(async () => getStore().deleteProduct((await params).id), { refresh: true });
}
