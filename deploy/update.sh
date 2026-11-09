#!/usr/bin/env bash
# =============================================================================
# Mise à jour du site Hoa Ly sur le VPS, à partir d'une nouvelle archive décompressée.
#
# Usage, depuis le dossier de la nouvelle archive, en root :
#   sudo bash deploy/update.sh
#
# Déroulement :
#   1. sauvegarde du catalogue ;
#   2. la nouvelle version est installée et compilée à côté (/var/www/hoaly-next),
#      pendant que le site actuel continue de tourner ;
#   3. si la compilation échoue, rien n'est changé ;
#   4. sinon bascule en quelques secondes ; si la nouvelle version ne répond pas,
#      l'ancienne est remise en place automatiquement.
#
# Le catalogue (/var/lib/hoaly) et la configuration (.env.local) ne sont jamais touchés.
# La version précédente reste dans /var/www/hoaly-prev pour un retour arrière manuel.
# =============================================================================
set -euo pipefail

APP_DIR=/var/www/hoaly
NEXT_DIR=/var/www/hoaly-next
PREV_DIR=/var/www/hoaly-prev
APP_USER=hoaly
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

fail() { printf '\033[1;31mErreur :\033[0m %s\n' "$1" >&2; exit 1; }
responds() {
  for _ in $(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:3000/ && return 0; sleep 1; done
  return 1
}

[[ $EUID -eq 0 ]] || fail "lancez ce script en root : sudo bash deploy/update.sh"
[[ -f "$APP_DIR/.env.local" ]] || fail "site non installé : lancez d'abord deploy/install.sh"
[[ "$SRC" != "$APP_DIR" && "$SRC" != "$NEXT_DIR" ]] || fail "lancez le script depuis le dossier de la NOUVELLE archive."

echo "==> Sauvegarde du catalogue"
/etc/cron.daily/hoaly-backup

echo "==> Préparation de la nouvelle version (le site actuel reste en ligne)"
rm -rf "$NEXT_DIR"
rsync -a --exclude /node_modules --exclude /.next --exclude /data --exclude '.env*' "$SRC/" "$NEXT_DIR/"
cp -p "$APP_DIR/.env.local" "$NEXT_DIR/.env.local"
chown -R "$APP_USER:$APP_USER" "$NEXT_DIR"

if ! runuser -u "$APP_USER" -- env HOME="$NEXT_DIR" NEXT_TELEMETRY_DISABLED=1 \
  bash -c "cd '$NEXT_DIR' && npm ci --no-audit --no-fund && npm run build"; then
  rm -rf "$NEXT_DIR"
  fail "la compilation a échoué : le site en ligne n'a pas été modifié."
fi

# Base PostgreSQL branchée : ajoute les éventuelles nouvelles tables ou colonnes (aucune donnée effacée).
if grep -q '^DATABASE_URL=.' "$NEXT_DIR/.env.local"; then
  echo "==> Préparation de la base"
  runuser -u "$APP_USER" -- env HOME="$NEXT_DIR" bash -c "cd '$NEXT_DIR' && npm run --silent db:setup" \
    || fail "la base n'a pas pu être préparée : le site en ligne n'a pas été modifié."
fi

echo "==> Bascule vers la nouvelle version"
install -m 0644 "$SRC/deploy/hoaly.service" /etc/systemd/system/hoaly.service
install -m 0755 "$SRC/deploy/hoaly-backup" /etc/cron.daily/hoaly-backup
systemctl daemon-reload
systemctl stop hoaly
rm -rf "$PREV_DIR"
mv "$APP_DIR" "$PREV_DIR"
mv "$NEXT_DIR" "$APP_DIR"
systemctl start hoaly

if responds; then
  echo "Mise à jour terminée. Version précédente conservée dans $PREV_DIR."
  echo "Retour arrière si besoin : sudo systemctl stop hoaly && sudo mv $APP_DIR $NEXT_DIR && sudo mv $PREV_DIR $APP_DIR && sudo systemctl start hoaly"
else
  echo "La nouvelle version ne répond pas : retour à la version précédente."
  systemctl stop hoaly
  mv "$APP_DIR" "$NEXT_DIR"
  mv "$PREV_DIR" "$APP_DIR"
  systemctl start hoaly
  responds || fail "le site ne répond plus. Consultez : journalctl -u hoaly -n 50"
  fail "mise à jour annulée, l'ancienne version est de nouveau en ligne. Version en échec dans $NEXT_DIR (journalctl -u hoaly -n 50)."
fi
