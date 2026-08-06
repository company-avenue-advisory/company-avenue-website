import Link from "next/link";
import {
  Target,
  UserCheck,
  Gift,
  FileText,
  ListChecks,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Building2,
  Clock,
  Layers,
  IndianRupee,
  CalendarCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import type { Scheme } from "@/lib/schemes-taxonomy";
import { COMPANY } from "@/lib/constants";
import { SupportChip, SUPPORT_ICON } from "./scheme-ui";

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-8 h-8 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </span>
      <h2 className="font-heading font-bold text-dark text-base">{title}</h2>
    </div>
  );
}

/**
 * Server-rendered scheme one-pager. Everything a founder needs to decide
 * whether to apply, how to apply, and where we come in.
 */
export function SchemeArticle({ scheme }: { scheme: Scheme }) {
  const SupportIcon = SUPPORT_ICON[scheme.support];

  const keyFacts = [
    { icon: <IndianRupee size={13} />, label: "What you get", value: scheme.amount },
    { icon: <Building2 size={13} />, label: "Nodal ministry", value: scheme.ministry },
    { icon: <Layers size={13} />, label: "Support type", value: scheme.support },
    { icon: <Target size={13} />, label: "Best suited for", value: scheme.stages.join(" · ") },
    ...(scheme.timeline
      ? [{ icon: <Clock size={13} />, label: "Typical timeline", value: scheme.timeline }]
      : []),
  ];

  return (
    <article>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="relative bg-gradient-to-br from-dark to-primary-900 pt-32 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-accent/[0.06] pointer-events-none" />

        <div className="container-custom max-w-4xl relative z-10">
          <Link
            href="/startup-schemes"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-heading font-semibold mb-6 transition-colors"
          >
            ← All Startup Schemes
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <SupportChip support={scheme.support} dark />
            {scheme.focus === "Startup-Specific" && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-lg">
                <Sparkles size={11} className="fill-accent" /> Startups named in eligibility
              </span>
            )}
            {scheme.sectors
              .filter((s) => s !== "Sector Agnostic")
              .slice(0, 2)
              .map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center text-[11px] font-heading font-medium text-white/60 bg-white/[0.07] border border-white/10 px-2.5 py-1 rounded-lg"
                >
                  {s}
                </span>
              ))}
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/10 border border-white/10 items-center justify-center text-accent shrink-0">
              <SupportIcon size={22} />
            </div>
            <div className="min-w-0">
              {scheme.abbr && (
                <span className="text-accent text-xs font-heading font-bold uppercase tracking-widest block mb-1">
                  {scheme.abbr}
                </span>
              )}
              <h1 className="font-heading font-bold text-2xl md:text-4xl text-white leading-[1.15]">
                {scheme.name}
              </h1>
            </div>
          </div>

          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            {scheme.headline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
            >
              <CalendarCheck size={15} /> Check My Eligibility — Free
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              data-track="call"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 text-white text-sm font-heading font-semibold rounded-xl hover:bg-white/8 transition-colors"
            >
              <Phone size={15} /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </header>

      <div className="py-12 bg-background">
        <div className="container-custom max-w-4xl">
          {/* ── Key facts ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {keyFacts.map((f) => (
              <div
                key={f.label}
                className="bg-white rounded-xl border border-slate-100 p-4 shadow-card"
              >
                <p className="flex items-center gap-1.5 text-[10px] font-heading font-semibold text-muted uppercase tracking-wide mb-1.5">
                  <span className="text-accent">{f.icon}</span>
                  {f.label}
                </p>
                <p className="text-[13px] font-heading font-bold text-dark leading-snug">
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── What is this ───────────────────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle icon={<SupportIcon size={15} />} title="What this scheme actually is" />
            <p className="text-slate-600 text-[15px] leading-relaxed">{scheme.whatIsThis}</p>
            {scheme.agency && (
              <p className="text-muted text-[13px] mt-3">
                <strong className="text-dark font-heading font-semibold">
                  Implementing agency:
                </strong>{" "}
                {scheme.agency}
              </p>
            )}
          </div>

          {/* ── Objectives ─────────────────────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle icon={<Target size={15} />} title="What the scheme sets out to do" />
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 space-y-2.5">
              {scheme.objectives.map((o, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[0.55rem]" />
                  <span className="text-sm text-slate-600 leading-relaxed">{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Eligibility + Benefits ─────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <div>
              <SectionTitle icon={<UserCheck size={15} />} title="Who can apply" />
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 space-y-3 h-[calc(100%-3rem)]">
                {scheme.eligibility.map((e, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-relaxed">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle icon={<Gift size={15} />} title="What you get" />
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 space-y-3 h-[calc(100%-3rem)]">
                {scheme.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Documents ──────────────────────────────────────────────── */}
          {scheme.documents && scheme.documents.length > 0 && (
            <div className="mb-10">
              <SectionTitle icon={<FileText size={15} />} title="Documents to have ready" />
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {scheme.documents.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FileText size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-snug">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── How to apply ───────────────────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle icon={<ListChecks size={15} />} title="How to apply, step by step" />
            <ol className="relative border-l-2 border-slate-200 ml-3 space-y-6">
              {scheme.howToApply.map((s, i) => (
                <li key={i} id={`step-${i + 1}`} className="relative pl-7 scroll-mt-24">
                  <span className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-primary text-white text-xs font-heading font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-heading font-semibold text-dark text-[15px] mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Watch-outs ─────────────────────────────────────────────── */}
          {scheme.watchOuts && scheme.watchOuts.length > 0 && (
            <div className="mb-10">
              <SectionTitle icon={<AlertTriangle size={15} />} title="Where applications go wrong" />
              <div className="space-y-2.5">
                {scheme.watchOuts.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-amber-50/70 border border-amber-100 rounded-xl p-4"
                  >
                    <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── How CAA helps ──────────────────────────────────────────── */}
          <div className="rounded-3xl bg-gradient-to-br from-dark to-primary-900 p-6 md:p-8 mb-10 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-accent/[0.07] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-accent text-[11px] font-heading font-bold uppercase tracking-widest mb-2 block">
                How Company Avenue Advisory helps
              </span>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-white leading-tight mb-5">
                What we actually do on a {scheme.abbr ?? "scheme"} mandate
              </h2>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
                {scheme.caaSupport.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-white/65 text-[13px] leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>

              {scheme.caaServices && scheme.caaServices.length > 0 && (
                <div className="mb-7">
                  <p className="text-white/35 text-[10px] font-heading font-bold uppercase tracking-widest mb-2.5">
                    Services this usually needs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.caaServices.map((s) => (
                      <Link
                        key={s.href + s.label}
                        href={s.href}
                        className="inline-flex items-center gap-1.5 text-[12px] font-heading font-medium text-white/75 bg-white/[0.07] border border-white/10 hover:border-accent/40 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {s.label}
                        <ArrowRight size={11} className="text-accent" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
                >
                  <CalendarCheck size={15} /> Book a Free Eligibility Screen
                </Link>
                <Link
                  href="/pricing#startup-services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 text-white text-sm font-heading font-semibold rounded-xl hover:bg-white/8 transition-colors"
                >
                  See Fixed Pricing <ArrowRight size={14} />
                </Link>
              </div>

              <p className="text-white/30 text-[11px] leading-relaxed mt-5">
                No consultant can guarantee a sanction — that decision sits with the evaluating
                committee, bank or incubator. We commit to an honest eligibility view, an
                application built to the evaluator&rsquo;s format, filing inside the window and a
                documented follow-up cadence. That is stated in every engagement letter we sign.
              </p>
            </div>
          </div>

          {/* ── Official sources ───────────────────────────────────────── */}
          <div>
            <SectionTitle icon={<ExternalLink size={15} />} title="Official sources" />
            <div className="flex flex-wrap gap-2">
              {scheme.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-primary bg-primary/5 border border-primary/10 hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors"
                >
                  {l.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
