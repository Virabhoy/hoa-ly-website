import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hexFromArrayBuffer(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("hoaly_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);

    try {
      const secret = process.env.SESSION_SECRET ?? "default-dev-secret-change-in-production";
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
      );
      const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
      const expected = hexFromArrayBuffer(sigBuf);

      if (expected !== sig) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      const expires = parseInt(payload.split(":")[1], 10);
      if (Date.now() >= expires) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
