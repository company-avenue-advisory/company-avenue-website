import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { UsLeadForm } from "@/components/us/UsLeadForm";
import {
  AUDIENCES,
  BPO_VS_POD,
  CERTIFICATIONS_CONFIRMED,
  FIRM_YEARS,
  PILOT_FEE,
  PILOT_FEE_USD,
  PILOT_STEPS,
  PRICING_CARDS,
  PRICING_NOTE,
  SECURITY_FAQS,
  SERVICES,
  STACK_ALSO,
  STACK_PRIMARY,
  STATS,
  TRUST_BADGES,
  US_SITE_URL,
} from "@/lib/us-content";

/* ─────────────────────────────────────────────────────────────────────────────
   us.companyavenueadvisory.com — the US delivery-hub landing page.

   ── DESIGN SYSTEM ──────────────────────────────────────────────────────────
   This page runs its own visual language, not the India site's navy-and-gold:
   warm ink (#0A0D0C) and paper (#F6F5F1) with a single high-signal lime, tight
   display type and generous air. The buyer clicking through from a US search
   ad is also looking at Pilot, Bench and Botkeeper in adjacent tabs, and the
   page has to survive that comparison on first impression alone.

   Sections alternate ink → paper → ink so the eye gets a rhythm instead of one
   long scroll of white cards. Every section is short by construction: the copy
   budget is enforced in us-content.ts, not here.

   Server component throughout. The only client JS is the lead form; the
   accordion is native <details>, which costs nothing and stays crawlable.
───────────────────────────────────────────────────────────────────────────── */

const TITLE = "Offshore Accounting Pods for US CPA Firms & Businesses";
const DESCRIPTION =
  "Dedicated white-label accounting pods for US CPA firms, Enrolled Agents, fractional CFOs and growing businesses. QuickBooks Online, Xero, Bill.com and Gusto. $1,200/month 30-day pilot, no long-term contract.";

export const metadata: Metadata = {
  // Absolute title: the India title template lives in (main)/layout.tsx and no
  // longer reaches this route, but stating it plainly keeps that true if the
  // root layout ever regains one.
  title: { absolute: `${TITLE} | Avenue Advisory` },
  description: DESCRIPTION,
  keywords: [
    "outsourced accounting for CPA firms",
    "white label bookkeeping",
    "offshore accounting team",
    "QuickBooks Online outsourcing",
    "Xero bookkeeping services",
    "catch up bookkeeping",
    "multi-state tax preparation support",
    "dedicated offshore accountant",
  ],
  alternates: { canonical: US_SITE_URL },
  // NOTE: Next merges metadata shallowly — this object REPLACES any inherited
  // openGraph rather than extending it, so every field it needs is spelled out.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Avenue Advisory — US",
    title: TITLE,
    description: DESCRIPTION,
    url: US_SITE_URL,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

/* ── structured data ───────────────────────────────────────────────────────── */

/** Flattens an FAQ entry into the plain-text answer the schema needs, so the
 *  structured data can never say something different from the visible page. */
function faqAnswerText(faq: (typeof SECURITY_FAQS)[number]) {
  return [...faq.paragraphs, ...faq.bullets, faq.closing ?? ""]
    .filter(Boolean)
    .join(" ");
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SECURITY_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faqAnswerText(faq) },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dedicated Offshore Accounting Pods",
  serviceType: "Outsourced accounting and bookkeeping",
  provider: { "@type": "Organization", name: "Avenue Advisory", url: US_SITE_URL },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    name: "CPA firms, Enrolled Agents, fractional CFOs, and small and mid-sized businesses",
  },
  description: DESCRIPTION,
  offers: {
    "@type": "Offer",
    name: "30-day pilot",
    price: String(PILOT_FEE),
    priceCurrency: "USD",
    description:
      "Flat monthly pilot with no long-term contract. Continue on a retainer only if the delivered work stands up.",
  },
};

/* ── layout primitives ─────────────────────────────────────────────────────── */

/** One shared measure for every section. Narrower than the India container:
 *  short copy inside a 1280px shell reads as a half-empty page. */
function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1180px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

