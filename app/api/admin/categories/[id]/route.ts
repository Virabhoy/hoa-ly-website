import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseCategoryPatch } from "@/lib/store/validate";

interface Params { id: string }

export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(
    async () => getStore().updateCategory((await params).id, parseCategoryPatch(await readJson(req))),
    { refresh: true }
  );
}

export async function DELETE(_: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(async () => getStore().deleteCategory((await params).id), { refresh: true });
}
