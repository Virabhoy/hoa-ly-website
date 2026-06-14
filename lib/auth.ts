import { cookies } from "next/headers";

const SESSION_COOKIE = "hoaly_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

function hexFromArrayBuffer(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET ?? "default-dev-secret-change-in-production";
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(payload: string): Promise<string> {
  const key = await getKey();
  const enc = new TextEncoder();
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return hexFromArrayBuffer(sigBuf);
}

export async function createSession(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION;
  const payload = `admin:${expires}`;
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySession(token: string): Promise<boolean> {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const payload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  try {
    const expected = await sign(payload);
    if (expected !== sig) return false;
    const expires = parseInt(payload.split(":")[1], 10);
    return Date.now() < expires;
  } catch {
    return false;
  }
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
