#!/usr/bin/env bash
# =============================================================================
# Installation du site Hoa Ly sur un VPS IONOS (Ubuntu 22.04 / 24.04 ou Debian 12)
#
# Usage, depuis le dossier de l'archive décompressée, en root :
#   sudo bash deploy/install.sh mondomaine.fr adresse@email.fr
#
#   - mondomaine.fr     : le nom de domaine du site, SANS www (le www redirige vers lui)
#   - adresse@email.fr  : e-mail pour le certificat HTTPS (alertes d'expiration Let's Encrypt)
#
# Le script peut être relancé sans risque : il ne remplace jamais le catalogue ni la configuration
# existants. Pour les mises à jour du site, utiliser deploy/update.sh.
# =============================================================================
set -euo pipefail

DOMAIN="${1:-}"
EMAIL="${2:-}"
APP_DIR=/var/www/hoaly
DATA_DIR=/var/lib/hoaly
APP_USER=hoaly
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

step() { printf '\n\033[1;31m==>\033[0m \033[1m%s\033[0m\n' "$1"; }
fail() { printf '\033[1;31mErreur :\033[0m %s\n' "$1" >&2; exit 1; }

# --- Vérifications -----------------------------------------------------------
[[ $EUID -eq 0 ]] || fail "lancez ce script en root : sudo bash deploy/install.sh $DOMAIN $EMAIL"
[[ -n "$DOMAIN" && -n "$EMAIL" ]] || fail "usage : sudo bash deploy/install.sh mondomaine.fr adresse@email.fr"
[[ "$DOMAIN" != www.* ]] || fail "indiquez le domaine sans www (ex. hoaly.fr) : le www est géré automatiquement."
[[ -f "$SRC/package.json" && -d "$SRC/app" ]] || fail "lancez le script depuis le dossier de l'archive décompressée."
command -v apt-get >/dev/null || fail "système non pris en charge : Ubuntu ou Debian requis."

# --- 1. Mémoire d'appoint (la compilation du site demande environ 2 Go) -------
step "1/10 Mémoire d'appoint"
if [[ $(swapon --show | wc -l) -eq 0 && $(awk '/MemTotal/ {print $2}' /proc/meminfo) -lt 3500000 ]]; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "Fichier d'échange de 2 Go créé."
else
  echo "Rien à faire."
fi

# --- 2. Paquets système -------------------------------------------------------
step "2/10 Paquets système (Nginx, Certbot, pare-feu)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q nginx certbot python3-certbot-nginx ufw rsync curl ca-certificates gnupg openssl

# --- 3. Node.js 22 LTS (dépôt officiel NodeSource, clé vérifiée) --------------
step "3/10 Node.js"
node_ok() { command -v node >/dev/null && node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)'; }
if ! node_ok; then
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
  apt-get update -q && apt-get install -y -q nodejs
fi
echo "Node.js $(node --version)"

# --- 4. Utilisateur et dossiers ----------------------------------------------
step "4/10 Utilisateur système et dossiers"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
install -d -o "$APP_USER" -g "$APP_USER" -m 0755 "$APP_DIR"
install -d -o "$APP_USER" -g "$APP_USER" -m 0750 "$DATA_DIR"

# --- 5. Fichiers du site -----------------------------------------------------
step "5/10 Copie du site dans $APP_DIR"
rsync -a --delete \
  --exclude /node_modules --exclude /.next --exclude /data --exclude '.env*' \
  "$SRC/" "$APP_DIR/"
# Catalogue saisi en local (archive créée avec --avec-catalogue) : repris au premier déploiement seulement.
if [[ -f "$SRC/data/catalogue.json" && ! -f "$DATA_DIR/catalogue.json" ]]; then
  rsync -a --exclude '*.tmp' "$SRC/data/" "$DATA_DIR/"
  echo "Catalogue local repris depuis l'archive."
elif [[ -f "$DATA_DIR/catalogue.json" ]]; then
  echo "Catalogue déjà présent sur le serveur : conservé tel quel."
else
  echo "Aucun catalogue fourni : le catalogue de démonstration sera créé au premier affichage."
fi

# --- 6. Configuration (.env.local) --------------------------------------------
step "6/10 Configuration et accès à l'administration"
ENV_FILE="$APP_DIR/.env.local"
if [[ -f "$ENV_FILE" ]]; then
  echo "Configuration existante conservée ($ENV_FILE)."
