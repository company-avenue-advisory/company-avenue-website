import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { canonical, breadcrumbSchema, OG_IMAGE, SITE_URL } from "@/lib/seo";
import {
  fetchPlaceReviews,
  googleReviewsUrl,
  googleWriteReviewUrl,
  isGooglePlacesConfigured,
  type PlaceReviewsData,
} from "@/lib/google-places";

/* ─────────────────────────────────────────────────────────────────────────────
   WS-5.1 — the reviews destination.

   A populated reviews page existed on the legacy WordPress site but was
   orphaned from this build, so genuine Google reviews were going unused while
   the homepage showed untraceable testimonials. This page is the replacement
   and the target for the homepage "Read All Reviews" button (WS-1.4) and the
   /reviews/ legacy 301.

   Everything on this page comes live from the Google Business Profile via the
   Places API — there is no hardcoded review text, no seeded name, and no
   fallback persona anywhere in this file. If Places is unconfigured or the API
   is down, the page says so and sends the visitor to the Google profile
   itself. It will never invent a client.

   No Review or AggregateRating markup is emitted here on purpose. Review
   markup a business publishes about itself is self-serving under Google's
   structured-data policy and is not eligible for rich results; the live rating
   already reaches Google through the Organization node in the root layout.
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  alternates: canonical("/reviews"),
  title: "Client Reviews — Verified Google Reviews",
  description:
    "Read verified Google reviews for Company Avenue Advisory from founders, directors and business owners across Delhi NCR. Every review is pulled live from our Google Business Profile.",
  openGraph: {
    title: "Client Reviews — Company Avenue Advisory",
    description:
      "Verified Google reviews from founders, directors and business owners we have helped with registration, GST and compliance.",
    url: `${SITE_URL}/reviews`,
    images: [OG_IMAGE],
  },
};

// Reviews change slowly; the Places fetch itself is cached for 24h. Matching
// the page's revalidate window keeps the rendered HTML and the data in step.
export const revalidate = 86400;

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
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Never throws — a Places outage must not 500 the page. */
async function getReviews(): Promise<PlaceReviewsData | null> {
  if (!isGooglePlacesConfigured()) return null;
  try {
    return await fetchPlaceReviews();
  } catch (err) {
    console.error("[reviews page]", err);
    return null;
  }
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const data = await getReviews();
  const reviews = data?.reviews ?? [];
  const readUrl = data?.mapsUrl ?? googleReviewsUrl();
  const writeUrl = googleWriteReviewUrl();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Client Reviews", path: "/reviews" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-heading font-semibold text-white/80">
              <ShieldCheck size={13} className="text-accent" />
              Pulled live from our Google Business Profile
            </span>
            <h1 className="heading-lg text-white mt-5 mb-5">
              What Our Clients Actually Say
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Every review below is a verified Google review, shown exactly as the
              client wrote it. We do not write, edit, filter or reorder them, and
              nothing on this page is a stock testimonial.
            </p>

            {data && data.rating > 0 && (
              <div className="mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-4xl text-white">
                      {data.rating.toFixed(1)}
                    </span>
                    <span className="text-white/40 text-sm">/ 5</span>
                  </div>
                  <div className="mt-1.5">
                    <Stars rating={data.rating} />
                  </div>
                </div>
                <div className="h-12 w-px bg-white/10" aria-hidden />
                <div>
                  <p className="font-heading font-bold text-2xl text-white">
                    {data.userRatingCount}
                  </p>
                  <p className="text-white/40 text-sm">Google reviews</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          {reviews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                  <article
                    key={`${r.authorName}-${i}`}
                    className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <Quote size={22} className="mb-4 text-slate-200" />
                    <Stars rating={r.rating} size={13} />
                    <p className="mt-4 mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      {r.authorPhotoUrl ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
                          <Image
                            src={r.authorPhotoUrl}
                            alt={`${r.authorName}, Google reviewer`}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold ${
                            AVATAR_COLORS[i % AVATAR_COLORS.length]
                          }`}
                        >
                          {initials(r.authorName)}
                        </div>
                      )}
                      <div>
                        <p className="font-heading text-sm font-semibold text-dark">
                          {r.authorName}
                        </p>
                        <p className="text-xs text-muted">
                          Google review{r.relativeTime ? ` · ${r.relativeTime}` : ""}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-8 text-center text-xs text-muted">
                The Google Places API returns a subset of the most relevant
                reviews. Open the Google Business Profile to read all{" "}
                {data?.userRatingCount ?? ""} of them.
              </p>
            </>
          ) : (
            /* Honest empty state. No invented reviews — see the file header. */
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-background p-8 text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
                <span className="font-heading text-lg font-bold text-[#4285F4]">G</span>
              </div>
              <h2 className="font-heading text-lg font-semibold text-dark">
                Our reviews live on Google
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We are not able to load them here right now. You can read every
                review, unfiltered, straight from our Google Business Profile.
              </p>
              <a
                href={readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Read our Google reviews
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Read on Google / leave a review */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <span className="font-heading text-lg font-bold text-[#4285F4]">G</span>
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-dark">
                  Worked with us?
                </p>
                <p className="text-xs text-muted">
                  A review helps the next founder decide who to trust.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
              >
                Read on Google <ExternalLink size={13} />
              </a>
              <a
                href={writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-dark px-4 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-dark/90"
              >
                Write a review <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Next Step"
            title="See What We Would Do For You"
            subtitle="Reviews tell you how we work. These tell you what it costs and how long it takes."
            className="mb-8"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                href: "/services",
                title: "Browse all services",
                desc: "Registration, GST, trademark, ROC and payroll — with fixed fees.",
              },
              {
                href: "/calculators",
                title: "Estimate your cost",
                desc: "Free calculators — one number for your exact structure and state, no packages.",
              },
              {
                href: "/contact",
                title: "Book a consultation",
                desc: "Talk to a Chartered Accountant before you commit to anything.",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-card"
              >
                <p className="font-heading text-sm font-semibold text-dark">
                  {c.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-semibold text-primary">
                  Go
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
