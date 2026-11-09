import type { MetadataRoute } from "next";
import { getAllProducts, getCategories, getCollections } from "@/lib/catalog/queries";
import { SITE_URL } from "@/lib/site";

// Recalculé au plus toutes les heures : les nouveaux produits y apparaissent sans redéploiement.
export const revalidate = 3600;

function date(value: string | undefined): Date | undefined {
  const d = value ? new Date(value) : undefined;
  return d && !Number.isNaN(d.getTime()) ? d : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, collections] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getCollections(),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalogue`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/collections`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/boutique`, changeFrequency: "monthly", priority: 0.8 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/catalogue/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...collections.map((c) => ({
      url: `${SITE_URL}/collections/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: c.is_archived ? 0.5 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/produit/${p.slug}`,
      lastModified: date(p.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...["/mentions-legales", "/confidentialite", "/cookies", "/conditions-utilisation"].map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
