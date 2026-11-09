import { NextResponse } from "next/server";
import { getSession, revokeAllSessions } from "@/lib/auth";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/session";

export async function POST() {
  // Seule une session valide peut déconnecter tout le monde (évite qu'un tiers force la déconnexion).
  if (await getSession()) {
    try {
      await revokeAllSessions();
    } catch (e) {
      console.error("[admin] révocation impossible", e);
    }
  }
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(SESSION_COOKIE_NAME, "", { ...sessionCookieOptions(0), maxAge: 0 });
  res.headers.set("Clear-Site-Data", '"cookies"');
  return res;
}
