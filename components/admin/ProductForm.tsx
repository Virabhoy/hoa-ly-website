"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { Category, Product, ProductVariant } from "@/lib/supabase/types";
import { SIZES } from "@/lib/constants";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

interface VariantDraft extends Partial<ProductVariant> {
  _key: string;
}

function generateKey() {
  return Math.random().toString(36).slice(2);
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [variants, setVariants] = useState<VariantDraft[]>(
    product?.variants?.map((v) => ({ ...v, _key: generateKey() })) ?? []
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function uploadImage(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url;
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    setImages((prev) => [...prev, ...urls]);
    setUploading(false);
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      { _key: generateKey(), color_name: "", color_hex: "#000000", size: "M", stock: 0 },
    ]);
  }

  function updateVariant(key: string, field: string, value: string | number) {
    setVariants((prev) =>
      prev.map((v) => (v._key === key ? { ...v, [field]: value } : v))
    );
  }

  function removeVariant(key: string) {
    setVariants((prev) => prev.filter((v) => v._key !== key));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const payload = {
        name,
        description: description || null,
        price: parseFloat(price),
        category_id: categoryId || null,
        is_featured: isFeatured,
        is_active: isActive,
        images,
        cover_image: images[0] ?? null,
      };

      let productId = product?.id;

      if (product) {
        await fetch(`/api/admin/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        productId = data.id;
      }

      // Sync variants
      for (const v of variants) {
        if (v.id) {
          await fetch(`/api/admin/variants/${v.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              color_name: v.color_name,
              color_hex: v.color_hex,
              size: v.size,
              stock: v.stock ?? 0,
            }),
          });
        } else {
          await fetch("/api/admin/variants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product_id: productId,
              color_name: v.color_name,
              color_hex: v.color_hex,
              size: v.size,
              stock: v.stock ?? 0,
            }),
          });
        }
      }

      router.push("/admin/produits");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Basic info */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">
          Informations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Nom *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A0A0A]"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Prix (€) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A0A0A]"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Catégorie</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A0A0A] bg-white"
            >
              <option value="">— Aucune —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A0A0A] resize-none"
            />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              Coup de cœur
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4"
              />
              Actif
            </label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">
          Photos
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
          {images.map((url, i) => (
            <div key={url} className="relative aspect-[3/4] bg-[#F0EDE8]">
              <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" />
              {i === 0 && (
                <span className="absolute top-1 left-1 bg-[#C8A882] text-white text-[9px] px-1">
                  Principal
                </span>
              )}
              <button
                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-black/60 text-white p-0.5 hover:bg-red-600"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-[3/4] border-2 border-dashed border-[#E5E5E5] hover:border-[#C8A882] flex items-center justify-center text-[#6B6B6B] hover:text-[#C8A882] transition-colors"
          >
            {uploading ? <Spinner /> : <Upload size={20} />}
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <p className="text-xs text-[#6B6B6B]">
          La première image sera utilisée comme photo principale. Formats acceptés : JPG, PNG, WEBP.
        </p>
      </div>

      {/* Variants */}
      <div className="bg-white border border-[#E5E5E5] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs tracking-widest uppercase font-medium text-[#6B6B6B]">
            Variantes (couleur × taille)
          </h2>
          <Button variant="secondary" size="sm" onClick={addVariant}>
            <Plus size={12} className="mr-1" /> Ajouter
          </Button>
        </div>

        {variants.length === 0 && (
          <p className="text-sm text-[#6B6B6B] text-center py-6">
            Aucune variante — cliquez sur Ajouter pour commencer.
          </p>
        )}

        <div className="space-y-3">
          {variants.map((v) => (
            <div key={v._key} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-1">
                <input
                  type="color"
                  value={v.color_hex ?? "#000000"}
                  onChange={(e) => updateVariant(v._key, "color_hex", e.target.value)}
                  className="w-8 h-8 border border-[#E5E5E5] cursor-pointer"
                  title="Couleur"
                />
              </div>
              <div className="col-span-4">
                <input
                  placeholder="Nom couleur"
                  value={v.color_name ?? ""}
                  onChange={(e) => updateVariant(v._key, "color_name", e.target.value)}
                  className="w-full border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="col-span-3">
                <select
                  value={v.size ?? "M"}
                  onChange={(e) => updateVariant(v._key, "size", e.target.value)}
                  className="w-full border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none bg-white"
                >
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  min="0"
                  placeholder="Stock"
                  value={v.stock ?? 0}
                  onChange={(e) => updateVariant(v._key, "stock", parseInt(e.target.value) || 0)}
                  className="w-full border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => removeVariant(v._key)}
                  className="text-[#6B6B6B] hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={() => router.push("/admin/produits")}>
          Annuler
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
          {product ? "Enregistrer les modifications" : "Créer le produit"}
        </Button>
      </div>
    </div>
  );
}
