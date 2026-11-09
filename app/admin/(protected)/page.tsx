export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, EyeOff, Layers, Package, Plus, Star, Tag } from "lucide-react";
import { getStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAdmin();
  const store = getStore();
  const [products, categories, collections] = await Promise.all([
    store.listProducts(),
    store.listCategories(),
    store.listCollections(),
  ]);

  const visible = products.filter((p) => p.is_active);
  const soldOut = visible.filter((p) => p.variants?.length && p.variants.every((v) => v.stock === 0));
  const latest = [...products].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);

  const cards = [
    { label: "Produits en ligne", value: visible.length, icon: Package, href: "/admin/produits" },
    { label: "Produits masqués", value: products.length - visible.length, icon: EyeOff, href: "/admin/produits" },
    { label: "Coups de cœur", value: visible.filter((p) => p.is_featured).length, icon: Star, href: "/admin/produits" },
    { label: "Collections", value: collections.length, icon: Layers, href: "/admin/collections" },
    { label: "Catégories", value: categories.length, icon: Tag, href: "/admin/categories" },
    { label: "Épuisés en ligne", value: soldOut.length, icon: AlertTriangle, href: "/admin/stock", alert: soldOut.length > 0 },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#0A0A0A]">Tableau de bord</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Vue d&apos;ensemble du catalogue Hoa Ly</p>
      </div>

      {store.mode === "local" && process.env.NODE_ENV !== "production" && (
        <div className="mb-8 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong className="font-medium">Version de développement.</strong> Les modifications sont enregistrées sur
          cet ordinateur (dossier <code className="text-xs">data/</code>), pas sur le site en ligne.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white p-4 sm:p-6 border border-[#E5E5E5] hover:border-motif transition-colors"
          >
            <card.icon size={18} className={card.alert ? "text-red-600" : "text-motif"} />
            <p className={`mt-3 text-3xl font-light ${card.alert ? "text-red-600" : ""}`}>{card.value}</p>
            <p className="text-[11px] text-[#6B6B6B] tracking-widest uppercase mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6">
        <section className="bg-white border border-[#E5E5E5]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F5]">
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#6B6B6B]">Derniers produits</h2>
            <Link href="/admin/produits" className="text-xs text-[#6B6B6B] hover:text-[#0A0A0A]">Tout voir</Link>
          </div>
          <ul>
            {latest.map((p) => (
              <li key={p.id} className="border-b border-[#F5F5F5] last:border-0">
                <Link href={`/admin/produit/${p.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-[#FAFAF9]">
                  <div className="relative w-9 h-11 shrink-0 bg-[#F0EDE8] overflow-hidden">
                    {p.cover_image && <Image src={p.cover_image} alt="" fill sizes="36px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{p.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{p.category?.name ?? "Sans catégorie"}</p>
                  </div>
                  <p className="text-sm text-[#6B6B6B]">{formatPrice(p.price)}</p>
                  {!p.is_active && <span className="text-[10px] uppercase tracking-wider text-[#9A9A9A]">Masqué</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-[#E5E5E5] p-5 h-fit">
          <h2 className="text-xs font-medium tracking-widest uppercase text-[#6B6B6B] mb-4">Actions rapides</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/produit/nouveau"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-motif text-white text-xs tracking-widest uppercase hover:bg-[#0A0A0A] transition-colors"
            >
              <Plus size={14} /> Nouveau produit
            </Link>
            <Link
              href="/admin/collection/nouveau"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
            >
              <Plus size={14} /> Nouvelle collection
            </Link>
            <Link
              href="/admin/stock"
              className="inline-flex items-center justify-center px-5 py-3 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
            >
              Mettre à jour les stocks
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
