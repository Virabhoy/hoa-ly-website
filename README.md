# Hoa Ly - site vitrine

Site vitrine de la boutique de prêt-à-porter **Hoa Ly**, 50 avenue de Choisy, Paris 13e : catalogue, collections saisonnières, fiches produit avec couleurs, tailles et stock, et administration pour gérer le tout. Aucune vente en ligne : les clientes réservent par téléphone et achètent en boutique.

## Technique

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.
- Données derrière une interface unique (`lib/store`) :
  - **fichiers** (`catalogue.json` et `uploads/`) : par défaut, en local comme sur le VPS ;
  - **PostgreSQL** : utilisé automatiquement si `DATABASE_URL` est renseignée (base sur le VPS, IONOS Cloud ou Supabase). Schéma dans `db/schema.sql`, création et import du catalogue avec `npm run db:setup`. Voir [deploy/GUIDE-BDD.md](deploy/GUIDE-BDD.md).
- Administration protégée sous `/admin` : session signée, limite de tentatives, contrôle côté serveur sur chaque page.

## Développement

```bash
npm install
```

```bash
npm run dev
```

Le site est alors sur http://localhost:3000. La configuration locale va dans `.env.local` (modèle : `.env.local.example`). Au premier lancement, le catalogue de démonstration est copié dans `data/`.

## Mise en ligne sur IONOS

Tout est décrit dans [deploy/GUIDE-IONOS.md](deploy/GUIDE-IONOS.md). En résumé :

```bash
npm run export:ionos
```

puis, sur le serveur, `sudo bash deploy/install.sh mondomaine.fr adresse@email.fr`.

## Organisation

| Dossier | Contenu |
|---------|---------|
| `app/` | Pages publiques, admin (`app/admin`), routes API, pages légales |
| `components/` | Composants d'interface |
| `lib/store/` | Accès aux données (fichiers ou PostgreSQL), validation, traitement et recadrage des photos |
| `lib/catalog/` | Types du catalogue et lectures du site public |
| `db/`, `scripts/db-setup.mjs` | Schéma PostgreSQL et import du catalogue |
| `lib/session.ts`, `lib/auth.ts`, `proxy.ts` | Connexion et protection de l'admin |
| `deploy/` | Scripts et configuration pour le VPS IONOS |
