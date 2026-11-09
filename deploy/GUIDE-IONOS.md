# Mettre le site Hoa Ly en ligne sur un VPS IONOS

Ce guide part de zéro et aboutit à un site en HTTPS, avec l'administration en ligne, un catalogue stocké sur le serveur et une sauvegarde chaque nuit. Compter environ 30 minutes, plus le délai de propagation du nom de domaine.

## Ce qu'il faut

- **Un VPS Linux IONOS** (offre « VPS Linux » ou « Cloud Server ») :
  - système **Ubuntu 24.04** (22.04 ou Debian 12 conviennent aussi) ;
  - **2 Go de mémoire au minimum** (la compilation du site en a besoin ; 4 Go est plus confortable) ;
  - centre de données **en France ou en Allemagne** : la politique de confidentialité du site annonce un hébergement dans l'Union européenne.
- **Un nom de domaine** (chez IONOS ou ailleurs), par exemple `hoaly.fr`.
- L'**adresse IP** du serveur et son **mot de passe root**, visibles dans l'espace client IONOS, rubrique « Serveurs & Cloud ».

## 1. Préparer le serveur dans l'espace client IONOS

1. Créer le VPS avec l'image Ubuntu 24.04 et noter son adresse IP.
2. Dans **Réseau > Stratégies de pare-feu**, vérifier que les ports **22** (SSH), **80** (HTTP) et **443** (HTTPS) sont ouverts.
3. Accepter le **contrat de traitement des données** (contrat de sous-traitance RGPD) proposé dans l'espace client : la politique de confidentialité du site y fait référence.

## 2. Faire pointer le nom de domaine vers le serveur

Dans la gestion DNS du domaine, créer ou modifier :

| Type | Nom | Valeur |
|------|-----|--------|
| A | `@` | adresse IP du VPS |
| A | `www` | adresse IP du VPS |

La prise en compte peut prendre de quelques minutes à quelques heures. Pour vérifier depuis un terminal :

```bash
dig +short mondomaine.fr
```

La commande doit afficher l'adresse IP du VPS.

## 3. Préparer l'archive du site (sur ton ordinateur)

Depuis le dossier du projet :

```bash
npm run export:ionos
```

Pour emporter aussi le catalogue déjà saisi dans l'admin en local (produits, collections, photos) :

```bash
npm run export:ionos -- --avec-catalogue
```

L'archive apparaît dans `export-ionos/`. Elle ne contient aucun mot de passe : ils sont créés directement sur le serveur.

## 4. Envoyer l'archive et installer

Remplacer `IP_DU_SERVEUR`, le nom de l'archive, le domaine et l'e-mail :

```bash
scp export-ionos/hoaly-site-AAAAMMJJ-HHMM.tar.gz root@IP_DU_SERVEUR:/root/
```

```bash
ssh root@IP_DU_SERVEUR
```

Puis, une fois connecté au serveur :

```bash
cd /root && tar -xzf hoaly-site-AAAAMMJJ-HHMM.tar.gz && cd hoaly-site-AAAAMMJJ-HHMM
```

```bash
sudo bash deploy/install.sh mondomaine.fr adresse@email.fr
```

Le script demande l'**identifiant** et le **mot de passe de l'administration** (15 caractères minimum ; une courte phrase est idéale). Il s'occupe ensuite de tout :

