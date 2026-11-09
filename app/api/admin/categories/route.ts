import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseCategory } from "@/lib/store/validate";

export async function GET() {
  return adminRoute(async () =>
    (await getStore().listCategories()).sort((a, b) => a.display_order - b.display_order)
  );
}

export async function POST(req: Request) {
  return adminRoute(async () => getStore().createCategory(parseCategory(await readJson(req))), {
    status: 201,
    refresh: true,
  });
}
