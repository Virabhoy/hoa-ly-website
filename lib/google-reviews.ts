import type { GooglePlaceData } from "@/lib/catalog/types";

/**
 * Avis Google de la boutique (API Google Places), mis en cache 24 h.
 * Appelé directement par les pages serveur : inutile de passer par une route API du site.
 */
export async function getGoogleReviews(): Promise<GooglePlaceData | null> {
  const placeId = process.env.GOOGLE_PLACE_ID ?? "";
  const apiKey = process.env.GOOGLE_PLACES_API_KEY ?? "";
  if (!placeId || !apiKey) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
        "Accept-Language": "fr",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const raw = await res.json();
    return {
      name: raw.displayName?.text ?? "Hoa Ly",
      rating: raw.rating ?? 0,
      totalRatings: raw.userRatingCount ?? 0,
      reviews: (raw.reviews ?? []).slice(0, 5).map(
        (r: {
          rating: number;
          text?: { text: string };
          authorAttribution?: { displayName: string; photoUri?: string; uri?: string };
          relativePublishTimeDescription?: string;
        }) => ({
          rating: r.rating,
          text: r.text?.text ?? "",
          authorName: r.authorAttribution?.displayName ?? "Anonyme",
          authorPhoto: r.authorAttribution?.photoUri ?? null,
          authorUrl: r.authorAttribution?.uri ?? null,
          relativeTime: r.relativePublishTimeDescription ?? "",
        })
      ),
    };
  } catch {
    return null;
  }
}
