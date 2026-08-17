/* ─────────────────────────────────────────────────────────────
   Server-only client for Google Places API (New) — powers real
   Google Reviews on the homepage Testimonials section. Never
   import this from a "use client" file.
───────────────────────────────────────────────────────────── */
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "";

export function isGooglePlacesConfigured() {
  return !!(GOOGLE_PLACES_API_KEY && GOOGLE_PLACE_ID);
}

/**
 * Public Google Business Profile URLs. Safe to expose to the client — they
 * contain only the Place ID, never the API key.
 *
 * `reviewsUrl` is the fallback destination for the homepage "Read All Reviews"
 * button (WS-1.4) when Places is unconfigured, and `writeReviewUrl` is the
 * ask-for-a-review link WS-9.5 needs at certificate handover.
 *
 * Both fall back to a Maps search for the business name if no Place ID is set,
 * so neither can ever render as href="#" — the exact defect WS-1.4 reports.
 */
const MAPS_FALLBACK =
  "https://www.google.com/maps/search/?api=1&query=Company+Avenue+Advisory+Janakpuri+New+Delhi";

export function googleReviewsUrl(): string {
  return GOOGLE_PLACE_ID
    ? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`
    : MAPS_FALLBACK;
}

export function googleWriteReviewUrl(): string {
  return GOOGLE_PLACE_ID
    ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
    : MAPS_FALLBACK;
}

export interface GoogleReview {
  authorName: string;
  authorPhotoUrl: string | null;
  authorProfileUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface PlaceReviewsData {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
  mapsUrl: string;
}

export async function fetchPlaceReviews(): Promise<PlaceReviewsData> {
  if (!isGooglePlacesConfigured()) {
    throw new Error("GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not configured");
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`, {
    headers: {
      "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
    // Reviews don't change minute-to-minute — cache for a day to stay
    // well within the free Google Cloud billing credit.
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`Google Places API error: ${res.status}`);
  }

  const data = await res.json();

  const reviews: GoogleReview[] = (data.reviews ?? []).map((r: Record<string, unknown>) => {
    const author = r.authorAttribution as Record<string, string> | undefined;
    const text = r.text as Record<string, string> | undefined;
    return {
      authorName: author?.displayName ?? "Google User",
      authorPhotoUrl: author?.photoUri ?? null,
      authorProfileUrl: author?.uri ?? null,
      rating: Number(r.rating ?? 0),
      text: text?.text ?? "",
      relativeTime: String(r.relativePublishTimeDescription ?? ""),
    };
  });

  return {
    rating: Number(data.rating ?? 0),
    userRatingCount: Number(data.userRatingCount ?? 0),
    reviews,
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
  };
}
