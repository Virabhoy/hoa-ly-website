import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { NotFoundError, ValidationError } from "@/lib/store";

// Les réponses de l'admin ne doivent jamais être gardées en cache (navigateur ou intermédiaire).
const NO_STORE = { "Cache-Control": "no-store" };

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

/** Refuse les requêtes envoyées depuis un autre site (protection CSRF en plus du cookie SameSite=Strict). */
async function isCrossSite(): Promise<boolean> {
  const h = await headers();
  if (h.get("sec-fetch-site") === "cross-site") return true;
  const origin = h.get("origin");
  if (!origin) return false;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

/**
 * Enveloppe commune des routes /api/admin : vérifie l'origine et la session, renvoie du JSON
 * et transforme les erreurs en messages lisibles pour l'admin.
 */
export async function adminRoute(
  handler: () => Promise<unknown>,
  { status = 200, refresh = false }: { status?: number; refresh?: boolean } = {}
) {
  if (await isCrossSite()) return json({ error: "Requête refusée." }, 403);
  if (!(await getSession())) return json({ error: "Session expirée, reconnectez-vous." }, 401);
  try {
    const data = await handler();
    // Toute modification du catalogue doit se voir aussitôt sur le site public.
    if (refresh) revalidatePath("/", "layout");
    return json(data ?? { ok: true }, status);
  } catch (e) {
    if (e instanceof ValidationError) return json({ error: e.message }, 400);
    if (e instanceof NotFoundError) return json({ error: e.message }, 404);
    console.error("[admin]", e);
    return json({ error: "Erreur serveur, réessayez." }, 500);
  }
}

/** Lit le corps JSON d'une requête, ou lève une erreur lisible. */
export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new ValidationError("Requête invalide.");
  }
}