function Eyebrow({ children, onInk }: { children: React.ReactNode; onInk?: boolean }) {
  return (
    <p
      className={
        "font-heading text-[0.7rem] font-bold uppercase tracking-[0.2em] " +
        (onInk ? "text-us-lime" : "text-us-panel-accent")
      }
    >
      {children}
    </p>
  );
}

/** Display heading. `tracking-[-0.035em]` and a sub-1 line-height are what make
 *  Plus Jakarta read as a modern US SaaS wordmark rather than a brochure serif. */
function H2({ children, onInk }: { children: React.ReactNode; onInk?: boolean }) {
  return (
    <h2
      className={
        "mt-5 max-w-[19ch] font-heading text-[1.85rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[2.5rem] md:text-[2.9rem] " +
        (onInk ? "text-white" : "text-us-panel-fg")
      }
    >
      {children}
    </h2>
  );
}

function Lede({ children, onInk }: { children: React.ReactNode; onInk?: boolean }) {
  return (
    <p
      className={
        "mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed " +
        (onInk ? "text-us-chalk" : "text-us-panel-muted")
      }
    >
      {children}
    </p>
  );
}

function CtaPrimary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#call"
      className={
        "inline-flex items-center justify-center gap-2 rounded-full bg-us-lime px-7 py-3.5 font-heading text-[0.95rem] font-bold tracking-[-0.01em] text-us-ink transition-all hover:bg-white hover:shadow-[0_0_36px_-6px_rgba(205,255,90,0.5)] " +
        className
      }
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

/* ── page ──────────────────────────────────────────────────────────────────── */

