import { localStore } from "./local";
import { postgresStore } from "./postgres";
import type { CatalogStore } from "./types";

export * from "./types";

/**
 * Base PostgreSQL si DATABASE_URL est renseignée (VPS, IONOS Cloud ou Supabase),
 * sinon fichiers sur le serveur (dossier HOALY_DATA_DIR ou data/).
 */
export function getStore(): CatalogStore {
  return process.env.DATABASE_URL ? postgresStore : localStore;
}
