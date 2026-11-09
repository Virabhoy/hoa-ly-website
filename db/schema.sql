-- =============================================================================
-- Hoa Ly : schéma de la base PostgreSQL (13 ou plus récent)
--
-- Compatible avec : PostgreSQL installé sur le VPS IONOS, IONOS Cloud DBaaS, Supabase.
-- Appliqué automatiquement par `npm run db:setup` ; peut être relancé sans risque.
-- Les identifiants sont du texte (UUID par défaut) pour reprendre tels quels ceux du
-- catalogue en fichiers lors de l'import.
-- =============================================================================

create table if not exists categories (
  id            text primary key default gen_random_uuid()::text,
  slug          text not null unique,
  name          text not null,
  description   text,
  cover_image   text,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists collections (
  id            text primary key default gen_random_uuid()::text,
  slug          text not null unique,
  name          text not null,
  short_name    text not null,
  description   text,
  cover_image   text,
  images        text[] not null default '{}',
  is_archived   boolean not null default false,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists products (
  id            text primary key default gen_random_uuid()::text,
  slug          text not null unique,
  name          text not null,
  description   text,
  category_id   text references categories(id) on delete set null,
  collection_id text references collections(id) on delete set null,
  price         numeric(10,2) not null default 0 check (price >= 0),
  images        text[] not null default '{}',
  cover_image   text,
  is_featured   boolean not null default false,
  is_active     boolean not null default true,
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on products (category_id);
create index if not exists products_collection_idx on products (collection_id);

create table if not exists product_variants (
  id            text primary key default gen_random_uuid()::text,
  product_id    text not null references products(id) on delete cascade,
  color_name    text not null,
  color_hex     text not null default '#000000',
  size          text not null,
  stock         integer not null default 0 check (stock >= 0),
  sku           text,
  display_order integer not null default 0
);

create index if not exists product_variants_product_idx on product_variants (product_id);

-- Réglages du site (horaires, bandeau d'annonce, révocation des sessions admin...).
create table if not exists site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- Sécurité : le site se connecte avec le propriétaire des tables, qui n'est pas concerné par ces
-- règles. Sur Supabase, elles empêchent l'API publique (clé « anon ») de lire ou modifier les données.
alter table categories enable row level security;
alter table collections enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table site_settings enable row level security;
