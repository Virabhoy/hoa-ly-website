"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ImageListEditor from "@/components/admin/ImageListEditor";
import { api, errorMessage } from "@/lib/admin-client";
import { SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Category, Collection, Product } from "@/lib/catalog/types";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  collections: Collection[];
}

// Une couleur et le stock de chaque taille proposée dans cette couleur.
interface SizeCell {
  id?: string;
  on: boolean;
  stock: number;
}

interface ColorGroup {
  key: string;
  name: string;
  hex: string;
  cells: Record<string, SizeCell>;
}

const BASE_SIZES = [...SIZES, "TU"];

const newKey = () => Math.random().toString(36).slice(2);

function groupVariants(product?: Product): ColorGroup[] {
  const groups: ColorGroup[] = [];
  for (const v of product?.variants ?? []) {
    let group = groups.find((g) => g.name === v.color_name && g.hex === v.color_hex);
    if (!group) {
      group = { key: newKey(), name: v.color_name, hex: v.color_hex, cells: {} };
      groups.push(group);
    }
    group.cells[v.size] = { id: v.id, on: true, stock: v.stock };
  }
  return groups;
}

const label = "block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2";
const field =
  "w-full border border-[#E5E5E5] px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]";

export default function ProductForm({ product, categories, collections }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [collectionId, setCollectionId] = useState(product?.collection_id ?? "");
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [groups, setGroups] = useState<ColorGroup[]>(() => groupVariants(product));
  const [extraSizes, setExtraSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Tailles affichées : tailles standard, tailles déjà utilisées par le produit, tailles ajoutées.
  const sizes = useMemo(() => {
    const used = groups.flatMap((g) => Object.keys(g.cells));
    return Array.from(new Set([...BASE_SIZES, ...used, ...extraSizes]));
  }, [groups, extraSizes]);

  function updateGroup(key: string, patch: Partial<ColorGroup>) {
    setGroups((prev) => prev.map((g) => (g.key === key ? { ...g, ...patch } : g)));
  }

  function updateCell(key: string, size: string, patch: Partial<SizeCell>) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.key !== key) return g;
        const cell = g.cells[size] ?? { on: false, stock: 0 };
        return { ...g, cells: { ...g.cells, [size]: { ...cell, ...patch } } };
      })
    );
  }

  function addColor() {
    const cells: Record<string, SizeCell> = {};
    for (const s of SIZES) cells[s] = { on: true, stock: 0 };
    setGroups((prev) => [...prev, { key: newKey(), name: "", hex: "#0A0A0A", cells }]);
  }

  function addSize() {
    const size = newSize.trim().toUpperCase();
    if (size && !sizes.includes(size)) setExtraSizes((prev) => [...prev, size]);
    setNewSize("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const priceValue = Number(price.replace(",", "."));
    if (!name.trim()) return setError("Indiquez le nom du produit.");
    if (!price || !Number.isFinite(priceValue) || priceValue < 0) return setError("Indiquez un prix valide.");
    if (groups.some((g) => !g.name.trim())) return setError("Donnez un nom à chaque couleur.");

    const variants = groups.flatMap((g) =>
      sizes
        .filter((s) => g.cells[s]?.on)
        .map((s) => ({
          ...(g.cells[s].id ? { id: g.cells[s].id } : {}),
          color_name: g.name.trim(),
          color_hex: g.hex,
          size: s,
          stock: Math.max(0, Math.round(g.cells[s].stock || 0)),
        }))
    );

    const payload = {
      name,
      description,
      price: priceValue,
      category_id: categoryId || null,
      collection_id: collectionId || null,
      is_featured: isFeatured,
      is_active: isActive,
      images,
      variants,
    };

    setSaving(true);
    try {
      if (product) await api(`/api/admin/products/${product.id}`, "PUT", payload);
      else await api("/api/admin/products", "POST", payload);
      router.push("/admin/produits");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product || !confirm(`Supprimer « ${product.name} » définitivement ?`)) return;
    setDeleting(true);
    try {
      await api(`/api/admin/products/${product.id}`, "DELETE");
      router.push("/admin/produits");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Informations */}
      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">Informations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label htmlFor="name" className={label}>Nom *</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={field} required />
          </div>
          <div>
            <label htmlFor="price" className={label}>Prix (€) *</label>
            <input
              id="price"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="79,90"
              className={field}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className={label}>Catégorie</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={field}>
              <option value="">Aucune</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="collection" className={label}>Collection</label>
            <select id="collection" value={collectionId} onChange={(e) => setCollectionId(e.target.value)} className={field}>
              <option value="">Aucune</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}{c.is_archived ? " (archivée)" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className={label}>Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={cn(field, "resize-y")}
            />
          </div>
        </div>
      </section>

      {/* Visibilité */}
      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">Mise en vente</h2>
        <div className="space-y-4">
          <Toggle
            checked={isActive}
            onChange={setIsActive}
            title="Visible sur le site"
            text="Décochez pour retirer l'article du site sans le supprimer."
          />
          <Toggle
            checked={isFeatured}
            onChange={setIsFeatured}
            title="Coup de cœur"
            text="L'article apparaît dans la sélection « Coups de cœur » de l'accueil."
          />
        </div>
      </section>

      {/* Photos */}
      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">Photos</h2>
        <ImageListEditor
          images={images}
          onChange={setImages}
          onUploadingChange={setUploading}
          hint="La photo principale s'affiche dans le catalogue. Utilisez les flèches pour changer l'ordre."
        />
      </section>

      {/* Couleurs et tailles */}
      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h2 className="text-xs tracking-widest uppercase font-medium text-[#6B6B6B]">Couleurs, tailles et stock</h2>
          <Button type="button" variant="secondary" size="sm" onClick={addColor}>
            <Plus size={12} className="mr-1" /> Ajouter une couleur
          </Button>
        </div>
        <p className="text-xs text-[#6B6B6B] mb-5">
          Cliquez sur une taille pour la proposer ou la retirer, puis indiquez le stock disponible en boutique.
        </p>

        {groups.length === 0 && (
          <p className="text-sm text-[#6B6B6B] text-center py-6 border border-dashed border-[#E5E5E5]">
            Aucune couleur pour l&apos;instant.
          </p>
        )}

        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.key} className="border border-[#EFEAE6] p-4">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="color"
                  value={g.hex}
                  onChange={(e) => updateGroup(g.key, { hex: e.target.value })}
                  className="w-9 h-9 border border-[#E5E5E5] cursor-pointer shrink-0"
                  title="Teinte"
                  aria-label="Teinte"
                />
                <input
                  value={g.name}
                  onChange={(e) => updateGroup(g.key, { name: e.target.value })}
                  placeholder="Nom de la couleur (ex. Rouge)"
                  className="flex-1 min-w-0 border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none focus:border-[#0A0A0A]"
                  aria-label="Nom de la couleur"
                />
                <button
                  type="button"
                  onClick={() => setGroups((prev) => prev.filter((x) => x.key !== g.key))}
                  className="p-2 text-[#6B6B6B] hover:text-red-600 transition-colors"
                  aria-label="Supprimer cette couleur"
                  title="Supprimer cette couleur"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const cell = g.cells[s];
                  const on = !!cell?.on;
                  return (
                    <div key={s} className={cn("w-[4.5rem] border", on ? "border-[#0A0A0A]" : "border-[#E5E5E5]")}>
                      <button
                        type="button"
                        onClick={() => updateCell(g.key, s, { on: !on })}
                        className={cn(
                          "w-full py-1.5 text-xs tracking-wider transition-colors",
                          on ? "bg-[#0A0A0A] text-white" : "text-[#767676] hover:text-[#0A0A0A]"
                        )}
                        aria-pressed={on}
                      >
                        {s}
                      </button>
                      <input
                        type="number"
                        min={0}
                        inputMode="numeric"
                        disabled={!on}
                        value={on ? cell.stock : ""}
                        onChange={(e) => updateCell(g.key, s, { stock: parseInt(e.target.value, 10) || 0 })}
                        className={cn(
                          "w-full px-2 py-1.5 text-sm text-center focus:outline-none disabled:bg-[#FAFAF9]",
                          on && cell.stock === 0 && "text-red-600"
                        )}
                        aria-label={`Stock ${g.name || "couleur"} taille ${s}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {groups.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <input
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSize();
                }
              }}
              placeholder="Autre taille (ex. 38)"
              className="w-44 border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none focus:border-[#0A0A0A]"
              aria-label="Autre taille"
            />
            <Button type="button" variant="ghost" size="sm" onClick={addSize}>
              Ajouter la taille
            </Button>
          </div>
        )}
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pb-10">
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || saving}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? <Spinner className="w-3 h-3" /> : <Trash2 size={13} />}
            Supprimer
          </button>
        )}
        {product?.is_active && (
          <Link
            href={`/produit/${product.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A]"
          >
            <ExternalLink size={13} /> Voir sur le site
          </Link>
        )}
        <div className="flex gap-3 sm:ml-auto">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/produits")} className="flex-1 sm:flex-none">
            Annuler
          </Button>
          <Button type="submit" disabled={saving || uploading} className="flex-1 sm:flex-none">
            {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
            {product ? "Enregistrer" : "Créer le produit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  text,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  text: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-[#C30202]"
      />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-[#6B6B6B] mt-0.5">{text}</span>
      </span>
    </label>
  );
}
