"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  ExternalLink,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Tag,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, match: ["/admin"] },
  { href: "/admin/produits", label: "Produits", icon: Package, match: ["/admin/produits", "/admin/produit/"] },
  { href: "/admin/collections", label: "Collections", icon: Layers, match: ["/admin/collections", "/admin/collection/"] },
  { href: "/admin/categories", label: "Catégories", icon: Tag, match: ["/admin/categories"] },
  { href: "/admin/stock", label: "Stocks", icon: BarChart2, match: ["/admin/stock"] },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings, match: ["/admin/parametres"] },
];

function isActive(pathname: string, match: string[]) {
  return match.some((m) => (m === "/admin" ? pathname === m : pathname.startsWith(m)));
}

export default function AdminSidebar({ storage }: { storage: "local" | "postgres" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const brand = (
    <div>
      <p className="text-2xl font-bold tracking-[0.18em]" style={{ fontFamily: "var(--font-poppins)" }}>
        HOA LY
      </p>
      <p className="text-[10px] text-white/60 tracking-[0.3em] uppercase mt-1">Administration</p>
    </div>
  );

  return (
    <>
      {/* Barre du haut sur mobile */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[#0A0A0A] text-white px-4 py-3">
        <p className="text-lg font-bold tracking-[0.18em]" style={{ fontFamily: "var(--font-poppins)" }}>
          HOA LY <span className="text-[10px] font-normal tracking-[0.3em] text-white/60">ADMIN</span>
        </p>
        <button onClick={() => setOpen(true)} className="p-1" aria-label="Ouvrir le menu" aria-expanded={open}>
          <Menu size={22} />
        </button>
      </div>

      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />}

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0A0A0A] text-white flex flex-col shrink-0 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-start justify-between px-6 py-7 border-b border-white/10">
          {brand}
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-white/60" aria-label="Fermer le menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.match);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors border-l-2",
                      active
                        ? "bg-white/10 text-white border-motif"
                        : "text-white/55 hover:text-white hover:bg-white/5 border-transparent"
                    )}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/55 hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            Voir le site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/55 hover:text-white w-full transition-colors"
          >
            <LogOut size={16} />
            Se déconnecter
          </button>
          <p className="px-3 pt-3 text-[10px] leading-relaxed text-white/60">
            {storage === "postgres" ? "Catalogue dans la base PostgreSQL" : "Catalogue enregistré dans des fichiers sur le serveur"}
          </p>
        </div>
      </aside>
    </>
  );
}
