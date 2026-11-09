import type { Metadata } from "next";

/**
 * Adresse publique du site, pour les URL absolues (sitemap, partage sur les réseaux, données Google).
 * À renseigner avec le vrai domaine chez l'hébergeur : NEXT_PUBLIC_APP_URL=https://www.exemple.fr
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Hoa Ly Paris";
export const DEFAULT_DESCRIPTION =
  "Boutique de prêt-à-porter féminin à Paris 13e, avenue de Choisy : áo dài, qipao, robes et vestes brodées.";
export const DEFAULT_IMAGE = "/images/D04B9112.jpg";

export function absoluteUrl(path: string): string {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Métadonnées d'une page publique : titre, description, URL canonique et aperçu de partage.
 * Next remplace les objets imbriqués au lieu de les fusionner : on renvoie donc un openGraph complet.
 */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string | null;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url: path,
      title: title ? `${title} | Hoa Ly` : SITE_NAME,
      description,
      images: [{ url: image || DEFAULT_IMAGE }],
    },
    twitter: { card: "summary_large_image" },
  };
}
