import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

export const revalidate = 86400; // 24 h

// Conservée pour un éventuel usage côté navigateur ; l'accueil appelle getGoogleReviews() directement.
export async function GET() {
  return NextResponse.json(await getGoogleReviews());
}
