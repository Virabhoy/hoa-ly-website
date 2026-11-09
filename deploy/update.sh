#!/usr/bin/env bash
# =============================================================================
# Mise à jour du site Hoa Ly sur le VPS, à partir d'une nouvelle archive décompressée.
#
# Usage, depuis le dossier de la nouvelle archive, en root :
#   sudo bash deploy/update.sh
#
# Le catalogue (/var/lib/hoaly) et la configuration (.env.local) ne sont jamais touchés.
# Une sauvegarde du catalogue est faite avant toute modification.
# =============================================================================
set -euo pipefail

APP_DIR=/var/www/hoaly
APP_USER=hoaly
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

fail() { printf '\033[1;31mErreur :\033[0m %s\n' "$1" >&2; exit 1; }
[[ $EUID -eq 0 ]] || fail "lancez ce script en root : sudo bash deploy/update.sh"
[[ -f "$APP_DIR/.env.local" ]] || fail "site non installé : lancez d'abord deploy/install.sh"
[[ "$SRC" != "$APP_DIR" ]] || fail "lancez le script depuis le dossier de la NOUVELLE archive, pas depuis $APP_DIR"

echo "==> Sauvegarde du catalogue"
/etc/cron.daily/hoaly-backup

echo "==> Copie des nouveaux fichiers"
rsync -a --delete \
  --exclude /node_modules --exclude /.next --exclude /data --exclude '.env*' \
  "$SRC/" "$APP_DIR/"
install -m 0644 "$SRC/deploy/hoaly.service" /etc/systemd/system/hoaly.service
install -m 0755 "$SRC/deploy/hoaly-backup" /etc/cron.daily/hoaly-backup
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo "==> Compilation (le site actuel reste en ligne pendant ce temps)"
runuser -u "$APP_USER" -- env HOME="$APP_DIR" NEXT_TELEMETRY_DISABLED=1 \
  bash -c "cd '$APP_DIR' && npm ci --no-audit --no-fund && npm run build"

# Base PostgreSQL branchée : applique les éventuels changements du schéma (aucune donnée effacée).
if grep -q '^DATABASE_URL=.' "$APP_DIR/.env.local"; then
  echo "==> Mise à jour du schéma de la base"
  runuser -u "$APP_USER" -- env HOME="$APP_DIR" bash -c "cd '$APP_DIR' && npm run --silent db:setup"
fi

echo "==> Redémarrage"
systemctl daemon-reload
systemctl restart hoaly
for _ in $(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:3000/ && break; sleep 1; done
curl -fs -o /dev/null http://127.0.0.1:3000/ || fail "le site ne répond pas. Consultez : journalctl -u hoaly -n 50"
echo "Mise à jour terminée."