else
  read -r -p "Identifiant de l'administration : " ADMIN_USER
  while true; do
    read -r -s -p "Mot de passe de l'administration (15 caractères minimum) : " ADMIN_PASS; echo
    read -r -s -p "Confirmez le mot de passe : " ADMIN_PASS2; echo
    if [[ "$ADMIN_PASS" != "$ADMIN_PASS2" ]]; then echo "Les deux saisies diffèrent."; continue; fi
    if [[ ${#ADMIN_PASS} -lt 15 ]]; then echo "Trop court : 15 caractères minimum (une phrase fonctionne très bien)."; continue; fi
    if [[ "$ADMIN_PASS$ADMIN_USER" == *[\$\"\'\`\\]* ]]; then echo "Évitez les caractères \$ \" ' \` et \\ ."; continue; fi
    break
  done
  umask 077
  cat > "$ENV_FILE" <<ENV
# Configuration du site Hoa Ly. Ne jamais partager ce fichier.
NEXT_PUBLIC_APP_URL=https://${DOMAIN}
HOALY_DATA_DIR=${DATA_DIR}
ADMIN_USERNAME="${ADMIN_USER}"
ADMIN_PASSWORD="${ADMIN_PASS}"
SESSION_SECRET=$(openssl rand -hex 32)
# Base PostgreSQL : vide = catalogue en fichiers dans HOALY_DATA_DIR.
# Pour brancher une base : deploy/install-postgres.sh ou deploy/use-database.sh (voir deploy/GUIDE-BDD.md).
# Avis Google (facultatif) :
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
ENV
  umask 022
  unset ADMIN_PASS ADMIN_PASS2
  echo "Configuration créée."
fi
chown -R "$APP_USER:$APP_USER" "$APP_DIR" "$DATA_DIR"
chmod 600 "$ENV_FILE"

# --- 7. Installation des dépendances et compilation -----------------------------
step "7/10 Compilation du site (quelques minutes)"
runuser -u "$APP_USER" -- env HOME="$APP_DIR" NEXT_TELEMETRY_DISABLED=1 \
  bash -c "cd '$APP_DIR' && npm ci --no-audit --no-fund && npm run build"

# --- 8. Service système et journaux --------------------------------------------
step "8/10 Service système"
install -m 0644 "$SRC/deploy/hoaly.service" /etc/systemd/system/hoaly.service
# Journaux système (dont les échecs de connexion à l'admin) gardés 3 mois, comme annoncé
# dans la politique de confidentialité.
install -d /etc/systemd/journald.conf.d
printf '[Journal]\nMaxRetentionSec=3month\n' > /etc/systemd/journald.conf.d/hoaly.conf
systemctl restart systemd-journald
systemctl daemon-reload
systemctl enable --now hoaly
systemctl restart hoaly

# --- 9. Nginx et pare-feu --------------------------------------------------------
step "9/10 Nginx et pare-feu"
sed "s/__DOMAIN__/${DOMAIN}/g" "$SRC/deploy/nginx-hoaly.conf" > /etc/nginx/sites-available/hoaly
ln -sf /etc/nginx/sites-available/hoaly /etc/nginx/sites-enabled/hoaly
rm -f /etc/nginx/sites-enabled/default
# Refus HTTPS des domaines inconnus : directive disponible à partir de Nginx 1.19.4.
NGINX_VERSION=$(nginx -v 2>&1 | sed -E 's/.*nginx\/([0-9.]+).*/\1/')
if [[ "$(printf '%s\n' 1.19.4 "$NGINX_VERSION" | sort -V | head -1)" == "1.19.4" ]]; then
  install -m 0644 "$SRC/deploy/nginx-hoaly-default-tls.conf" /etc/nginx/conf.d/hoaly-default-tls.conf
else
  echo "Nginx $NGINX_VERSION : refus HTTPS des domaines inconnus non disponible (1.19.4 requis), étape ignorée."
fi
nginx -t
systemctl reload nginx
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null
echo "Pare-feu actif : SSH, HTTP et HTTPS autorisés."

# --- 10. HTTPS et sauvegardes -----------------------------------------------------
step "10/10 Certificat HTTPS et sauvegardes"
install -m 0755 "$SRC/deploy/hoaly-backup" /etc/cron.daily/hoaly-backup
if certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --agree-tos -m "$EMAIL" --non-interactive; then
  HTTPS_OK=1
else
  HTTPS_OK=0
fi

# --- Vérification finale ------------------------------------------------------------
for _ in $(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:3000/ && break; sleep 1; done
if curl -fs -o /dev/null http://127.0.0.1:3000/; then
  echo; echo "Le site répond."
else
  fail "le site ne répond pas. Consultez : journalctl -u hoaly -n 50"
fi

echo
echo "============================================================"
if [[ $HTTPS_OK -eq 1 ]]; then
  echo " Site en ligne : https://${DOMAIN}"
  echo " Administration : https://${DOMAIN}/admin"
else
  echo " Le site tourne, mais le certificat HTTPS n'a pas pu être créé."
  echo " Vérifiez que ${DOMAIN} et www.${DOMAIN} pointent vers l'IP de ce serveur,"
  echo " puis relancez : certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect -m ${EMAIL} --agree-tos"
fi
echo " Catalogue : ${DATA_DIR} (sauvegardé chaque nuit dans /var/backups/hoaly)"
echo "============================================================"
