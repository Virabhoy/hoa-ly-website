"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { api, errorMessage } from "@/lib/admin-client";
import { cn, formatPrice } from "@/lib/utils";
import type { Category, Collection, Product } from "@/lib/catalog/types";

type Status = "all" | "visible" | "hidden" | "featured" | "out";

const totalStock = (p: Product) => (p.variants ?? []).reduce((sum, v) => sum + v.stock, 0);

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [status, setStatus] = useState<Status>("all");

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [p, c, col] = await Promise.all([
        api<Product[]>("/api/admin/products"),
        api<Category[]>("/api/admin/categories"),
        api<Collection[]>("/api/admin/collections"),
      ]);
      setProducts(p);
      setCategories(c);
      setCollections(col);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Filtre transmis depuis la page Collections (?collection=...).
    const params = new URLSearchParams(window.location.search);
    setCollection(params.get("collection") ?? "");
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (category && p.category_id !== (category === "none" ? null : category)) return false;
      if (collection && p.collection_id !== (collection === "none" ? null : collection)) return false;
      if (status === "visible" && !p.is_active) return false;
      if (status === "hidden" && p.is_active) return false;
      if (status === "featured" && !p.is_featured) return false;
      if (status === "out" && (!p.variants?.length || totalStock(p) > 0)) return false;
      return true;
    });
  }, [products, search, category, collection, status]);

  // Mise à jour immédiate de l'affichage, annulée si l'enregistrement échoue.
  async function patch(product: Product, changes: Partial<Product>) {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, ...changes } : p)));
    try {
      await api(`/api/admin/products/${product.id}`, "PUT", changes);
    } catch (e) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      alert(errorMessage(e));
    }
  }

  async function remove(ids: string[]) {
    const label = ids.length === 1 ? `« ${products.find((p) => p.id === ids[0])?.name} »` : `${ids.length} produits`;
    if (!confirm(`Supprimer ${label} définitivement ?`)) return;
    setBusy("delete");
    try {
      for (const id of ids) await api(`/api/admin/products/${id}`, "DELETE");
    } catch (e) {
      alert(errorMessage(e));
    }
    setSelected(new Set());
    await load();
    setBusy(null);
  }

  async function setVisibility(ids: string[], is_active: boolean) {
    setBusy(is_active ? "show" : "hide");
    try {
      for (const id of ids) await api(`/api/admin/products/${id}`, "PUT", { is_active });
    } catch (e) {
      alert(errorMessage(e));
    }
    setSelected(new Set());
    await load();
    setBusy(null);
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));
  const selectedIds = Array.from(selected);
  const select = "border border-[#E5E5E5] px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]";

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-medium">Produits</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            {products.length} articles, dont {products.filter((p) => p.is_active).length} visibles sur le site
          </p>
        </div>
        <Link href="/admin/produit/nouveau" className="inline-flex items-center justify-center px-6 py-3 bg-[#0A0A0A] text-white text-xs font-medium tracking-widest uppercase hover:bg-[#333] transition-colors">
          <Plus size={14} className="mr-2" /> Nouveau produit
        </Link>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[12rem] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full border border-[#E5E5E5] pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
            aria-label="Rechercher"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={select} aria-label="Catégorie">
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
          <option value="none">Sans catégorie</option>
        </select>
        <select value={collection} onChange={(e) => setCollection(e.target.value)} className={select} aria-label="Collection">
          <option value="">Toutes les collections</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
          <option value="none">Sans collection</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={select} aria-label="Statut">
          <option value="all">Tous les statuts</option>
          <option value="visible">Visibles</option>
          <option value="hidden">Masqués</option>
          <option value="featured">Coups de cœur</option>
          <option value="out">Épuisés</option>
        </select>
      </div>

      {/* Actions groupées */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4 px-4 py-3 bg-[#0A0A0A] text-white text-sm">
          <span>{selected.size} sélectionné{selected.size > 1 ? "s" : ""}</span>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <BulkButton onClick={() => setVisibility(selectedIds, true)} busy={busy === "show"}>Afficher</BulkButton>
            <BulkButton onClick={() => setVisibility(selectedIds, false)} busy={busy === "hide"}>Masquer</BulkButton>
            <BulkButton onClick={() => remove(selectedIds)} busy={busy === "delete"} danger>Supprimer</BulkButton>
            <BulkButton onClick={() => setSelected(new Set())}>Annuler</BulkButton>
          </div>
        </div>
      )}

      {error && <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] overflow-x-auto">
          <table className="w-full text-sm min-w-[52rem]">
            <thead>
              <tr className="border-b border-[#E5E5E5] text-left text-xs tracking-widest uppercase text-[#6B6B6B]">
                <th className="pl-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => setSelected(allSelected ? new Set() : new Set(filtered.map((p) => p.id)))}
                    aria-label="Tout sélectionner"
                    className="w-4 h-4 accent-[#C30202]"
                  />
                </th>
                <th className="px-3 py-3 w-16 font-normal">Photo</th>
                <th className="px-3 py-3 font-normal">Nom</th>
                <th className="px-3 py-3 font-normal">Catégorie</th>
                <th className="px-3 py-3 font-normal">Collection</th>
                <th className="px-3 py-3 font-normal">Prix</th>
                <th className="px-3 py-3 font-normal">Stock</th>
                <th className="px-3 py-3 font-normal">Sur le site</th>
                <th className="px-3 py-3 w-28 font-normal"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const stock = totalStock(p);
                return (
                  <tr key={p.id} className={cn("border-b border-[#F5F5F5] hover:bg-[#FAFAF9]", !p.is_active && "text-[#767676]")}>
                    <td className="pl-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        aria-label={`Sélectionner ${p.name}`}
                        className="w-4 h-4 accent-[#C30202]"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className={cn("w-10 h-12 relative bg-[#F0EDE8] overflow-hidden", !p.is_active && "opacity-50")}>
                        {p.cover_image && <Image src={p.cover_image} alt="" fill sizes="40px" className="object-cover" />}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Link href={`/admin/produit/${p.id}`} className="font-medium text-[#0A0A0A] hover:text-motif">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-[#6B6B6B]">{p.category?.name ?? "-"}</td>
                    <td className="px-3 py-3 text-[#6B6B6B]">{p.collection?.short_name ?? "-"}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{formatPrice(p.price)}</td>
                    <td className="px-3 py-3">
                      {!p.variants?.length ? (
                        <span className="text-[#767676]">-</span>
                      ) : stock === 0 ? (
                        <span className="text-red-600">Épuisé</span>
                      ) : (
                        stock
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={p.is_active}
                          onChange={(v) => patch(p, { is_active: v })}
                          label={`${p.is_active ? "Masquer" : "Afficher"} ${p.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => patch(p, { is_featured: !p.is_featured })}
                          className={cn("p-1", p.is_featured ? "text-amber-500" : "text-[#D0D0D0] hover:text-amber-400")}
                          aria-pressed={p.is_featured}
                          aria-label={`Coup de cœur : ${p.name}`}
                          title="Coup de cœur (accueil)"
                        >
                          <Star size={16} fill={p.is_featured ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/produit/${p.id}`} className="p-1.5 text-[#6B6B6B] hover:text-[#0A0A0A]" aria-label={`Modifier ${p.name}`} title="Modifier">
                          <Pencil size={14} />
                        </Link>
                        {p.is_active && (
                          <Link href={`/produit/${p.slug}`} target="_blank" className="p-1.5 text-[#6B6B6B] hover:text-[#0A0A0A]" aria-label={`Voir ${p.name} sur le site`} title="Voir sur le site">
                            <ExternalLink size={14} />
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => remove([p.id])}
                          className="p-1.5 text-[#6B6B6B] hover:text-red-600"
                          aria-label={`Supprimer ${p.name}`}
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#6B6B6B] text-sm">Aucun produit ne correspond à ces filtres.</div>
          )}
        </div>
      )}
    </div>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("relative w-9 h-5 rounded-full transition-colors", checked ? "bg-green-600" : "bg-[#D0D0D0]")}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-4"
        )}
      />
    </button>
  );
}

function BulkButton({
  children,
  onClick,
  busy,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  busy?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest uppercase border transition-colors disabled:opacity-50",
        danger ? "border-red-400 text-red-300 hover:bg-red-600 hover:text-white" : "border-white/30 hover:bg-white/10"
      )}
    >
      {busy && <Spinner className="w-3 h-3 border-white/20 border-t-white" />}
      {children}
    </button>
  );
}
