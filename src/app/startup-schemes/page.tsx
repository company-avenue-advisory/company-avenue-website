import type { Metadata } from "next";
import Link from "next/link";
import {
  Gift,
  TrendingUp,
  Landmark,
  FlaskConical,
  ShieldCheck,
  Store,
  FileSearch,
  Calculator,
  CalendarCheck,
  ArrowRight,
  ExternalLink,
  Building2,
  MapPin,
  Lightbulb,
  Rocket,
  Sprout,
  Target,
  Award,
  Phone,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, canonical, breadcrumbSchema, faqSchema, serviceSchema, OG_IMAGE } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import {
  SCHEMES,
  NEED_INDEX,
  LIFECYCLE_MAP,
  CAA_PROCESS,
  CAA_DIFFERENTIATORS,
  PSU_INITIATIVES,
  STATE_PORTALS,
  SCHEME_FAQS,
  schemeStats,
  schemesBySlugs,
  DECISION_TREE,
  toSummary,
} from "@/lib/schemes";
import { SchemePill } from "@/components/schemes/scheme-ui";
import { SchemeFinder } from "./SchemeFinder";
import { SchemeDirectory } from "./SchemeDirectory";

const stats = schemeStats();

// Project the catalogue down to card shape before it crosses into the client
// bundle — the directory and finder never need the one-pager prose.
const SCHEME_SUMMARIES = SCHEMES.map(toSummary);

export const metadata: Metadata = {
  title: "Government Startup Schemes & Grants in India — Complete 2026 Directory",
  description:
    `All ${stats.total} Central Government schemes, grants and funding programmes for Indian startups in one place — SISFS, CGSS, BIG, iDEX, PRAYAS, MUDRA, CGTMSE, Startup India Seed Fund and more. Eligibility, how to apply, timelines and CA-led application support from Company Avenue Advisory.`,
  keywords: [
    "government schemes for startups india",
    "startup india seed fund scheme apply",
    "government grants for startups india",
    "sisfs application process",
    "credit guarantee scheme for startups",
    "dpiit startup schemes list",
    "biotechnology ignition grant big",
    "idex defence startup grant",
    "mudra loan for startups",
    "startup funding schemes 2026",
  ],
  alternates: canonical("/startup-schemes"),
  openGraph: {
    title: "Government Startup Schemes & Grants in India — Complete Directory",
    description: `${stats.total} Central Government funding schemes for Indian startups: eligibility, application process and expert support.`,
    type: "website",
    url: `${SITE_URL}/startup-schemes`,
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

const NEED_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Gift,
  TrendingUp,
  Landmark,
  FlaskConical,
  ShieldCheck,
  Store,
};

const DIFF_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileSearch,
  Calculator,
  Landmark,
  CalendarCheck,
};

const STAGE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Ideation: Lightbulb,
  "Prototype / PoC": Target,
  "Seed / Early Stage": Sprout,
  "Growth / Scaling": Rocket,
  "Market Access & IP": Award,
};

const HERO_STATS = [
  { value: `${stats.total}`, label: "Central schemes mapped" },
  { value: `${stats.ministries}+`, label: "Ministries & departments" },
  { value: `${stats.grants}`, label: "Pure grant windows" },
  { value: "₹20L–₹25Cr", label: "Typical cheque range" },
];

