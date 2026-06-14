"use client";

import { useState, useEffect, useCallback } from "react";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import type { Product } from "@/lib/supabase/types";

interface VariantUpdate {
  id: string;
  stock: number;
}

export default function AdminStockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function handleStockChange(variantId: string, value: string) {
    setUpdates((prev) => ({ ...prev, [variantId]: parseInt(value) || 0 }));
  }

  function getStock(variantId: string, originalStock: number): number {
    return updates[variantId] ?? originalStock;
  }

  async function saveAll() {
    setSaving(true);
    const toUpdate: VariantUpdate[] = Object.entries(updates).map(([id, stock]) => ({ id, stock }));
    await Promise.all(
      toUpdate.map(({ id, stock }) =>
        fetch(`/api/admin/variants/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock }),
        })
      )
    );
    setUpdates({});
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    fetchProducts();
  }

  if (loading) return <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>;

  const hasChanges = Object.keys(updates).length > 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Gestion des stocks</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Modifiez les quantités directement dans le tableau.</p>
        </div>
        {(hasChanges || saved) && (
          <Button onClick={saveAll} disabled={saving}>
            {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
            {saved ? "✓ Sauvegardé" : `Enregistrer (${Object.keys(updates).length} changements)`}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-[#E5E5E5]">
            <div className="px-5 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
              <p className="font-medium text-sm">{product.name}</p>
              <p className="text-xs text-[#6B6B6B]">
                {(product as { category?: { name: string } }).category?.name}
              </p>
            </div>
            {!product.variants?.length ? (
              <p className="px-5 py-3 text-sm text-[#6B6B6B]">Aucune variante</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left bg-[#FAFAF9]">
                      <th className="px-5 py-2 text-xs text-[#6B6B6B] font-normal">Couleur</th>
                      <th className="px-5 py-2 text-xs text-[#6B6B6B] font-normal">Taille</th>
                      <th className="px-5 py-2 text-xs text-[#6B6B6B] font-normal w-32">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants!.map((v) => {
                      const stock = getStock(v.id, v.stock);
                      const changed = updates[v.id] !== undefined;
                      return (
                        <tr key={v.id} className={`border-t border-[#F5F5F5] ${changed ? "bg-amber-50" : ""}`}>
                          <td className="px-5 py-2.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border border-[#E5E5E5]"
                                style={{ backgroundColor: v.color_hex }}
                              />
                              {v.color_name}
                            </div>
                          </td>
                          <td className="px-5 py-2.5 text-[#6B6B6B]">{v.size}</td>
                          <td className="px-5 py-2.5">
                            <input
                              type="number"
                              min="0"
                              value={stock}
                              onChange={(e) => handleStockChange(v.id, e.target.value)}
                              className={`w-20 border px-2 py-1 text-sm focus:outline-none ${
                                stock === 0 ? "border-red-300 text-red-600" : "border-[#E5E5E5]"
                              }`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
