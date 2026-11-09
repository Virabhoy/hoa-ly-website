import { adminRoute, readJson } from "@/lib/admin-api";
import { getStore } from "@/lib/store";
import { parseSetting } from "@/lib/store/validate";

// Seuls les réglages modifiables depuis l'admin sont renvoyés (pas les réglages internes comme « auth »).
const PUBLIC_KEYS = ["store_hours", "announcement"];

export async function GET() {
  return adminRoute(async () =>
    Object.entries(await getStore().getSettings())
      .filter(([key]) => PUBLIC_KEYS.includes(key))
      .map(([key, value]) => ({ key, value }))
  );
}

export async function POST(req: Request) {
  return adminRoute(
    async () => {
      const { key, value } = parseSetting(await readJson(req));
      await getStore().setSetting(key, value);
    },
    { refresh: true }
  );
}
