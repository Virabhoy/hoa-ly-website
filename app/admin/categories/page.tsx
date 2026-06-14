"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { Category } from "@/lib/supabase/types";
import { slugify } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [editData, setEditData] = useState<Partial<Category>>({});
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  function startEdit(cat: Category) {
    setEditing(cat.id);
    setEditData({ name: cat.name, description: cat.description ?? "", display_order: cat.display_order });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editData, slug: slugify(editData.name ?? "") }),
    });
    setEditing(null);
    setSaving(false);
    fetchCategories();
  }

  async function createCategory() {
    if (!editData.name) return;
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editData.name, description: editData.description ?? "", display_order: editData.display_order ?? 0 }),
    });
    setCreating(false);
    setEditData({});
    setSaving(false);
    fetchCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("Supprimer cette catégorie ? Les produits associés ne seront pas supprimés.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Catégories</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">{categories.length} catégories</p>
        </div>
        <Button onClick={() => { setCreating(true); setEditData({}); }}>
          <Plus size={14} className="mr-2" /> Nouvelle catégorie
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>
      ) : (
        <div className="bg-white border border-[#E5E5E5]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] text-left">
                <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Nom</th>
                <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Slug</th>
                <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#6B6B6B]">Description</th>
                <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#6B6B6B] w-24">Ordre</th>
                <th className="px-5 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {creating && (
                <tr className="border-b border-[#F5F5F5] bg-amber-50">
                  <td className="px-5 py-3">
                    <input
                      autoFocus
                      placeholder="Nom de la catégorie"
                      value={editData.name ?? ""}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="px-5 py-3 text-[#6B6B6B] text-xs">
                    {slugify(editData.name ?? "")}
                  </td>
                  <td className="px-5 py-3">
                    <input
                      placeholder="Description (optionnel)"
                      value={editData.description ?? ""}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      value={editData.display_order ?? 0}
                      onChange={(e) => setEditData({ ...editData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-16 border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={createCategory} disabled={saving} className="p-1.5 text-green-600 hover:text-green-800">
                        <Check size={14} />
                      </button>
                      <button onClick={() => setCreating(false)} className="p-1.5 text-[#6B6B6B] hover:text-red-600">
                        <X size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAF9]">
                  <td className="px-5 py-3">
                    {editing === cat.id ? (
                      <input
                        value={editData.name ?? ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                      />
                    ) : (
                      <span className="font-medium">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-[#6B6B6B] text-xs">{cat.slug}</td>
                  <td className="px-5 py-3 text-[#6B6B6B]">
                    {editing === cat.id ? (
                      <input
                        value={editData.description ?? ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                      />
                    ) : (
                      cat.description ?? "—"
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editing === cat.id ? (
                      <input
                        type="number"
                        value={editData.display_order ?? cat.display_order}
                        onChange={(e) => setEditData({ ...editData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-16 border border-[#E5E5E5] px-2 py-1 text-sm focus:outline-none"
                      />
                    ) : (
                      cat.display_order
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      {editing === cat.id ? (
                        <>
                          <button onClick={() => saveEdit(cat.id)} disabled={saving} className="p-1.5 text-green-600">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditing(null)} className="p-1.5 text-[#6B6B6B]">
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(cat)} className="p-1.5 text-[#6B6B6B] hover:text-[#0A0A0A]">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-[#6B6B6B] hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
