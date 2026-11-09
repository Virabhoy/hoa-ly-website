import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore, ValidationError } from "@/lib/store";
import type { Json } from "@/lib/catalog/types";

const KEYS = ["store_hours", "announcement"];

export async function GET() {
  return adminRoute(async () =>
    Object.entries(await getStore().getSettings()).map(([key, value]) => ({ key, value }))
  );
}

export async function POST(req: Request) {
  return adminRoute(
    async () => {
      const { key, value } = (await readJson(req)) as { key?: string; value?: Json };
      if (!key || !KEYS.includes(key) || value === undefined) throw new ValidationError("Paramètre inconnu.");
      await getStore().setSetting(key, value);
    },
    { refresh: true }
  );
}
