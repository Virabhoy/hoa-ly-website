#!/usr/bin/env bash
# =============================================================================
# Option A (recommandée) : base PostgreSQL installée sur le VPS lui-même.
# Gratuite, sur la même machine, jamais exposée sur internet (écoute locale uniquement).
#
# Usage, sur le serveur, après deploy/install.sh :
#   sudo bash deploy/install-postgres.sh
#
# Le script installe PostgreSQL, crée la base « hoaly » avec un mot de passe aléatoire,
# importe le catalogue actuel (fichiers de /var/lib/hoaly) puis redémarre le site sur la base.
# =============================================================================
set -euo pipefail

APP_DIR=/var/www/hoaly
APP_USER=hoaly
ENV_FILE="$APP_DIR/.env.local"

fail() { printf '\033[1;31mErreur :\033[0m %s\n' "$1" >&2; exit 1; }
[[ $EUID -eq 0 ]] || fail "lancez ce script en root : sudo bash deploy/install-postgres.sh"
[[ -f "$ENV_FILE" ]] || fail "site non installé : lancez d'abord deploy/install.sh"
if grep -q '^DATABASE_URL=.' "$ENV_FILE"; then
  fail "une base est déjà configurée dans $ENV_FILE (ligne DATABASE_URL). Rien n'a été modifié."
fi

echo "==> Installation de PostgreSQL"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q postgresql
systemctl enable --now postgresql

echo "==> Création de la base « hoaly »"
DB_PASS=$(openssl rand -hex 24)
runuser -u postgres -- psql -v ON_ERROR_STOP=1 -q <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'hoaly_app') THEN
    CREATE ROLE hoaly_app LOGIN PASSWORD '${DB_PASS}';
  ELSE
    ALTER ROLE hoaly_app PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;
SQL
runuser -u postgres -- psql -tAc "SELECT 1 FROM pg_database WHERE datname = 'hoaly'" | grep -q 1 \
  || runuser -u postgres -- createdb -O hoaly_app hoaly

echo "==> Branchement du site sur la base"
{
  echo ""
  echo "# Base PostgreSQL locale (deploy/install-postgres.sh)"
  echo "DATABASE_URL=postgresql://hoaly_app:${DB_PASS}@127.0.0.1:5432/hoaly"
} >> "$ENV_FILE"
unset DB_PASS
chown "$APP_USER:$APP_USER" "$ENV_FILE"
chmod 600 "$ENV_FILE"

echo "==> Création des tables et import du catalogue"
runuser -u "$APP_USER" -- env HOME="$APP_DIR" bash -c "cd '$APP_DIR' && npm run --silent db:setup"

echo "==> Redémarrage du site"
systemctl restart hoaly
for _ in $(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:3000/ && break; sleep 1; done
curl -fs -o /dev/null http://127.0.0.1:3000/ || fail "le site ne répond pas. Consultez : journalctl -u hoaly -n 50"
echo "Le site utilise maintenant la base PostgreSQL du serveur (sauvegardée chaque nuit avec le reste)."
