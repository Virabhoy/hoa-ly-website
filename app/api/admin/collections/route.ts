import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseCollection } from "@/lib/store/validate";

export async function GET() {
  return adminRoute(async () =>
    (await getStore().listCollections()).sort((a, b) => a.display_order - b.display_order)
  );
}

export async function POST(req: Request) {
  return adminRoute(async () => getStore().createCollection(parseCollection(await readJson(req))), {
    status: 201,
    refresh: true,
  });
}
