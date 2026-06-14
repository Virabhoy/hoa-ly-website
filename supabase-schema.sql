-- =============================================
-- Hoa Ly — Schéma Supabase
-- Copiez-collez ce SQL dans l'éditeur SQL de Supabase
-- =============================================

-- Extension pour les UUID
create extension if not exists "uuid-ossp";

-- =============================================
-- TABLE: categories
-- =============================================
create table if not exists categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  cover_image   text,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- =============================================
-- TABLE: products
-- =============================================
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  category_id   uuid references categories(id) on delete set null,
  price         numeric(10,2) not null default 0,
  images        text[] default '{}',
  cover_image   text,
  is_featured   boolean default false,
  is_active     boolean default true,
  display_order int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- =============================================
-- TABLE: product_variants
-- =============================================
create table if not exists product_variants (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid references products(id) on delete cascade,
  color_name    text not null,
  color_hex     text not null default '#000000',
  size          text not null,
  stock         int default 0,
  sku           text,
  display_order int default 0
);

-- =============================================
-- TABLE: site_settings
-- =============================================
create table if not exists site_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz default now()
);

-- =============================================
-- PARAMÈTRES PAR DÉFAUT
-- =============================================
insert into site_settings (key, value) values
  ('store_hours', '{"Lundi":"10h00 – 20h00","Mardi":"10h00 – 20h00","Mercredi":"10h00 – 20h00","Jeudi":"10h00 – 20h00","Vendredi":"10h00 – 21h00","Samedi":"10h00 – 21h00","Dimanche":"Fermé"}'),
  ('announcement', '{"enabled":false,"text":""}')
on conflict (key) do nothing;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Activer RLS
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table site_settings enable row level security;

-- Lecture publique
create policy "public_read_categories" on categories for select using (true);
create policy "public_read_products" on products for select using (is_active = true);
create policy "public_read_variants" on product_variants for select using (true);
create policy "public_read_settings" on site_settings for select using (true);

-- Écriture service_role uniquement (les API routes admin utilisent service_role_key)
create policy "admin_all_categories" on categories for all using (auth.role() = 'service_role');
create policy "admin_all_products" on products for all using (auth.role() = 'service_role');
create policy "admin_all_variants" on product_variants for all using (auth.role() = 'service_role');
create policy "admin_all_settings" on site_settings for all using (auth.role() = 'service_role');

-- =============================================
-- STORAGE: bucket product-images
-- =============================================
-- À faire dans le dashboard Supabase > Storage :
-- 1. Créer un bucket "product-images" (public = true)
-- 2. Politique de lecture publique déjà incluse par défaut pour les buckets publics

-- =============================================
-- DONNÉES DE DÉMONSTRATION (optionnel)
-- =============================================

-- Catégories exemple
insert into categories (slug, name, description, display_order) values
  ('robes', 'Robes', 'Robes féminines pour toutes les occasions', 1),
  ('hauts', 'Hauts & Tops', 'Tops, chemises et blouses', 2),
  ('pantalons', 'Pantalons', 'Pantalons et jeans', 3),
  ('vestes', 'Vestes & Manteaux', 'Vestes légères et manteaux', 4),
  ('accessoires', 'Accessoires', 'Sacs, ceintures, foulards', 5),
  ('nouveautes', 'Nouveautés', 'Les dernières arrivées', 0)
on conflict (slug) do nothing;
