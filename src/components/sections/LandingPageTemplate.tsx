"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";
import { PHONE_E164, waLink } from "@/lib/seo";
import { trackEvent } from "@/lib/gtag";
import { HOURS_LINE } from "@/lib/nap";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import type { LandingPageConfig } from "@/lib/landing-pages";
import { PROOF_STRIP } from "@/lib/landing-pages";

/**
 * Shared shell for every /lp/* paid-traffic landing page. One template, one
 * config object per page (src/lib/landing-pages.ts) — price and identity
 * come from PRO_FEES / nap.ts, never retyped here.
 *
 * Lead capture is WhatsApp-only by design (client decision): the form builds
 * a prefilled wa.me message and hands off. Call/WhatsApp CTAs are plain
 * tel:/wa.me anchors so the site's existing delegated listener
 * (EventTracking, mounted in app/lp/layout.tsx) auto-tracks click_to_call /
 * whatsapp_click without another handler here.
 */
export function LandingPageTemplate({ config }: { config: LandingPageConfig }) {
  const wa = waLink(config.waIntent);
  const [service, setService] = useState(config.serviceOptions[0]);
  const reviewsData = useGoogleReviews();
  const liveReviews =
    reviewsData?.configured === true ? reviewsData.reviews.slice(0, 3) : [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const mobile = String(data.get("mobile") ?? "");
    const city = String(data.get("city") ?? "");

    trackEvent("generate_lead", { service, lead_method: "website_form", city });

    const msg = `Hi CAA, I found you through Google. I want ${service}.\n\nName: ${name}\nMobile: ${mobile}\nCity: ${city}\n\nPlease share pricing and next steps.`;
    window.location.href = `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="bg-white text-dark">
      {/* header */}
      <header className="h-[76px] border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full w-[92%] max-w-[1180px] items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/new_logo.png" alt="Company Avenue Advisory logo" width={44} height={44} className="h-11 w-11 object-contain" />
            <div>
              <b className="block text-[16px] tracking-tight text-primary">Company Avenue Advisory</b>
              <span className="block text-[10px] text-muted">Start · Run · Grow — Fully Compliant</span>
            </div>
          </Link>
          <div className="flex gap-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-[13px] font-extrabold text-[#062210]">WhatsApp</a>
            <a href={`tel:${PHONE_E164}`} className="hidden min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-[13px] font-extrabold text-white sm:inline-flex">Call Now</a>
          </div>
        </div>
      </header>

      <main>
        {/* hero + quote form */}
        <section className="bg-gradient-to-b from-background to-white py-10 pb-8 md:py-[50px] md:pb-8">
          <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 items-center gap-6 md:grid-cols-[1.05fr_.95fr] md:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-primary">
                <i className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {config.pillLabel}
              </div>
              <h1 className="mt-4 max-w-[700px] text-[42px] leading-[1.03] tracking-tight text-dark sm:text-[52px] lg:text-[62px]">
                {config.h1} <span className="text-primary">{config.h1Emphasis}</span>
              </h1>
              <p className="mb-5 max-w-[620px] text-[15px] text-slate-500 sm:text-[17px]">{config.lead}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {config.micro.map((m) => (
                  <span key={m} className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-600">{m}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a href="#lead-form" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-[13px] font-extrabold text-[#13253B]">Get My Quote</a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-[13px] font-extrabold text-[#062210]">WhatsApp an Expert</a>
              </div>
              <div className="mt-2.5 text-[11px] text-muted">No long forms. Share the essentials and we&apos;ll take it from there.</div>
            </div>

            <aside id="lead-form" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(8,23,38,0.10)]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[23px] tracking-tight text-dark">Get your quote</h2>
                  <div className="mt-1 text-[12px] text-muted">Takes about 30 seconds</div>
                </div>
                <div className="whitespace-nowrap rounded-xl bg-[#FBF5E8] px-2.5 py-2 text-[11px] font-extrabold text-[#634C18]">{config.formOffer}</div>
              </div>
              <form onSubmit={handleSubmit}>
                <Field label="Your name"><input name="name" required placeholder="Enter your name" className={inputClass} /></Field>
                <Field label="Mobile number"><input name="mobile" required inputMode="tel" placeholder="10-digit mobile number" className={inputClass} /></Field>
                <Field label="City"><input name="city" defaultValue="Delhi" placeholder="Delhi / NCR" className={inputClass} /></Field>
                <Field label="What do you need?">
                  <select name="service" required value={service} onChange={(e) => setService(e.target.value)} className={inputClass}>
                    {config.serviceOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <button type="submit" className="mt-1 min-h-11 w-full rounded-xl bg-accent text-[13px] font-extrabold text-[#13253B]">Get My Quote →</button>
                <div className="my-3.5 flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />or speak directly<span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`tel:${PHONE_E164}`} className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white text-[12px] font-extrabold text-primary">📞 Call</a>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#25D366] text-[12px] font-extrabold text-[#062210]">💬 WhatsApp</a>
                </div>
                <p className="mt-2.5 text-[10px] text-slate-400">By submitting, you agree to be contacted about your enquiry. We do not sell your contact details.</p>
              </form>
            </aside>
          </div>
        </section>

        {/* proof strip */}
        <section className="border-y border-slate-200">
          <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-2 md:grid-cols-4">
            {PROOF_STRIP.map((p, i) => (
              <div key={p.label} className={`px-3 py-4 sm:px-4 sm:py-4 ${i % 2 === 0 ? "border-r border-slate-200" : ""} ${i < 2 ? "border-b border-slate-200 md:border-b-0" : ""} md:border-r md:border-b-0 md:last:border-r-0`}>
                <b className="block text-lg tracking-tight text-primary sm:text-xl">{p.value}</b>
                <span className="mt-0.5 block text-[11px] text-muted">{p.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* included */}
        <section className="bg-background py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-6 max-w-[690px]">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary">Included</div>
              <h2 className="mt-1.5 text-[28px] tracking-tight text-dark sm:text-[36px]">What CAA helps you get done.</h2>
              <p className="mt-2 text-sm text-muted">Focused support around the actual filing and the paperwork that comes with it.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.included.map((t) => (
                <div key={t.title} className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-emerald-50 text-[12px] font-black text-emerald-700">✓</div>
                  <div>
                    <b className="text-[12px]">{t.title}</b>
                    <br /><span className="text-[11px] text-muted">{t.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* price row */}
        <section className="py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="flex flex-col items-start justify-between gap-5 rounded-[22px] bg-dark px-6 py-6 text-white md:flex-row md:items-center">
              <div>
                <b className="block text-2xl tracking-tight sm:text-3xl">{config.priceLabel}</b>
                <span className="mt-0.5 block text-[11px] text-slate-300">{config.priceSub}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a href="#lead-form" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-[13px] font-extrabold text-[#13253B]">Get Exact Quote</a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-[13px] font-extrabold text-[#062210]">WhatsApp</a>
              </div>
            </div>
            {config.calculator && (
              <div className="mt-3 text-center md:text-left">
                <Link href={config.calculator.href} className="text-[12px] font-semibold text-primary hover:underline">
                  {config.calculator.label} →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* compare */}
        <section className="bg-background py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-6 max-w-[690px]">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary">{config.compare.kicker}</div>
              <h2 className="mt-1.5 text-[28px] tracking-tight text-dark sm:text-[36px]">{config.compare.heading}</h2>
              <p className="mt-2 text-sm text-muted">{config.compare.sub}</p>
            </div>
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {[config.compare.left, config.compare.right].map((box, i) => (
                <div key={box.title} className={`rounded-2xl border bg-white p-5 ${i === 0 ? "border-slate-300 shadow-[0_8px_25px_rgba(15,45,82,0.06)]" : "border-slate-200"}`}>
                  <h3 className="text-base text-dark">{box.title}</h3>
                  <p className="mt-2.5 text-xs text-muted">{box.body}</p>
                  <ul className="mt-3 space-y-2">
                    {box.points.map((pt) => (
                      <li key={pt} className="text-[11px] text-slate-600"><span className="mr-1.5 font-black text-primary">✓</span>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* process */}
        <section className="py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-6 max-w-[690px]">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary">Process</div>
              <h2 className="mt-1.5 text-[28px] tracking-tight text-dark sm:text-[36px]">Three steps. One point of contact.</h2>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {config.process.map((s, i) => (
                <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_24px_rgba(8,23,38,0.035)]">
                  <div className="mb-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-[11px] font-black text-primary">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-[17px] tracking-tight text-dark">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-muted">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* client proof — real Google reviews only, same discipline as Testimonials.tsx:
            no fallback testimonial array. Unconfigured/empty renders an honest panel
            instead of a placeholder card. */}
        <section className="bg-background py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-6 max-w-[690px]">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary">Client proof</div>
              <h2 className="mt-1.5 text-[28px] tracking-tight text-dark sm:text-[36px]">Built around real business support.</h2>
              <p className="mt-2 text-sm text-muted">
                {liveReviews.length > 0
                  ? "Real reviews from our Google Business Profile."
                  : "Our reviews live on our Google Business Profile, unedited and unfiltered."}
              </p>
            </div>

            {liveReviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {liveReviews.map((r, i) => (
                  <article key={`${r.authorName}-${i}`} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, s) => (
                        <Star key={s} size={12} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="my-2.5 min-h-[66px] flex-1 text-xs text-slate-500 line-clamp-5">&ldquo;{r.text}&rdquo;</p>
                    <small className="text-[10px] font-extrabold text-slate-400">{r.authorName} · Google Review</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white">
                  <ShieldCheck size={18} className="text-primary" />
                </div>
                <p className="text-base font-semibold text-dark">We only publish reviews our clients actually wrote</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                  Rather than show a testimonial you cannot check, we send you straight to the source — every review on our Google Business Profile, unedited.
                </p>
                <Link href="/reviews" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700">
                  Read our client reviews <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* faq */}
        <section className="py-11 md:py-[58px]">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-6 max-w-[690px]">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary">FAQ</div>
              <h2 className="mt-1.5 text-[28px] tracking-tight text-dark sm:text-[36px]">Before you start.</h2>
            </div>
            <div className="border-t border-slate-200">
              {config.faqs.map((f) => (
                <details key={f.q} className="border-b border-slate-200 py-4">
                  <summary className="cursor-pointer text-[13px] font-extrabold text-dark">{f.q}</summary>
                  <p className="mt-2.5 max-w-[850px] text-xs text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="bg-gradient-to-br from-dark to-primary py-12 text-white md:py-14">
          <div className="mx-auto flex w-[92%] max-w-[1180px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-[30px] tracking-tight sm:text-[40px]">{config.finalHeading}</h2>
              <p className="mt-2 max-w-[620px] text-[13px] text-slate-300">{config.finalBody}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-[13px] font-extrabold text-[#062210]">WhatsApp Now</a>
              <a href={`tel:${PHONE_E164}`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 text-[13px] font-extrabold text-[#13253B]">Call Now</a>
              <a href="#lead-form" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-[13px] font-extrabold text-primary">Get a Quote</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-0 pb-[88px] pt-5 text-[10px] text-slate-500 md:pb-5">
        <div className="mx-auto flex w-[92%] max-w-[1180px] flex-wrap justify-between gap-4">
          <span>© Company Avenue Advisory · Delhi · {HOURS_LINE}</span>
          <span>Timelines, statutory requirements and final pricing can vary by case and authority processing.</span>
        </div>
      </footer>

      {/* sticky mobile CTA bar */}
      <div data-sticky-cta className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/96 p-2 md:hidden">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-[#25D366] text-[13px] font-extrabold text-[#062210]">💬 WhatsApp</a>
        <a href={`tel:${PHONE_E164}`} className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-primary text-[13px] font-extrabold text-white">📞 Call Now</a>
      </div>
    </div>
  );
}

const inputClass =
  "h-[46px] w-full rounded-xl border border-slate-300 bg-white px-3.5 text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2.5">
      <label className="mb-1.5 block text-[11px] font-extrabold text-slate-600">{label}</label>
      {children}
    </div>
  );
}
