import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/session";
import { clientIp, createLimiter } from "@/lib/rate-limit";

// 5 échecs par adresse IP, puis blocage pendant 15 minutes.
const attempts = createLimiter("login", 5, 15 * 60 * 1000);
const MAX_INPUT = 256;

/** Comparaison en temps constant : on compare des empreintes de même longueur. */
function sameSecret(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

const noStore = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 2048) {
    return NextResponse.json({ error: "Requête trop volumineuse." }, { status: 413, headers: noStore });
  }
  const ip = clientIp(req);
  const wait = attempts.retryAfter(ip);
  if (wait > 0) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${Math.ceil(wait / 60)} min.` },
      { status: 429, headers: { ...noStore, "Retry-After": String(wait) } }
    );
  }

  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPassword) {
    console.error("[admin] ADMIN_USERNAME ou ADMIN_PASSWORD manquant");
    return NextResponse.json({ error: "Connexion admin non configurée." }, { status: 500, headers: noStore });
  }

  const body = (await req.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username.slice(0, MAX_INPUT) : "";
  const password = typeof body?.password === "string" ? body.password.slice(0, MAX_INPUT) : "";

  // Les deux comparaisons sont toujours faites, pour ne pas révéler lequel des deux est faux.
  const userOk = sameSecret(username, expectedUser);
  const passwordOk = sameSecret(password, expectedPassword);

  if (!userOk || !passwordOk) {
    attempts.fail(ip);
    console.warn("[admin] échec de connexion", { ip, at: new Date().toISOString() });
    // Petit délai pour ralentir les essais automatisés.
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401, headers: noStore });
  }

  attempts.reset(ip);
  let session: { token: string; expiresAt: number };
  try {
    session = await createSessionToken();
  } catch (e) {
    console.error("[admin]", (e as Error).message);
    return NextResponse.json({ error: "Connexion admin non configurée." }, { status: 500, headers: noStore });
  }

  const res = NextResponse.json({ ok: true }, { headers: noStore });
  res.cookies.set(SESSION_COOKIE_NAME, session.token, sessionCookieOptions(session.expiresAt));
  return res;
}
