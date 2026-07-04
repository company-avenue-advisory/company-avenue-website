import { useEffect, useState } from "react";
import type { PlaceReviewsData } from "@/lib/google-places";

type ReviewsResponse = ({ configured: true } & PlaceReviewsData) | { configured: false };

export function useGoogleReviews() {
  const [data, setData] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((json: ReviewsResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData({ configured: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
