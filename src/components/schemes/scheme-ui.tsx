// Shared presentational pieces for the Startup Schemes section.
//
// Deliberately NOT a "use client" module: it holds no state and no effects, so
// it can be imported both by the server detail page and by the client-side
// directory without tripping the client/server data boundary.

import Link from "next/link";
import {
  Gift,
  TrendingUp,
  Landmark,
  FlaskConical,
  Store,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { SchemeSummary, SupportType } from "@/lib/schemes-taxonomy";

export const SUPPORT_ICON: Record<
  SupportType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Grant: Gift,
  Equity: TrendingUp,
  "Loan / Credit": Landmark,
  Incubation: FlaskConical,
  "Market Access": Store,
  Mixed: Layers,
};

/** Chip colours per support type — consistent across hub, cards and detail. */
export const SUPPORT_STYLE: Record<SupportType, string> = {
  Grant: "text-emerald-700 bg-emerald-50 border-emerald-100",
  Equity: "text-violet-700 bg-violet-50 border-violet-100",
  "Loan / Credit": "text-amber-700 bg-amber-50 border-amber-100",
  Incubation: "text-sky-700 bg-sky-50 border-sky-100",
  "Market Access": "text-rose-700 bg-rose-50 border-rose-100",
  Mixed: "text-slate-700 bg-slate-100 border-slate-200",
};

/** Same palette, tuned for the dark hero / dark panels. */
export const SUPPORT_STYLE_DARK: Record<SupportType, string> = {
  Grant: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  Equity: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  "Loan / Credit": "text-amber-300 bg-amber-400/10 border-amber-400/20",
  Incubation: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  "Market Access": "text-rose-300 bg-rose-400/10 border-rose-400/20",
  Mixed: "text-white/70 bg-white/10 border-white/15",
};

export function SupportChip({
  support,
  dark = false,
  size = "sm",
}: {
  support: SupportType;
  dark?: boolean;
  size?: "sm" | "xs";
}) {
  const Icon = SUPPORT_ICON[support];
  const style = dark ? SUPPORT_STYLE_DARK[support] : SUPPORT_STYLE[support];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border font-heading font-semibold whitespace-nowrap ${style} ${
        size === "xs" ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1"
      }`}
    >
      <Icon size={size === "xs" ? 10 : 12} />
      {support}
    </span>
  );
}

/** Directory / related-scheme card. */
export function SchemeCard({ scheme }: { scheme: SchemeSummary }) {
  return (
    <Link
      href={`/startup-schemes/${scheme.slug}`}
      className="group relative flex flex-col bg-white border border-slate-100 hover:border-primary/25 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <SupportChip support={scheme.support} />
        {scheme.focus === "Startup-Specific" && (
          <span className="inline-flex items-center gap-1 text-[10px] font-heading font-bold text-accent uppercase tracking-wider whitespace-nowrap">
            <Sparkles size={10} className="fill-accent" />
            Startup-only
          </span>
        )}
      </div>

      <h3 className="font-heading font-bold text-dark text-[15px] leading-snug group-hover:text-primary transition-colors mb-1.5">
        {scheme.abbr ? (
          <>
            {scheme.abbr}
            <span className="text-muted font-medium"> · {shortName(scheme)}</span>
          </>
        ) : (
          scheme.name
        )}
      </h3>

      <p className="text-muted text-[13px] leading-relaxed flex-1 mb-4">{scheme.headline}</p>

      <div className="pt-3.5 border-t border-slate-100">
        <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wide mb-0.5">
          What you get
        </p>
        <p className="text-[13px] font-heading font-bold text-primary leading-snug">{scheme.amount}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 truncate pr-2">{scheme.ministry}</span>
        <ArrowRight
          size={13}
          className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0"
        />
      </div>
    </Link>
  );
}

/** Compact inline reference used inside the need index and lifecycle map. */
export function SchemePill({ scheme }: { scheme: SchemeSummary }) {
  return (
    <Link
      href={`/startup-schemes/${scheme.slug}`}
      title={scheme.name}
      className="inline-flex items-center gap-1.5 text-[12px] font-heading font-medium text-slate-600 bg-white border border-slate-200 hover:border-primary hover:text-primary px-2.5 py-1.5 rounded-lg transition-colors"
    >
      {scheme.abbr ?? shortName(scheme)}
    </Link>
  );
}

/** Trims the marketing tail off long official scheme names for card display. */
export function shortName(scheme: SchemeSummary): string {
  return scheme.name.split(/\s+[–-]\s+/)[0];
}
