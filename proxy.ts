import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  needsRefresh,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/session";

/*
 * Contrôle rapide de l'admin, d'après le seul cookie (pas d'accès aux données ici).
 * La vérification complète, avec la révocation, se fait dans les pages et les routes API (lib/auth.ts).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Session expirée, reconnectez-vous." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  // Session glissante : l'activité repousse l'expiration, dans la limite de la durée maximale.
  if (needsRefresh(session)) {
    const { token, expiresAt } = await createSessionToken(session.issuedAt);
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions(expiresAt));
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/showcase/:path*"],
};
