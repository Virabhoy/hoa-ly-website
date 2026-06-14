export const dynamic = "force-dynamic";

import Link from "next/link";
import { Package, Tag, BarChart2, AlertTriangle } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server";

async function getDashboardStats() {
  const supabase = createAdminClient();

  const [{ count: products }, { count: categories }, { count: outOfStock }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("product_variants").select("*", { count: "exact", head: true }).eq("stock", 0),
  ]);

  return { products: products ?? 0, categories: categories ?? 0, outOfStock: outOfStock ?? 0 };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Produits actifs", value: stats.products, icon: Package, href: "/admin/produits", color: "bg-blue-50 text-blue-600" },
    { label: "Catégories", value: stats.categories, icon: Tag, href: "/admin/categories", color: "bg-purple-50 text-purple-600" },
    { label: "Variantes épuisées", value: stats.outOfStock, icon: AlertTriangle, href: "/admin/stock", color: stats.outOfStock > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#0A0A0A]">Tableau de bord</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Vue d&apos;ensemble de la boutique</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <div className="bg-white p-6 border border-[#E5E5E5] hover:border-[#C8A882] transition-colors">
              <div className={`inline-flex p-2 rounded ${card.color} mb-3`}>
                <card.icon size={20} />
              </div>
              <p className="text-3xl font-light">{card.value}</p>
              <p className="text-xs text-[#6B6B6B] tracking-widest uppercase mt-1">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <h2 className="text-sm font-medium mb-4 tracking-widest uppercase text-[#6B6B6B]">
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/produit/nouveau"
            className="px-5 py-2.5 bg-[#0A0A0A] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-colors"
          >
            + Nouveau produit
          </Link>
          <Link
            href="/admin/stock"
            className="px-5 py-2.5 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
          >
            <BarChart2 className="inline mr-2" size={14} />
            Gérer les stocks
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-5 py-2.5 border border-[#E5E5E5] text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors"
          >
            Voir le site →
          </Link>
        </div>
      </div>
    </div>
  );
}
