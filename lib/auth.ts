import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getStore } from "@/lib/store";
import { SESSION_COOKIE_NAME, verifySessionToken, type Session } from "@/lib/session";

/*
 * Vérification complète de la session, faite au plus près des données (pages admin et routes API).
 * Le proxy ne fait qu'un contrôle rapide du cookie : la doc Next 16 déconseille d'en faire la seule protection.
 */

/** Toute session ouverte avant cette date est refusée (mise à jour à chaque déconnexion). */
async function getRevokedBefore(): Promise<number> {
  const auth = (await getStore().getSettings()).auth as { revoked_before?: unknown } | undefined;
  return typeof auth?.revoked_before === "number" ? auth.revoked_before : 0;
}

export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;
  if (session.issuedAt <= (await getRevokedBefore())) return null;
  return session;
});

/** À appeler en tête de chaque page admin : renvoie vers la connexion si la session n'est pas valide. */
export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Invalide toutes les sessions ouvertes, sur tous les appareils. */
export async function revokeAllSessions(): Promise<void> {
  await getStore().setSetting("auth", { revoked_before: Date.now() });
}