1. mémoire d'appoint si le serveur en manque ;
2. Nginx, Certbot, pare-feu (ufw) et Node.js 22 ;
3. copie du site dans `/var/www/hoaly` et du catalogue dans `/var/lib/hoaly` ;
4. configuration dans `/var/www/hoaly/.env.local`, avec un secret de session généré automatiquement ;
5. compilation du site ;
6. service `hoaly`, qui démarre avec le serveur et redémarre en cas de problème ;
7. Nginx en façade, `www` redirigé vers l'adresse sans `www` ;
8. certificat HTTPS gratuit (Let's Encrypt), renouvelé automatiquement ;
9. sauvegarde quotidienne du catalogue.

À la fin, le script affiche l'adresse du site et de l'administration.

> Si le certificat HTTPS échoue, c'est presque toujours que le domaine ne pointe pas encore vers le serveur (étape 2). Le script affiche alors la commande à relancer plus tard.

## 5. Vérifier

- `https://mondomaine.fr` : le site s'affiche avec le cadenas.
- `https://mondomaine.fr/admin` : la page de connexion ; se connecter avec les identifiants choisis.
- `https://mondomaine.fr/sitemap.xml` : la liste des pages pour Google.
- Facultatif : déclarer le site et son sitemap dans [Google Search Console](https://search.google.com/search-console).

## Base de données (facultatif)

Le site fonctionne sans base de données : le catalogue est stocké dans des fichiers sur le serveur. Pour le passer dans une base PostgreSQL, sur le VPS lui-même (gratuit), chez IONOS Cloud ou chez Supabase, suivre [GUIDE-BDD.md](GUIDE-BDD.md). Le plus simple :

```bash
sudo bash deploy/install-postgres.sh
```

## Mettre à jour le site

Après des modifications du code, sur ton ordinateur :

```bash
npm run export:ionos
```

Envoyer la nouvelle archive comme à l'étape 4, la décompresser sur le serveur, puis depuis son dossier :

```bash
sudo bash deploy/update.sh
```

Le déroulement est sans risque :

1. le catalogue est sauvegardé ;
2. la nouvelle version est compilée à côté, pendant que le site actuel reste en ligne ;
3. si la compilation échoue, rien n'est changé ;
4. sinon le site bascule en quelques secondes ; si la nouvelle version ne répond pas, l'ancienne est remise en place automatiquement.

Le catalogue et la configuration ne sont jamais touchés. La version précédente reste dans `/var/www/hoaly-prev` (la commande de retour arrière est affichée à la fin). La configuration Nginx n'est installée qu'à la première installation : Certbot la complète ensuite pour le HTTPS, une mise à jour ne la remplace donc pas.

## Catalogue et sauvegardes

- Le catalogue (produits, collections, catégories, réglages) et les photos envoyées depuis l'admin sont dans `/var/lib/hoaly`.
- Chaque nuit, une archive est créée dans `/var/backups/hoaly`. Les 14 derniers jours sont conservés.
- Ces sauvegardes restent sur le même serveur : pour être protégé d'une panne du VPS, récupère-en une copie de temps en temps, ou active l'option de sauvegarde IONOS. Pour copier la dernière sauvegarde sur ton ordinateur :

```bash
scp "root@IP_DU_SERVEUR:/var/backups/hoaly/catalogue-*.tar.gz" ./
```

Pour restaurer une sauvegarde sur le serveur (remplacer la date) :

```bash
sudo systemctl stop hoaly && sudo tar -xzf /var/backups/hoaly/catalogue-AAAA-MM-JJ.tar.gz -C /var/lib && sudo chown -R hoaly:hoaly /var/lib/hoaly && sudo systemctl start hoaly
```

## Commandes utiles sur le serveur

| Besoin | Commande |
|--------|----------|
| État du site | `systemctl status hoaly` |
| Journaux en direct | `journalctl -u hoaly -f` |
| Redémarrer le site | `sudo systemctl restart hoaly` |
| Changer le mot de passe admin | modifier `ADMIN_PASSWORD` dans `/var/www/hoaly/.env.local`, puis redémarrer le site |
| Déconnecter tous les appareils | remplacer `SESSION_SECRET` par une nouvelle valeur (`openssl rand -hex 32`), puis redémarrer |
| Tester le renouvellement HTTPS | `sudo certbot renew --dry-run` |

## Sécurité du serveur

- Le pare-feu n'autorise que SSH, HTTP et HTTPS. Si tu changes le port SSH, autorise-le d'abord (`ufw allow NOUVEAU_PORT/tcp`), sinon tu perdras l'accès.
- Remplacer le mot de passe root par une connexion par clé SSH est vivement conseillé.
- Les mises à jour de sécurité d'Ubuntu s'installent automatiquement (paquet `unattended-upgrades`, actif par défaut sur les images Ubuntu).

## Avant l'ouverture au public

- Vérifier les coordonnées d'IONOS dans les mentions légales : elles doivent correspondre à l'entité indiquée sur ton contrat.
- Confirmer l'adresse e-mail de contact (`lib/constants.ts`).
- Remplacer les produits de démonstration par les vrais articles, depuis l'admin.
- Facultatif : renseigner `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` dans `.env.local` pour afficher les avis Google, puis redémarrer le site.
