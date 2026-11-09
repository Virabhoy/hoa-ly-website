// Jeton de session de l'admin, signé en HMAC-SHA256.
// Ce fichier n'utilise que Web Crypto : il sert à la fois au proxy et au serveur.

/** Déconnexion automatique après 1 h sans activité. */
export const SESSION_IDLE_MS = 60 * 60 * 1000;
/** Durée maximale d'une session, même active. */
export const SESSION_MAX_MS = 12 * 60 * 60 * 1000;

const MIN_SECRET_LENGTH = 32;
const isProd = process.env.NODE_ENV === "production";

// En production, le préfixe __Host- impose HTTPS, Path=/ et aucun domaine : le cookie ne peut pas être
// posé ou écrasé par un sous-domaine.
export const SESSION_COOKIE_NAME = isProd ? "__Host-hoaly_session" : "hoaly_session";

export interface Session {
  issuedAt: number;
  expiresAt: number;
}

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET ?? "";
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`SESSION_SECRET manquant ou trop court (${MIN_SECRET_LENGTH} caractères minimum).`);
  }
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[0-9a-f]{64}$/.test(hex)) return null;
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

/** Crée un jeton. `issuedAt` est conservé lors d'un renouvellement pour borner la durée totale. */
export async function createSessionToken(issuedAt = Date.now()): Promise<{ token: string; expiresAt: number }> {
  const expiresAt = Math.min(Date.now() + SESSION_IDLE_MS, issuedAt + SESSION_MAX_MS);
  const payload = `admin.${issuedAt}.${expiresAt}`;
  const signature = await crypto.subtle.sign("HMAC", await getKey(), encoder.encode(payload));
  return { token: `${payload}.${toHex(signature)}`, expiresAt };
}

/** Vérifie la signature (en temps constant) et les dates d'expiration. */
export async function verifySessionToken(token: string | undefined): Promise<Session | null> {
  if (!token || token.length > 200) return null;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "admin") return null;

  const signature = fromHex(parts[3]);
  if (!signature) return null;

  let key: CryptoKey;
  try {
    key = await getKey();
  } catch {
    return null;
  }
  const payload = `admin.${parts[1]}.${parts[2]}`;
  // crypto.subtle.verify compare en temps constant, contrairement à une comparaison de chaînes.
  if (!(await crypto.subtle.verify("HMAC", key, signature, encoder.encode(payload)))) return null;

  const issuedAt = Number(parts[1]);
  const expiresAt = Number(parts[2]);
  const now = Date.now();
  if (!Number.isSafeInteger(issuedAt) || !Number.isSafeInteger(expiresAt)) return null;
  if (now >= expiresAt || now >= issuedAt + SESSION_MAX_MS || issuedAt > now + 60_000) return null;
  return { issuedAt, expiresAt };
}

/** Vrai quand la moitié du délai d'inactivité est écoulée et que la session peut encore être prolongée. */
export function needsRefresh(session: Session): boolean {
  const now = Date.now();
  return session.expiresAt - now < SESSION_IDLE_MS / 2 && session.expiresAt < session.issuedAt + SESSION_MAX_MS;
}

export function sessionCookieOptions(expiresAt: number) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict" as const,
    path: "/",
    expires: new Date(expiresAt),
  };
}
