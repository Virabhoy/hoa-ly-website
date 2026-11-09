import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseProduct } from "@/lib/store/validate";

export async function GET() {
  return adminRoute(() => getStore().listProducts());
}

export async function POST(req: Request) {
  return adminRoute(async () => getStore().createProduct(parseProduct(await readJson(req))), {
    status: 201,
    refresh: true,
  });
}