export default function UsLandingPage() {
  const badges = TRUST_BADGES.filter((b) => !b.gated || CERTIFICATIONS_CONFIRMED);

  return (
    <>
      <JsonLd data={[faqSchema, serviceSchema]} />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-us-ink">
        {/* Ambient lime bloom behind the headline. Pure CSS, no image weight. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[110px]"
          style={{ background: "radial-gradient(circle, #CDFF5A 0%, transparent 68%)" }}
        />
        {/* Hairline grid — gives the dark field texture without a pattern file. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />

        <Shell className="relative pb-16 pt-16 sm:pt-20 lg:pb-24 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.72rem] font-medium text-us-chalk">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-us-lime" />
                US delivery division of Avenue Advisory
              </span>

              <h1 className="mt-7 font-heading text-[2.35rem] font-extrabold leading-[1.0] tracking-[-0.042em] text-white sm:text-[3.1rem] lg:text-[3.5rem]">
                The accounting team
                <br className="hidden sm:block" />{" "}
                <span className="text-us-lime">you couldn&apos;t hire.</span>
              </h1>

              <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-us-chalk">
                A named pod — QA Lead plus trained staff — working inside your QuickBooks,
                Xero, Bill.com and Gusto. Fully white-label. {PILOT_FEE_USD}/month to
                start, no long-term contract.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaPrimary>Book a 30-minute call</CtaPrimary>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-heading text-[0.95rem] font-semibold text-white/85 transition-colors hover:border-white/35 hover:text-white"
                >
                  See pricing
                </a>
              </div>

              <p className="mt-5 text-[0.85rem] text-white/40">
                No card. No pitch. We ask what is in your backlog.
              </p>
            </div>

            {/* Pod visual — shows the product instead of describing it. Roles,
                not invented names: nothing here is a claim a prospect could
                check and find false. */}
            <div className="relative">
              <div className="rounded-[1.75rem] border border-white/10 bg-us-ink-800 p-6 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/35">
                      Your pod
                    </p>
                    <p className="mt-1.5 font-heading text-lg font-bold tracking-[-0.02em] text-white">
                      Named on day one
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-us-lime/12 px-2.5 py-1 text-[0.68rem] font-semibold text-us-lime">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-us-lime" />
                    Active
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {[
                    { tag: "QA", role: "QA Lead", note: "Reviews every deliverable" },
                    { tag: "SA", role: "Senior Accountant", note: "Close and reconciliations" },
                    { tag: "AC", role: "Accountant", note: "AP / AR and payroll support" },
                  ].map((m) => (
                    <li
                      key={m.tag}
                      className="flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
                    >
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] font-heading text-[0.7rem] font-bold text-us-chalk"
                      >
                        {m.tag}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-[0.9rem] font-bold text-white">
                          {m.role}
                        </span>
                        <span className="block truncate text-[0.8rem] text-white/45">
                          {m.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl border border-us-lime/20 bg-us-lime/[0.07] px-4 py-3.5">
                  <p className="font-heading text-[0.64rem] font-bold uppercase tracking-[0.18em] text-us-lime">
                    Overnight cycle
                  </p>
                  <p className="mt-1.5 text-[0.88rem] text-white/85">
                    Flagged 5:10 PM ET → back by 8:00 AM ET
                  </p>
                </div>
              </div>

              <p className="mt-3 text-center text-[0.72rem] text-white/25">
                Illustrative. Pod size and roles are scoped to your volume.
              </p>
            </div>
          </div>
        </Shell>

        {/* Stat band */}
        <div className="relative border-t border-white/[0.07]">
          <Shell>
            <dl className="grid grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    "px-1 py-7 sm:px-6 " +
                    // On a 2-up phone grid the 3rd cell starts a new row and must
                    // lose the inherited left divider.
                    (i === 2 ? "border-l-0 sm:border-l " : "") +
                    (i % 2 === 0 ? "pr-4 sm:pr-6" : "pl-4 sm:pl-6")
                  }
                >
                  <dt className="font-heading text-[1.7rem] font-extrabold tracking-[-0.03em] text-white sm:text-[2rem]">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.8rem] leading-snug text-white/40">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Shell>
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-white/[0.07]">
          <Shell className="py-5">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-2 text-[0.74rem] font-medium text-white/40"
                >
                  <span aria-hidden className="text-us-lime">✓</span>
                  {b.label}
                </li>
              ))}
            </ul>
          </Shell>
        </div>
      </section>

      {/* ── 2. THE STACK ────────────────────────────────────────────────── */}
      <section className="border-b border-us-panel-line bg-us-panel py-12 sm:py-14">
        <Shell>
          <p className="text-center font-heading text-[0.7rem] font-bold uppercase tracking-[0.2em] text-us-panel-muted/60">
            Your pod already works in your stack
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 sm:gap-x-14">
            {STACK_PRIMARY.map((s) => (
              <span
                key={s}
                className="font-heading text-[1.15rem] font-extrabold tracking-[-0.03em] text-us-panel-fg sm:text-[1.4rem]"
              >
                {s}
              </span>
            ))}
          </div>
        </Shell>

        {/* Everything else, scrolling. Faded at both edges so it reads as a
            continuous ribbon rather than a list that got cut off. */}
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {/* No gap on the track itself: the keyframe translates exactly -50%, so
              the two halves must be identical widths. An outer gap would sit
              half-inside each half and make the loop jump 6px every cycle. */}
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
                {STACK_ALSO.map((t) => (
                  <li
                    key={t}
                    className="whitespace-nowrap rounded-full border border-us-panel-line bg-us-panel-raised px-4 py-2 text-[0.85rem] text-us-panel-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AUDIENCE ─────────────────────────────────────────────────── */}
      <section className="bg-us-panel py-20 sm:py-24">
        <Shell>
          <Eyebrow>Who it is for</Eyebrow>
          <H2>Built for four kinds of overloaded.</H2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-us-panel-line bg-us-panel-line sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <div key={a.title} className="group bg-us-panel-raised p-7 transition-colors hover:bg-us-panel-accent/[0.08]">
                <span className="font-heading text-[0.7rem] font-bold tracking-[0.14em] text-us-panel-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-heading text-[1.05rem] font-extrabold tracking-[-0.02em] text-us-panel-fg">
                  {a.title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-us-panel-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 4. THE POD MODEL ────────────────────────────────────────────── */}
      <section id="pod" className="scroll-mt-16 bg-us-ink py-20 sm:py-24">
        <Shell>
          <Eyebrow onInk>Why outsourcing failed you last time</Eyebrow>
          <H2 onInk>You didn&apos;t get a team. You got a queue.</H2>
          <Lede onInk>
            A staffing pool rotates whoever is free onto your files. A pod is a fixed,
            named group assigned to you and nobody else — so what they learn about your
            firm compounds instead of walking out the door.
          </Lede>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {/* Losing column */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 sm:p-8">
              <p className="font-heading text-[1.05rem] font-extrabold tracking-[-0.02em] text-white/45">
                Traditional BPO
              </p>
              <ul className="mt-6 space-y-4">
                {BPO_VS_POD.map((row) => (
                  <li key={row.dimension}>
                    <p className="font-heading text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/25">
                      {row.dimension}
                    </p>
                    <p className="mt-1 flex items-start gap-2.5 text-[0.92rem] text-white/45">
                      <span aria-hidden className="mt-px shrink-0 text-white/20">✕</span>
                      {row.bpo}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Winning column */}
            <div className="relative rounded-3xl border border-us-lime/25 bg-us-lime/[0.05] p-7 shadow-[0_0_64px_-28px_rgba(205,255,90,0.45)] sm:p-8">
              <p className="font-heading text-[1.05rem] font-extrabold tracking-[-0.02em] text-us-lime">
                An Avenue Advisory pod
              </p>
              <ul className="mt-6 space-y-4">
                {BPO_VS_POD.map((row) => (
                  <li key={row.dimension}>
                    <p className="font-heading text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/30">
                      {row.dimension}
                    </p>
                    <p className="mt-1 flex items-start gap-2.5 text-[0.92rem] font-medium text-white">
                      <span aria-hidden className="mt-px shrink-0 text-us-lime">✓</span>
                      {row.pod}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-9 max-w-[58ch] text-[0.95rem] leading-relaxed text-white/45">
            The same names in month eleven as in month one — and they work your hours, so
            the timezone that used to be a communication problem is the reason your
            turnaround is overnight.
          </p>
        </Shell>
      </section>

      {/* ── 5. SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="scroll-mt-16 bg-us-panel py-20 sm:py-24">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>What your pod does</Eyebrow>
              <H2>Six things, delivered review-ready.</H2>
            </div>
            <p className="max-w-[26ch] text-[0.9rem] leading-relaxed text-us-panel-muted">
              Not on the list? Bring it to the call — pods are scoped to the work, not to
              a plan tier.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={s.name} className="border-t-2 border-us-panel-fg pt-5">
                <span className="font-heading text-[0.7rem] font-bold tracking-[0.14em] text-us-panel-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-[1.08rem] font-extrabold tracking-[-0.02em] text-us-panel-fg">
                  {s.name}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-us-panel-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 6. PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-16 bg-us-ink py-20 sm:py-24">
        <Shell>
          <Eyebrow onInk>Radical transparency</Eyebrow>
          <H2 onInk>What everyone charges. Including us.</H2>
          <Lede onInk>
            Most firms in this category make you sit through a discovery call to learn a
            number. We think that is a tell.
          </Lede>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRICING_CARDS.map((c) => (
              <div
                key={c.key}
                className={
                  "flex flex-col rounded-3xl p-7 sm:p-8 " +
                  (c.highlight
                    ? "bg-us-lime text-us-ink shadow-[0_0_80px_-30px_rgba(205,255,90,0.7)] lg:-my-3 lg:py-11"
                    : "border border-white/[0.07] bg-white/[0.02]")
                }
              >
                <p
                  className={
                    "font-heading text-[1.05rem] font-extrabold tracking-[-0.02em] " +
                    (c.highlight ? "text-us-ink" : "text-white/70")
                  }
                >
                  {c.label}
                </p>
                <p
                  className={
                    "mt-1 text-[0.82rem] " + (c.highlight ? "text-us-ink/60" : "text-white/35")
                  }
                >
                  {c.sub}
                </p>

                <p
                  className={
                    "mt-7 font-heading text-[2.2rem] font-extrabold leading-none tracking-[-0.04em] " +
                    (c.highlight ? "text-us-ink" : "text-white/70")
                  }
                >
                  {c.price}
                </p>
                <p
                  className={
                    "mt-2 text-[0.8rem] " + (c.highlight ? "text-us-ink/60" : "text-white/35")
                  }
                >
                  {c.unit}
                </p>

                <ul
                  className={
                    "mt-7 space-y-3 border-t pt-7 " +
                    (c.highlight ? "border-us-ink/12" : "border-white/[0.07]")
                  }
                >
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed">
                      <span
                        aria-hidden
                        className={
                          "mt-px shrink-0 " + (c.highlight ? "text-us-ink/45" : "text-white/20")
                        }
                      >
                        {c.highlight ? "✓" : "—"}
                      </span>
                      <span className={c.highlight ? "text-us-ink/85" : "text-white/45"}>{p}</span>
                    </li>
                  ))}
                </ul>

                {c.highlight && (
                  <a
                    href="#call"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-us-ink px-6 py-3.5 font-heading text-[0.92rem] font-bold text-us-lime transition-colors hover:bg-us-ink-800"
                  >
                    Start a 30-day pilot
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className="mt-9 max-w-[70ch] text-[0.78rem] leading-relaxed text-white/30">
            {PRICING_NOTE}
          </p>
        </Shell>
      </section>

      {/* ── 7. THE PILOT ────────────────────────────────────────────────── */}
      <section className="bg-us-panel py-20 sm:py-24">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>The 30-day pilot</Eyebrow>
              <H2>Give us the file you have been avoiding.</H2>
              <Lede>
                Not the tidy account you would hand a new hire. The messiest backlog on
                your desk — thirty days, {PILOT_FEE_USD} flat. If the work does not stand
                up, you do not sign a retainer and you keep every file and workpaper we
                produced.
              </Lede>

              <CtaPrimary className="mt-8">Start a 30-day pilot</CtaPrimary>
            </div>

            <ol className="relative space-y-8 border-l border-us-panel-line pl-8 lg:pt-3">
              {PILOT_STEPS.map((step) => (
                <li key={step.day} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.28rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-us-panel-accent bg-us-panel"
                  />
                  <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.18em] text-us-panel-accent">
                    {step.day}
                  </p>
                  <h3 className="mt-2 font-heading text-[1.05rem] font-extrabold tracking-[-0.02em] text-us-panel-fg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-[0.9rem] leading-relaxed text-us-panel-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </section>

      {/* ── 8. SECURITY ─────────────────────────────────────────────────── */}
      <section id="security" className="scroll-mt-16 border-t border-us-panel-line bg-us-panel-raised py-20 sm:py-24">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Security &amp; compliance</Eyebrow>
              <H2>The questions your carrier would ask.</H2>
              <p className="mt-5 text-[0.9rem] leading-relaxed text-us-panel-muted">
                Send us your vendor-security questionnaire before the call. We would
                rather answer it in writing, in advance, than talk around it.
              </p>
            </div>

            <div className="divide-y divide-us-panel-line border-y border-us-panel-line">
              {SECURITY_FAQS.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <h3 className="font-heading text-[1rem] font-bold tracking-[-0.015em] text-us-panel-fg">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-lg leading-none text-us-panel-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="mt-4 space-y-3.5 pr-8 text-[0.88rem] leading-relaxed text-us-panel-muted">
                    {faq.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}

                    {faq.bullets.length > 0 && (
                      <ul className="space-y-2.5">
                        {faq.bullets.map((b) => (
                          <li key={b.slice(0, 40)} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-us-panel-accent"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {faq.closing && <p className="text-us-panel-fg">{faq.closing}</p>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* ── 9. CLOSE + FORM ─────────────────────────────────────────────── */}
      <section id="call" className="relative scroll-mt-16 overflow-hidden bg-us-ink py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.13] blur-[110px]"
          style={{ background: "radial-gradient(circle, #CDFF5A 0%, transparent 68%)" }}
        />

        <Shell className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow onInk>Next step</Eyebrow>
              <H2 onInk>Thirty minutes. No deck, no pitch.</H2>
              <Lede onInk>
                We look at what is actually on your desk, scope a pod, and put the number
                in writing the same day.
              </Lede>

              <ul className="mt-9 space-y-3.5">
                {[
                  `${FIRM_YEARS} years running accounting execution`,
                  "Your pod named before onboarding starts",
                  "Security questionnaire answered before you sign",
                  "No long-term contract to begin",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.95rem] text-white/70">
                    <span aria-hidden className="mt-px shrink-0 text-us-lime">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <UsLeadForm />
          </div>
        </Shell>
      </section>
    </>
  );
}
