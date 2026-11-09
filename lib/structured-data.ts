import {
  STORE_ADDRESS_PARTS,
  STORE_EMAIL,
  STORE_INSTAGRAM,
  STORE_LAT,
  STORE_LNG,
  STORE_PHONE,
} from "@/lib/constants";
import { DEFAULT_IMAGE, SITE_URL, absoluteUrl } from "@/lib/site";
import type { Product } from "@/lib/catalog/types";

// Données structurées schema.org : elles aident Google à afficher la boutique (horaires, adresse)
// et les produits (prix, disponibilité) directement dans les résultats.

const DAYS: Record<string, string> = {
  Lundi: "Monday",
  Mardi: "Tuesday",
  Mercredi: "Wednesday",
  Jeudi: "Thursday",
  Vendredi: "Friday",
  Samedi: "Saturday",
  Dimanche: "Sunday",
};

/** « 01 53 79 25 44 » devient « +33153792544 ». */
function internationalPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `+33${digits.slice(1)}` : `+${digits}`;
}

/** « 10h00 - 20h00 » devient { opens: "10:00", closes: "20:00" } ; « Fermé » est ignoré. */
function parseHours(value: string): { opens: string; closes: string } | null {
  const times = value.match(/(\d{1,2})h(\d{2})?/g);
  if (!times || times.length < 2) return null;
  const toTime = (t: string) => {
    const [h, m] = t.split("h");
    return `${h.padStart(2, "0")}:${(m || "00").padStart(2, "0")}`;
  };
  return { opens: toTime(times[0]), closes: toTime(times[1]) };
}

const STORE_ID = `${SITE_URL}/#boutique`;

export function storeJsonLd(hours: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": STORE_ID,
    name: "Hoa Ly",
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_IMAGE),
    logo: absoluteUrl("/images/logo-hoaly-lotus.png"),
    telephone: internationalPhone(STORE_PHONE),
    email: STORE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_ADDRESS_PARTS.street,
      postalCode: STORE_ADDRESS_PARTS.postalCode,
      addressLocality: STORE_ADDRESS_PARTS.city,
      addressCountry: STORE_ADDRESS_PARTS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: STORE_LAT, longitude: STORE_LNG },
    openingHoursSpecification: Object.entries(hours).flatMap(([day, value]) => {
      const slot = parseHours(value);
      return slot && DAYS[day] ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[day], ...slot }] : [];
    }),
    sameAs: [`https://www.instagram.com/${STORE_INSTAGRAM}`],
  };
}

export function productJsonLd(product: Product) {
  const variants = product.variants ?? [];
  const inStock = variants.length === 0 || variants.some((v) => v.stock > 0);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.images.map(absoluteUrl),
    category: product.category?.name,
    brand: { "@type": "Brand", name: "Hoa Ly" },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/produit/${product.slug}`),
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      itemCondition: "https://schema.org/NewCondition",
      // Vente en boutique uniquement.
      availability: inStock ? "https://schema.org/InStoreOnly" : "https://schema.org/OutOfStock",
      seller: { "@id": STORE_ID },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
