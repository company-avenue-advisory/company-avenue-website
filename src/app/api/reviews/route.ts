import { NextResponse } from "next/server";
import { fetchPlaceReviews, isGooglePlacesConfigured } from "@/lib/google-places";

export async function GET() {
  if (!isGooglePlacesConfigured()) {
    return NextResponse.json({ configured: false });
  }

  try {
    const data = await fetchPlaceReviews();
    return NextResponse.json({ configured: true, ...data });
  } catch (err) {
    console.error("[Google reviews]", err);
    return NextResponse.json({ configured: false });
  }
}
