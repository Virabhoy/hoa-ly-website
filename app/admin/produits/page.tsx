"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import type { Product } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function deleteProduct(id: string) {
    if (!confirm("Supprimer ce produit définitivement ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await fetchProducts();
    setDeleting(null);
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Produits</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">{products.length} articles</p>
        </div>
        <Link href="/admin/produit/nouveau">
          <Button>
            <Plus size={14} className="mr-2" /> Nouveau produit
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit…"
          className="w-full max-w-sm border border-[#E5E5E5] pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0A0A0A]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] text-left">
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B] w-16">Photo</th>
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Nom</th>
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Catégorie</th>
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Prix</th>
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Statut</th>
                <th className="px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B] w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAF9]">
                  <td className="px-4 py-3">
                    <div className="w-10 h-12 relative bg-[#F0EDE8] overflow-hidden">
                      {product.cover_image && (
                        <Image src={product.cover_image} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-[#6B6B6B]">
                    {(product as { category?: { name: string } }).category?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Badge variant={product.is_active ? "success" : "default"}>
                        {product.is_active ? "Actif" : "Masqué"}
                      </Badge>
                      {product.is_featured && <Badge variant="warning">Coup de cœur</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/produit/${product.id}`}>
                        <button className="p-1.5 text-[#6B6B6B] hover:text-[#0A0A0A]">
                          <Pencil size={14} />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={deleting === product.id}
                        className="p-1.5 text-[#6B6B6B] hover:text-red-600"
                      >
                        {deleting === product.id ? <Spinner className="w-3.5 h-3.5" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#6B6B6B] text-sm">
              Aucun produit trouvé.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
