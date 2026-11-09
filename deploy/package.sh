#!/usr/bin/env bash
# =============================================================================
# Prépare l'archive à envoyer sur le VPS IONOS (à lancer sur ton ordinateur).
#
#   npm run export:ionos                      -> site seul
#   npm run export:ionos -- --avec-catalogue  -> site + catalogue saisi en local (dossier data/)
#
# L'archive est créée dans export-ionos/. Elle ne contient ni node_modules, ni .next,
# ni aucun fichier .env (les secrets sont créés directement sur le serveur).
# =============================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

WITH_DATA=0
[[ "${1:-}" == "--avec-catalogue" ]] && WITH_DATA=1

NAME="hoaly-site-$(date +%Y%m%d-%H%M)"
[[ $WITH_DATA -eq 1 ]] && NAME="$NAME-avec-catalogue"
OUT="$PWD/export-ionos"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
mkdir -p "$OUT"

EXCLUDES=(
  --exclude node_modules --exclude .next --exclude .git --exclude '.env*'
  --exclude .vercel --exclude .claude --exclude export-ionos
  --exclude tsconfig.tsbuildinfo --exclude next-env.d.ts --exclude .DS_Store --exclude '*.tmp'
)
[[ $WITH_DATA -eq 1 ]] || EXCLUDES+=(--exclude /data)

rsync -a "${EXCLUDES[@]}" ./ "$STAGE/$NAME/"
COPYFILE_DISABLE=1 tar -czf "$OUT/$NAME.tar.gz" -C "$STAGE" "$NAME"

echo "Archive prête : export-ionos/$NAME.tar.gz ($(du -h "$OUT/$NAME.tar.gz" | cut -f1))"
if [[ $WITH_DATA -eq 1 ]]; then
  echo "Catalogue local inclus : il sera repris au PREMIER déploiement uniquement."
fi
echo
echo "Envoi sur le serveur (remplace IP_DU_SERVEUR) :"
echo "  scp export-ionos/$NAME.tar.gz root@IP_DU_SERVEUR:/root/"
echo "Puis, sur le serveur :"
echo "  cd /root && tar -xzf $NAME.tar.gz && cd $NAME"
echo "  sudo bash deploy/install.sh mondomaine.fr adresse@email.fr   # première installation"
echo "  sudo bash deploy/update.sh                                     # mises à jour suivantes"
