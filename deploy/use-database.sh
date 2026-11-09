#!/usr/bin/env bash
# =============================================================================
# Options B et C : brancher le site sur une base PostgreSQL externe
# (IONOS Cloud DBaaS, Supabase ou tout autre PostgreSQL 13+).
#
# Usage, sur le serveur, après deploy/install.sh :
#   sudo bash deploy/use-database.sh
#
# Le script demande l'adresse de connexion (sans l'afficher), crée les tables, importe le
# catalogue actuel si la base est vide, puis redémarre le site.
# =============================================================================
set -euo pipefail

APP_DIR=/var/www/hoaly
APP_USER=hoaly
ENV_FILE="$APP_DIR/.env.local"

fail() { printf '\033[1;31mErreur :\033[0m %s\n' "$1" >&2; exit 1; }
[[ $EUID -eq 0 ]] || fail "lancez ce script en root : sudo bash deploy/use-database.sh"
[[ -f "$ENV_FILE" ]] || fail "site non installé : lancez d'abord deploy/install.sh"

echo "Collez l'adresse de connexion PostgreSQL (elle ne s'affichera pas)."
echo "Exemple : postgresql://utilisateur:motdepasse@hote:5432/postgres"
read -r -s -p "> " DB_URL; echo
[[ "$DB_URL" =~ ^postgres(ql)?:// ]] || fail "l'adresse doit commencer par postgresql://"
[[ "$DB_URL" != *'$'* ]] || fail "remplacez chaque \$ du mot de passe par %24 dans l'adresse, puis recommencez."
[[ "$DB_URL" != *[[:space:]]* ]] || fail "l'adresse ne doit pas contenir d'espace."

echo "Chiffrement de la connexion :"
echo "  1) automatique (recommandé : chiffré pour une base distante)"
echo "  2) chiffré avec vérification du certificat (si l'hébergeur fournit son certificat)"
read -r -p "Choix [1] : " SSL_CHOICE
SSL_MODE=auto
[[ "${SSL_CHOICE:-1}" == "2" ]] && SSL_MODE=verify

# Remplace une éventuelle configuration précédente.
sed -i '/^DATABASE_URL=/d; /^DATABASE_SSL=/d; /^# Base PostgreSQL/d' "$ENV_FILE"
{
  echo ""
  echo "# Base PostgreSQL externe (deploy/use-database.sh)"
  echo "DATABASE_URL=${DB_URL}"
  echo "DATABASE_SSL=${SSL_MODE}"
} >> "$ENV_FILE"
unset DB_URL
chown "$APP_USER:$APP_USER" "$ENV_FILE"
chmod 600 "$ENV_FILE"

echo "==> Création des tables et import du catalogue"
if ! runuser -u "$APP_USER" -- env HOME="$APP_DIR" bash -c "cd '$APP_DIR' && npm run --silent db:setup"; then
  fail "la base n'a pas pu être préparée (voir le message ci-dessus). Le site n'a pas été redémarré."
fi

echo "==> Redémarrage du site"
systemctl restart hoaly
for _ in $(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:3000/ && break; sleep 1; done
curl -fs -o /dev/null http://127.0.0.1:3000/ || fail "le site ne répond pas. Consultez : journalctl -u hoaly -n 50"
echo "Le site utilise maintenant la base externe."
