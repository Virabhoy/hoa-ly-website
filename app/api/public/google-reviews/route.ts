import { NextResponse } from "next/server";
import type { GooglePlaceData } from "@/lib/supabase/types";

const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";

export const revalidate = 86400; // 24h

export async function GET() {
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json(null, { status: 200 });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return NextResponse.json(null, { status: 200 });

    const raw = await res.json();

    const data: GooglePlaceData = {
      name: raw.displayName?.text ?? "Hoa Ly",
      rating: raw.rating ?? 0,
      totalRatings: raw.userRatingCount ?? 0,
      reviews: (raw.reviews ?? []).slice(0, 5).map((r: {
        rating: number;
        text?: { text: string };
        authorAttribution?: { displayName: string; photoUri?: string };
        relativePublishTimeDescription?: string;
      }) => ({
        rating: r.rating,
        text: r.text?.text ?? "",
        authorName: r.authorAttribution?.displayName ?? "Anonyme",
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        relativeTime: r.relativePublishTimeDescription ?? "",
      })),
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