export default function StartupSchemesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Government Startup Scheme & Grant Advisory",
            description:
              "CA-led advisory for Indian startups applying to Central Government funding schemes — eligibility screening, DPIIT recognition, application drafting, CA-certified projections, filing and post-sanction compliance.",
            path: "/startup-schemes",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Startup Schemes", path: "/startup-schemes" },
          ]),
          faqSchema(SCHEME_FAQS.map((f) => ({ question: f.q, answer: f.a }))),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Government Schemes and Initiatives for Indian Startups",
            description:
              "Directory of Central Government schemes, grants, credit guarantees and incubation programmes available to Indian startups.",
            numberOfItems: SCHEMES.length,
            itemListElement: SCHEMES.slice(0, 30).map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${SITE_URL}/startup-schemes/${s.slug}`,
            })),
          },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/[0.06] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-white/60 text-xs font-heading font-medium tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Updated against the DPIIT Playbook, June 2026
            </span>

            <h1 className="font-heading font-bold text-[2rem] sm:text-4xl md:text-5xl text-white leading-[1.12] mb-5">
              The government has money for your startup.
              <span className="text-accent"> Most founders never claim it.</span>
            </h1>

            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {stats.total} Central Government schemes — {stats.grants} of them non-dilutive
              grants — run across {stats.ministries}+ ministries, each with its own window,
              format and evaluation committee. This is the complete map, with the eligibility
              traps and the application process for every one.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href="#scheme-finder"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white font-heading font-bold text-sm rounded-xl transition-colors"
              >
                Find My Scheme <ArrowRight size={15} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/15 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/8 transition-colors"
              >
                <CalendarCheck size={15} /> Free Eligibility Screen
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-4 sm:px-5 sm:py-5"
              >
                <p className="font-heading font-bold text-accent text-xl sm:text-2xl leading-none mb-1.5">
                  {s.value}
                </p>
                <p className="text-white/45 text-xs leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reality check ────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-1">
              <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
                Read this first
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark leading-tight">
                Why good startups lose these applications
              </h2>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-5">
              {[
                {
                  n: "01",
                  t: "A structural breach nobody checked",
                  d: "SISFS caps prior government funding at ₹10 lakh. SPARSH needs an entity under 3 years old. TDF requires 50% Indian ownership. These are not judgment calls — they are automatic rejections, and they are all knowable on day one.",
                },
                {
                  n: "02",
                  t: "An innovation note that fits any company",
                  d: "Committees read hundreds of applications. A note that could describe any startup in your sector scores nothing. Specificity — what exactly is novel, versus what exactly exists today — is the whole game.",
                },
                {
                  n: "03",
                  t: "Numbers with nothing behind them",
                  d: "Projections showing ₹100 crore in year three, with no workpaper for any assumption, destroy credibility faster than modest numbers ever would. Evaluators test the assumptions, not the total.",
                },
              ].map((item) => (
                <div key={item.n} className="relative">
                  <span className="font-heading font-bold text-accent/25 text-3xl leading-none block mb-2">
                    {item.n}
                  </span>
                  <h3 className="font-heading font-bold text-dark text-[15px] leading-snug mb-2">
                    {item.t}
                  </h3>
                  <p className="text-muted text-[13px] leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scheme Finder ────────────────────────────────────────────────── */}
      <section id="scheme-finder" className="py-16 bg-background scroll-mt-20">
        <div className="container-custom">
          <SchemeFinder questions={DECISION_TREE} schemes={SCHEME_SUMMARIES} />
        </div>
      </section>

      {/* ── What do you need? ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Need-based index
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              Start from what you actually need
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Six kinds of support exist. Knowing which one you need eliminates roughly eighty
              percent of the directory in a single step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {NEED_INDEX.map((row) => {
              const Icon = NEED_ICONS[row.icon] ?? Gift;
              const specific = schemesBySlugs(row.specific);
              const relevant = schemesBySlugs(row.relevant);
              return (
                <div
                  key={row.need}
                  className="bg-background border border-slate-100 rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-dark text-base leading-snug">
                        {row.need}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-5">{row.blurb}</p>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest mb-2">
                        Startup-specific
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {specific.map((s) => (
                          <SchemePill key={s.slug} scheme={s} />
                        ))}
                      </div>
                    </div>
                    {relevant.length > 0 && (
                      <div>
                        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-2">
                          Also open to startups
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {relevant.map((s) => (
                            <SchemePill key={s.slug} scheme={s} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lifecycle map ────────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Lifecycle map
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              The right scheme for where you are today
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Applying a stage too early is the most common self-inflicted rejection. Each rung
              is designed to make the next one winnable.
            </p>
          </div>

          <div className="space-y-4">
            {LIFECYCLE_MAP.map((row, i) => {
              const Icon = STAGE_ICONS[row.stage] ?? Lightbulb;
              const list = schemesBySlugs(row.schemes);
              return (
                <div
                  key={row.stage}
                  className="bg-white border border-slate-100 shadow-card rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row gap-5"
                >
                  <div className="lg:w-64 shrink-0 flex items-start gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 font-heading font-bold">
                      <Icon size={19} />
                    </span>
                    <div>
                      <p className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest mb-0.5">
                        Stage {i + 1}
                      </p>
                      <h3 className="font-heading font-bold text-dark text-[15px] leading-snug">
                        {row.label}
                      </h3>
                      <p className="text-muted text-xs leading-relaxed mt-1">{row.description}</p>
                    </div>
                  </div>
                  <div className="flex-1 lg:border-l lg:border-slate-100 lg:pl-6">
                    <div className="flex flex-wrap gap-1.5">
                      {list.map((s) => (
                        <SchemePill key={s.slug} scheme={s} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Directory ────────────────────────────────────────────────────── */}
      <section id="directory" className="py-16 bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-2xl mb-10">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              The full directory
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              All {stats.total} schemes, searchable
            </h2>
            <p className="text-muted text-base leading-relaxed">
              {stats.startupSpecific} name startups as the primary beneficiary. The remaining{" "}
              {stats.total - stats.startupSpecific} have broader eligibility — MSMEs, companies,
              institutions — but startups access them routinely, and several are far easier to
              win than the headline programmes.
            </p>
          </div>
          <SchemeDirectory schemes={SCHEME_SUMMARIES} />
        </div>
      </section>

      {/* ── How CAA helps ────────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              How we work
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              From eligibility screen to money in the bank
            </h2>
            <p className="text-muted text-base leading-relaxed">
              We are a Chartered Accountancy firm, not a lead-generation shop. That shapes how we
              run a scheme mandate — and it is why we turn some of them down.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {CAA_PROCESS.map((step) => (
              <div
                key={step.step}
                className="bg-white border border-slate-100 shadow-card rounded-2xl p-6"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/8 text-primary font-heading font-bold text-sm mb-4">
                  {step.step}
                </span>
                <h3 className="font-heading font-bold text-dark text-[15px] leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAA_DIFFERENTIATORS.map((d) => {
              const Icon = DIFF_ICONS[d.icon] ?? FileSearch;
              return (
                <div key={d.title} className="bg-white border border-slate-100 rounded-2xl p-5">
                  <span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent mb-4">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-heading font-bold text-dark text-sm leading-snug mb-1.5">
                    {d.title}
                  </h3>
                  <p className="text-muted text-[13px] leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Funding services strip */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-dark to-primary-900 p-7 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="lg:flex-1">
                <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
                  The services behind an application
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight mb-4">
                  Everything a scheme committee asks for
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-lg">
                  DPIIT recognition, Udyam, trademarks, CA-certified project reports and the
                  scheme application itself — priced fixed, in writing, before we start.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing#startup-services"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
                  >
                    See Startup Service Pricing <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    data-track="call"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 text-white text-sm font-heading font-semibold rounded-xl hover:bg-white/8 transition-colors"
                  >
                    <Phone size={14} /> {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="lg:w-[26rem] shrink-0 grid sm:grid-cols-2 gap-2.5">
                {[
                  { label: "DPIIT Recognition", href: "/services/startup-india", price: "from ₹4,999" },
                  { label: "Udyam / MSME Registration", href: "/services/msme-registration", price: "₹999" },
                  { label: "Govt Scheme & Seed Fund Advisory", href: "/pricing#startup-services", price: "from ₹24,999" },
                  { label: "Trademark Filing", href: "/services/trademark-registration", price: "₹2,999/class" },
                  { label: "CA-Certified DPR & CMA Data", href: "/contact", price: "on quote" },
                  { label: "Pitch Deck & Financial Model", href: "/contact", price: "on quote" },
                ].map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="group bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-accent/40 rounded-xl px-4 py-3 transition-all"
                  >
                    <p className="font-heading font-semibold text-white text-[13px] leading-snug">
                      {s.label}
                    </p>
                    <p className="text-accent text-[11px] font-heading font-medium mt-0.5">
                      {s.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PSU & State initiatives ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-10">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Beyond the central schemes
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              PSU funds, regulator sandboxes and state policies
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Public sector undertakings run their own startup funds, four regulators operate
              sandboxes, and every state has its own policy with its own subsidies. These are
              consistently the least crowded windows in the country.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-background border border-slate-100 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-8 h-8 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Building2 size={15} />
                </span>
                <h3 className="font-heading font-bold text-dark text-base">
                  PSU funds & regulator sandboxes
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1">
                {PSU_INITIATIVES.map((p) => (
                  <a
                    key={p.org}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-2 py-1.5 border-b border-slate-100 last:border-0"
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] font-heading font-semibold text-dark group-hover:text-primary transition-colors truncate">
                        {p.org}
                      </span>
                      <span className="block text-[11px] text-muted truncate">{p.initiative}</span>
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-slate-300 group-hover:text-accent transition-colors shrink-0"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-background border border-slate-100 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={15} />
                </span>
                <h3 className="font-heading font-bold text-dark text-base">
                  State &amp; UT startup portals
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STATE_PORTALS.map((s) => (
                  <a
                    key={s.state}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-heading font-medium text-slate-600 bg-white border border-slate-200 hover:border-primary hover:text-primary px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    {s.state}
                    <ExternalLink size={9} className="opacity-50" />
                  </a>
                ))}
              </div>
              <p className="text-muted text-xs leading-relaxed mt-5">
                Most state policies stack on top of central schemes — a Delhi or Haryana subsidy
                does not disqualify you from SISFS, but it does count towards the ₹10 lakh
                prior-funding cap. Sequencing matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Straight answers
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight">
              What founders actually ask us
            </h2>
          </div>

          <div className="space-y-3">
            {SCHEME_FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-white border border-slate-100 shadow-card rounded-2xl overflow-hidden"
              >
                <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none">
                  <h3 className="font-heading font-semibold text-dark text-[15px] leading-snug">
                    {f.q}
                  </h3>
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-primary/8 text-primary flex items-center justify-center transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none font-light">+</span>
                  </span>
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-muted text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-100 shadow-card text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Note:</strong> This directory is compiled on a
              best-effort basis from the DPIIT Playbook of Government Schemes and Initiatives for
              Startups (June 2026) and the official portals cited on each scheme page. Schemes
              open and close through calls, notifications and time-bound cycles, and amounts and
              eligibility change without notice. Always confirm on the linked government portal
              before applying, and treat nothing here as a guarantee of sanction.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
