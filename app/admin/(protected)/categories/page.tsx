"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ImageListEditor from "@/components/admin/ImageListEditor";
import { api, errorMessage } from "@/lib/admin-client";
import type { Category, Product } from "@/lib/catalog/types";

interface Draft {
  name: string;
  description: string;
  display_order: string;
  cover_image: string | null;
}

const field = "w-full border border-[#E5E5E5] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]";
const label = "block text-xs tracking-widest uppercase text-[#6B6B6B] mb-1.5";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  // id de la catégorie en cours de modification, ou « new » pour une création.
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: "", description: "", display_order: "0", cover_image: null });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [cats, products] = await Promise.all([
        api<Category[]>("/api/admin/categories"),
        api<Product[]>("/api/admin/products"),
      ]);
      setCategories(cats);
      const next: Record<string, number> = {};
      for (const p of products) if (p.category_id) next[p.category_id] = (next[p.category_id] ?? 0) + 1;
      setCounts(next);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(cat?: Category) {
    setError("");
    setEditing(cat?.id ?? "new");
    setDraft({
      name: cat?.name ?? "",
      description: cat?.description ?? "",
      display_order: String(cat?.display_order ?? categories.reduce((m, c) => Math.max(m, c.display_order + 1), 0)),
      cover_image: cat?.cover_image ?? null,
    });
  }

  async function save() {
    if (!draft.name.trim()) return setError("Indiquez le nom de la catégorie.");
    setSaving(true);
    setError("");
    const payload = {
      name: draft.name,
      description: draft.description,
      display_order: parseInt(draft.display_order, 10) || 0,
      cover_image: draft.cover_image,
    };
    try {
      if (editing === "new") await api("/api/admin/categories", "POST", payload);
      else await api(`/api/admin/categories/${encodeURIComponent(editing ?? "")}`, "PUT", payload);
      setEditing(null);
      await load();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  async function remove(cat: Category) {
    const n = counts[cat.id] ?? 0;
    const warning = n ? ` Ses ${n} produit${n > 1 ? "s" : ""} seront conservés, sans catégorie.` : "";
    if (!confirm(`Supprimer la catégorie « ${cat.name} » ?${warning}`)) return;
    try {
      await api(`/api/admin/categories/${encodeURIComponent(cat.id)}`, "DELETE");
      await load();
    } catch (e) {
      alert(errorMessage(e));
    }
  }

  const editor = (
    <div className="bg-[#FAFAF9] border border-[#E5E5E5] p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_7rem] gap-4">
            <div>
              <label htmlFor="cat-name" className={label}>Nom *</label>
              <input
                id="cat-name"
                autoFocus
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="cat-order" className={label}>Ordre</label>
              <input
                id="cat-order"
                type="number"
                value={draft.display_order}
                onChange={(e) => setDraft({ ...draft, display_order: e.target.value })}
                className={field}
              />
            </div>
          </div>
          <div>
            <label htmlFor="cat-desc" className={label}>Description</label>
            <input
              id="cat-desc"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className={field}
            />
          </div>
        </div>
        <div>
          <p className={label}>Photo</p>
          <ImageListEditor
            images={draft.cover_image ? [draft.cover_image] : []}
            onChange={(imgs) => setDraft((d) => ({ ...d, cover_image: imgs[0] ?? null }))}
            onUploadingChange={setUploading}
            max={1}
          />
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => setEditing(null)}>Annuler</Button>
        <Button type="button" onClick={save} disabled={saving || uploading}>
          {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
          {editing === "new" ? "Créer" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-medium">Catégories</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Elles composent le menu du site et la grille de l&apos;accueil, dans l&apos;ordre indiqué.
          </p>
        </div>
        <Button onClick={() => startEdit()} disabled={editing === "new"}>
          <Plus size={14} className="mr-2" /> Nouvelle catégorie
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Spinner className="w-6 h-6" /></div>
      ) : (
        <div className="space-y-3">
          {editing === "new" && editor}
          {categories.map((cat) =>
            editing === cat.id ? (
              <div key={cat.id}>{editor}</div>
            ) : (
              <div key={cat.id} className="bg-white border border-[#E5E5E5] flex items-center gap-4 p-3 sm:p-4">
                <div className="relative w-12 h-16 shrink-0 bg-[#F0EDE8] overflow-hidden">
                  {cat.cover_image && <Image src={cat.cover_image} alt="" fill sizes="48px" className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-xs text-[#6B6B6B] truncate">
                    {counts[cat.id] ?? 0} produit{(counts[cat.id] ?? 0) > 1 ? "s" : ""} - ordre {cat.display_order}
                    {cat.description ? ` - ${cat.description}` : ""}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-2 text-[#6B6B6B] hover:text-[#0A0A0A]"
                    aria-label={`Modifier ${cat.name}`}
                    title="Modifier"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => remove(cat)}
                    className="p-2 text-[#6B6B6B] hover:text-red-600"
                    aria-label={`Supprimer ${cat.name}`}
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )
          )}
          {categories.length === 0 && editing !== "new" && (
            <p className="bg-white border border-[#E5E5E5] text-center py-12 text-sm text-[#6B6B6B]">
              Aucune catégorie pour l&apos;instant.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
