"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import ImageListEditor from "@/components/admin/ImageListEditor";
import { api, errorMessage } from "@/lib/admin-client";
import type { Collection } from "@/lib/catalog/types";

interface CollectionFormProps {
  collection?: Collection;
  /** Ordre proposé pour une nouvelle collection (après les existantes). */
  nextOrder?: number;
}

const label = "block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2";
const field =
  "w-full border border-[#E5E5E5] px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]";

export default function CollectionForm({ collection, nextOrder = 0 }: CollectionFormProps) {
  const router = useRouter();

  const [name, setName] = useState(collection?.name ?? "");
  const [shortName, setShortName] = useState(collection?.short_name ?? "");
  const [description, setDescription] = useState(collection?.description ?? "");
  const [images, setImages] = useState<string[]>(collection?.images ?? []);
  const [isArchived, setIsArchived] = useState(collection?.is_archived ?? false);
  const [order, setOrder] = useState(String(collection?.display_order ?? nextOrder));

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Indiquez le nom de la collection.");

    const payload = {
      name,
      short_name: shortName || name,
      description,
      images,
      is_archived: isArchived,
      display_order: parseInt(order, 10) || 0,
    };

    setSaving(true);
    try {
      if (collection) await api(`/api/admin/collections/${encodeURIComponent(collection.id)}`, "PUT", payload);
      else await api("/api/admin/collections", "POST", payload);
      router.push("/admin/collections");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (
      !collection ||
      !confirm(`Supprimer la collection « ${collection.name} » ? Ses produits sont conservés, ils n'auront simplement plus de collection.`)
    )
      return;
    setDeleting(true);
    try {
      await api(`/api/admin/collections/${encodeURIComponent(collection.id)}`, "DELETE");
      router.push("/admin/collections");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">Informations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={label}>Nom *</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Printemps-Été 2027"
              className={field}
              required
            />
          </div>
          <div>
            <label htmlFor="short" className={label}>Nom court</label>
            <input
              id="short"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="PE 2027"
              className={field}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className={label}>Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${field} resize-y`}
            />
          </div>
          <div>
            <label htmlFor="order" className={label}>Ordre d&apos;affichage</label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={field}
            />
            <p className="mt-2 text-xs text-[#6B6B6B]">
              La première collection non archivée est mise en avant sur l&apos;accueil.
            </p>
          </div>
          <div className="flex items-start pt-7">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isArchived}
                onChange={(e) => setIsArchived(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#C30202]"
              />
              <span>
                <span className="block text-sm font-medium">Ancienne collection</span>
                <span className="block text-xs text-[#6B6B6B] mt-0.5">
                  Reste consultable sur le site, dans les anciennes collections.
                </span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#E5E5E5] p-5 sm:p-6">
        <h2 className="text-xs tracking-widest uppercase font-medium mb-5 text-[#6B6B6B]">Photos de la collection</h2>
        <ImageListEditor
          images={images}
          onChange={setImages}
          onUploadingChange={setUploading}
          hint="La première photo sert de couverture. Quand la collection est mise en avant, toutes les photos défilent sur l'accueil."
        />
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pb-10">
        {collection && (
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
        {collection && (
          <Link
            href={`/collections/${collection.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A]"
          >
            <ExternalLink size={13} /> Voir sur le site
          </Link>
        )}
        <div className="flex gap-3 sm:ml-auto">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/collections")} className="flex-1 sm:flex-none">
            Annuler
          </Button>
          <Button type="submit" disabled={saving || uploading} className="flex-1 sm:flex-none">
            {saving && <Spinner className="w-3 h-3 mr-2 border-white/20 border-t-white" />}
            {collection ? "Enregistrer" : "Créer la collection"}
          </Button>
        </div>
      </div>
    </form>
  );
}
