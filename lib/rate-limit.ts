// Limiteur de tentatives en mémoire.
// Suffisant pour un seul serveur ; sur un hébergement à plusieurs instances (Vercel), chaque instance
// compte de son côté : la protection reste réelle mais moins stricte.

interface Entry {
  failures: number;
  resetAt: number;
}

const shared = globalThis as unknown as { __hoalyLimiters?: Map<string, Map<string, Entry>> };

export function createLimiter(name: string, maxFailures: number, windowMs: number) {
  shared.__hoalyLimiters ??= new Map();
  if (!shared.__hoalyLimiters.has(name)) shared.__hoalyLimiters.set(name, new Map());
  const entries = shared.__hoalyLimiters.get(name)!;

  function current(key: string): Entry | undefined {
    const entry = entries.get(key);
    if (entry && entry.resetAt <= Date.now()) {
      entries.delete(key);
      return undefined;
    }
    return entry;
  }

  return {
    /** Nombre de secondes à attendre si la clé est bloquée, sinon 0. */
    retryAfter(key: string): number {
      const entry = current(key);
      return entry && entry.failures >= maxFailures ? Math.ceil((entry.resetAt - Date.now()) / 1000) : 0;
    },
    fail(key: string) {
      const entry = current(key) ?? { failures: 0, resetAt: Date.now() + windowMs };
      entry.failures++;
      entries.set(key, entry);
      // Ménage pour que la table ne grossisse pas indéfiniment.
      if (entries.size > 5000) for (const k of entries.keys()) current(k);
    },
    reset(key: string) {
      entries.delete(key);
    },
  };
}

/** Adresse IP du client, transmise par l'hébergeur (Vercel renseigne x-forwarded-for). */
export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "inconnue"
  );
}
