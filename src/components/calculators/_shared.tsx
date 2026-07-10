"use client";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

export function Field({
  label,
  suffix,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; suffix?: string; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-heading font-semibold text-dark mb-2">{label}</label>
      <div className="relative">
        <input
          {...props}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-base transition-all"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted font-heading font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-muted mt-1.5">{hint}</p>}
    </div>
  );
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-heading font-semibold text-dark">{label}</label>
        <span className="text-sm font-heading font-bold text-primary">
          {value.toLocaleString("en-IN")}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary h-1.5 cursor-pointer"
      />
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  cols = 2,
}: {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  options: { key: T; label: string; desc?: string }[];
  cols?: number;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-heading font-semibold text-dark mb-2">{label}</label>}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`py-2.5 px-3 rounded-xl text-sm font-heading font-semibold transition-all text-left ${
              value === o.key
                ? "bg-primary text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-primary/8 hover:text-primary border border-slate-200"
            }`}
          >
            {o.label}
            {o.desc && (
              <span className={`block text-[10px] font-body font-normal mt-0.5 ${value === o.key ? "text-white/70" : "text-muted"}`}>
                {o.desc}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 font-body">{label}</span>
      <span className={`text-sm font-heading font-semibold ${accent ? "text-accent" : "text-dark"}`}>{value}</span>
    </div>
  );
}

export function HeroResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-primary rounded-xl px-4 py-3.5 flex items-center justify-between">
      <span className="text-white/80 text-sm font-heading font-semibold">{label}</span>
      <span className="text-white font-heading font-bold text-xl">{value}</span>
    </div>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 bg-accent/6 rounded-xl border border-accent/10">
      <Info size={13} className="text-accent shrink-0 mt-0.5" />
      <p className="text-xs text-slate-600">{children}</p>
    </div>
  );
}

export function CTALink({ label, href = "/contact" }: { label: string; href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
    >
      <span className="text-sm font-heading font-semibold text-primary">{label}</span>
      <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

// Donut chart showing principal vs returns/interest split
export function SplitDonut({
  invested,
  gains,
  investedLabel = "Invested",
  gainsLabel = "Returns",
}: {
  invested: number;
  gains: number;
  investedLabel?: string;
  gainsLabel?: string;
}) {
  const total = invested + gains || 1;
  const gainsPct = (gains / total) * 100;
  const r = 54;
  const c = 2 * Math.PI * r;
  const gainsDash = (gainsPct / 100) * c;
  return (
    <div className="flex items-center gap-5">
      <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="18" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="18"
          strokeDasharray={`${gainsDash} ${c - gainsDash}`}
          strokeDashoffset={c / 4}
          transform="rotate(-90 70 70)"
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" />
          <span className="text-xs text-muted">{investedLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-accent inline-block" />
          <span className="text-xs text-muted">{gainsLabel}</span>
        </div>
      </div>
    </div>
  );
}
