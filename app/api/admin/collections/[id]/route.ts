import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseCollectionPatch } from "@/lib/store/validate";

interface Params { id: string }

export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(
    async () => getStore().updateCollection((await params).id, parseCollectionPatch(await readJson(req))),
    { refresh: true }
  );
}

export async function DELETE(_: Request, { params }: { params: Promise<Params> }) {
  return adminRoute(async () => getStore().deleteCollection((await params).id), { refresh: true });
}
