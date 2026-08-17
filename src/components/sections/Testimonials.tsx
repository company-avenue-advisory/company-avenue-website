"use client";
import { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ShieldCheck, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

/* ─────────────────────────────────────────────────────────────────────────────
   WS-5.2 — the five named testimonials that used to live in this file
   (Arjun Sharma, Priya Mehta, Rohan Kapoor, Neha Singh, Vikram Patel) have
   been DELETED. None corresponded to any locatable Google review, and they
   rendered whenever the Places API was unconfigured or erroring — which was
   the live state of the site.

   Do not reintroduce a hardcoded testimonial array here. If the Principal
   confirms in writing that a specific named statement is from a real client,
   it belongs in a reviewed content source with that attribution recorded, not
   as a silent fallback behind an API call.

   With no live reviews, this section now renders a factual trust panel that
   points at /reviews and the Google profile. It makes no claim about any
   individual client.
───────────────────────────────────────────────────────────────────────────── */

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reviewsData = useGoogleReviews();

  const isLive = reviewsData?.configured === true && reviewsData.reviews.length > 0;

  // Live Google reviews only. No fallback array exists — see the note above.
  const cards = useMemo(() => {
    if (!isLive || !reviewsData?.configured) return [];
    return reviewsData.reviews.map((r, i) => ({
      key: `${r.authorName}-${i}`,
      name: r.authorName,
      role: "Google Review",
      rating: r.rating,
      text: r.text,
      photoUrl: r.authorPhotoUrl,
      avatar: initials(r.authorName),
      avatarBg: AVATAR_COLORS[i % AVATAR_COLORS.length],
    }));
  }, [isLive, reviewsData]);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval>;
    const start = () => {
      id = setInterval(() => {
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 320, behavior: "smooth" });
        }
      }, 3500);
    };
    start();
    el.addEventListener("mouseenter", () => clearInterval(id));
    el.addEventListener("mouseleave", start);
    return () => clearInterval(id);
  }, [cards.length]);

  // WS-5.2/5.3: `rating` used to default to a hardcoded 4.9 when Places was
  // unavailable. A star rating is a factual claim, so there is no default now —
  // it renders only when it is the real, live figure.
  const live = isLive && reviewsData?.configured ? reviewsData : null;
  const rating = live?.rating ?? null;
  const reviewCount = live?.userRatingCount ?? null;

  return (
    <section className="py-14 md:py-24 bg-white" id="testimonials">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          subtitle={
            isLive
              ? "Real reviews from our Google Business Profile — founders, directors and business owners we've helped grow."
              : "Our reviews live on our Google Business Profile, unedited and unfiltered."
          }
          className="mb-10 md:mb-14"
        />

        {/* No live reviews → a factual panel, never a placeholder client. */}
        {cards.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-background p-8 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <p className="font-heading text-base font-semibold text-dark">
              We only publish reviews our clients actually wrote
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Rather than show a testimonial you cannot check, we send you
              straight to the source — every review on our Google Business
              Profile, unedited.
            </p>
            <Link
              href="/reviews"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Read our client reviews
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex-shrink-0 w-80 md:w-96 snap-start"
            >
              <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-card hover:border-primary/10 transition-all duration-300 flex flex-col">
                <Quote size={22} className="text-slate-200 mb-4" />

                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 line-clamp-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  {t.photoUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-100">
                      <Image src={t.photoUrl} alt={t.name} fill unoptimized className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0 ${t.avatarBg}`}
                    >
                      {t.avatar}
                    </div>
                  )}
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">{t.name}</p>
                    <p className="text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google aggregate. The rating block appears only with live data;
            the "Read All Reviews" link always resolves to /reviews (WS-1.4 —
            it was href="#" and navigated nowhere). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <span className="font-heading font-bold text-[#4285F4] text-lg">G</span>
            </div>
            <div>
              {rating !== null ? (
                <>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
                      />
                    ))}
                    <span className="font-heading font-bold text-dark text-sm ml-1">{rating.toFixed(1)}</span>
                  </div>
                  <p className="text-muted text-xs mt-0.5">
                    {reviewCount !== null
                      ? `Based on ${reviewCount} Google Reviews`
                      : "Based on our Google Reviews"}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-heading font-semibold text-dark text-sm">
                    Reviewed on Google
                  </p>
                  <p className="text-muted text-xs mt-0.5">
                    Verified reviews from our Google Business Profile
                  </p>
                </>
              )}
            </div>
          </div>
          <Link
            href="/reviews"
            className="text-primary text-sm font-heading font-semibold hover:underline"
          >
            Read All Reviews →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
