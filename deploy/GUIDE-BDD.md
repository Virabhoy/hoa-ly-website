# Base de données du site Hoa Ly

## En bref

- **Par défaut, aucune base n'est nécessaire.** Le catalogue est enregistré dans des fichiers sur le serveur (`/var/lib/hoaly`), sauvegardés chaque nuit. Pour une boutique gérée par une ou deux personnes, c'est suffisant.
- **Une base PostgreSQL** devient intéressante si plusieurs personnes modifient le catalogue en même temps, si le catalogue grossit beaucoup, ou si tu veux des sauvegardes gérées par un prestataire.
- Le site choisit tout seul : si `DATABASE_URL` est renseignée dans `.env.local`, il utilise la base ; sinon, les fichiers.
- Les **photos** restent toujours des fichiers sur le serveur (`/var/lib/hoaly/uploads`), quelle que soit l'option.

## Quelle base choisir ?

| Option | Coût | Lieu des données | Mise en place |
|--------|------|------------------|---------------|
| **A. PostgreSQL sur le VPS IONOS** (recommandé) | Gratuit, inclus dans le VPS | Le VPS lui-même (UE) | `sudo bash deploy/install-postgres.sh` |
| **B. IONOS Cloud DBaaS PostgreSQL** | Environ 0,067 € de l'heure pour 1 cœur et 1 Go de mémoire, soit à peu près 49 € par mois (tarif IONOS au 29/10/2026) | Centre de données IONOS Cloud | Création dans la console IONOS Cloud, puis `sudo bash deploy/use-database.sh` |
| **C. Supabase** | Offre gratuite avec limites, offres payantes au-delà | Région européenne au choix (Paris, Francfort...) | Création sur supabase.com, puis `sudo bash deploy/use-database.sh` |
| Hébergement web IONOS (MySQL) | - | - | **Pas utilisable** : ces bases ne sont accessibles que depuis l'espace web IONOS, pas depuis un VPS, et le site utilise PostgreSQL |

## Option A : PostgreSQL sur le VPS (recommandée)

Sur le serveur, une fois le site installé avec `deploy/install.sh` :

```bash
sudo bash deploy/install-postgres.sh
```

Le script :

1. installe PostgreSQL, qui n'écoute que sur le serveur lui-même et n'est jamais exposé sur internet ;
2. crée la base `hoaly` et un utilisateur dédié avec un mot de passe aléatoire ;
3. ajoute `DATABASE_URL` dans `/var/www/hoaly/.env.local` ;
4. crée les tables et importe le catalogue actuel (produits, collections, catégories, réglages) ;
5. redémarre le site.

La base est ensuite sauvegardée chaque nuit avec le reste, dans `/var/backups/hoaly/base-AAAA-MM-JJ.sql.gz`.

## Option B : IONOS Cloud DBaaS

C'est l'offre PostgreSQL gérée d'IONOS. Elle relève de **IONOS Cloud**, une gamme distincte des VPS commandés sur ionos.fr, avec sa propre console : le « Data Center Designer ».

- PostgreSQL 14 à 18, connexions toujours chiffrées (TLS), sauvegardes quotidiennes conservées 7 jours avec restauration à un instant donné.
- **Point à vérifier avec IONOS avant de commander** : l'instance se place dans le réseau (LAN) d'un centre de données IONOS Cloud. La documentation ne dit pas si un VPS commandé sur ionos.fr peut s'y connecter.

Si IONOS confirme que la connexion est possible :

1. créer le cluster PostgreSQL (version 16 ou plus) dans la console IONOS Cloud, dans un centre de données en Europe ;
2. créer un utilisateur et noter son adresse de connexion, de la forme `postgresql://utilisateur:motdepasse@pg-xxxx.postgresql.de-fra.ionos.com:5432/postgres` ;
3. sur le VPS : `sudo bash deploy/use-database.sh`, coller l'adresse et garder le chiffrement « automatique ».

## Option C : Supabase

1. Créer un projet sur [supabase.com](https://supabase.com) en choisissant une **région européenne** (Paris ou Francfort) et noter le mot de passe de la base.
2. Dans le projet, ouvrir **Connect** et copier l'adresse de connexion (format « URI »). Si le VPS n'a pas d'adresse IPv6, prendre l'adresse **Session pooler** : la connexion directe de Supabase ne fonctionne qu'en IPv6.
3. Remplacer `[YOUR-PASSWORD]` par le mot de passe. S'il contient un `$`, l'écrire `%24` dans l'adresse.
4. Sur le VPS : `sudo bash deploy/use-database.sh`, coller l'adresse et garder le chiffrement « automatique ».

Le schéma active la sécurité au niveau des lignes (RLS) sur toutes les tables : l'API publique de Supabase ne peut ni lire ni modifier le catalogue. Seul le site, connecté avec le compte propriétaire, y accède.

## Pour tester en local (développement)

1. Disposer d'un PostgreSQL local (par exemple Postgres.app sur Mac), ou utiliser une base Supabase de test.
2. Dans `.env.local`, renseigner `DATABASE_URL=postgresql://utilisateur:motdepasse@127.0.0.1:5432/hoaly`.
3. Créer les tables et importer le catalogue de `data/` :

```bash
npm run db:setup
```

4. Relancer `npm run dev` : la barre latérale de l'admin indique « Catalogue dans la base PostgreSQL ».

## Commandes utiles

| Besoin | Commande (dans `/var/www/hoaly` sur le serveur, ou dans le projet en local) |
|--------|-------------------------------------------------------------------------------|
| Créer ou mettre à jour les tables | `npm run db:setup` (n'efface rien ; n'importe que si la base est vide) |
| Réimporter le catalogue des fichiers | `npm run db:setup -- --remplacer` (**efface le catalogue de la base**) |
| Restaurer une sauvegarde de l'option A | `gunzip -c /var/backups/hoaly/base-AAAA-MM-JJ.sql.gz \| sudo -u postgres psql hoaly` sur une base vide |

## Revenir aux fichiers

Supprimer la ligne `DATABASE_URL=...` de `/var/www/hoaly/.env.local`, puis `sudo systemctl restart hoaly`. Attention : les modifications faites pendant que la base était branchée ne sont pas recopiées dans les fichiers.

## Sources (recherche du 9 novembre 2026)

- IONOS Cloud DBaaS PostgreSQL : [présentation](https://cloud.ionos.com/managed/dbaas/postgresql), [documentation](https://docs.ionos.com/cloud/databases/postgresql), [grille tarifaire](https://docs.ionos.com/support/general-information/price-list/ionos-cloud-eur-en.md)
- Bases MySQL de l'hébergement web IONOS non accessibles de l'extérieur : [aide IONOS](https://www.ionos.de/hilfe/hosting/problemloesungen-fuer-php/mysql-datenbank-ist-von-ausserhalb-nicht-erreichbar/)
