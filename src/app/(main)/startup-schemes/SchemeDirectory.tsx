"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  SUPPORT_TYPES,
  STAGES,
  SECTORS,
  type SchemeSummary,
  type SupportType,
  type Stage,
  type Sector,
} from "@/lib/schemes-taxonomy";
import { SchemeCard } from "@/components/schemes/scheme-ui";

type FocusFilter = "All" | "Startup-Specific" | "Startup-Relevant";

const FOCUS_FILTERS: FocusFilter[] = ["All", "Startup-Specific", "Startup-Relevant"];

export function SchemeDirectory({ schemes }: { schemes: SchemeSummary[] }) {
  const [query, setQuery] = useState("");
  const [support, setSupport] = useState<SupportType | "All">("All");
  const [stage, setStage] = useState<Stage | "All">("All");
  const [sector, setSector] = useState<Sector | "All">("All");
  const [focus, setFocus] = useState<FocusFilter>("All");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return schemes.filter((s) => {
      if (support !== "All" && s.support !== support) return false;
      if (stage !== "All" && !s.stages.includes(stage)) return false;
      if (sector !== "All" && !s.sectors.includes(sector)) return false;
      if (focus !== "All" && s.focus !== focus) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.abbr?.toLowerCase().includes(q) ?? false) ||
        s.headline.toLowerCase().includes(q) ||
        s.ministry.toLowerCase().includes(q) ||
        s.sectors.some((x) => x.toLowerCase().includes(q)) ||
        s.amount.toLowerCase().includes(q)
      );
    });
  }, [schemes, query, support, stage, sector, focus]);

  const activeFilters =
    (support !== "All" ? 1 : 0) +
    (stage !== "All" ? 1 : 0) +
    (sector !== "All" ? 1 : 0) +
    (focus !== "All" ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setSupport("All");
    setStage("All");
    setSector("All");
    setFocus("All");
  };

  return (
    <div>
      {/* Primary controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${schemes.length} schemes — try 'grant', 'biotech', 'collateral-free', 'DPIIT'…`}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm text-dark placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            aria-label="Search government startup schemes"
          />
        </div>
        <button
          onClick={() => setShowAdvanced((v) => !v)}
          className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-heading font-semibold border transition-colors shrink-0 ${
            showAdvanced || activeFilters > 0
              ? "bg-primary text-white border-primary"
              : "bg-white text-muted border-slate-200 hover:border-primary hover:text-primary"
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilters > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-primary-900 text-[10px] font-bold">
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      {/* Support-type quick filter — always visible, it is the filter people want */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["All", ...SUPPORT_TYPES] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSupport(t as SupportType | "All")}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-heading font-medium transition-colors ${
              support === t
                ? "bg-primary text-white"
                : "bg-white border border-slate-200 text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {t === "All" ? "All support types" : t}
          </button>
        ))}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="bg-white border border-slate-100 shadow-card rounded-2xl p-5 mb-6 grid gap-5 sm:grid-cols-3">
          <FilterSelect
            label="Stage"
            value={stage}
            onChange={(v) => setStage(v as Stage | "All")}
            options={["All", ...STAGES]}
          />
          <FilterSelect
            label="Sector"
            value={sector}
            onChange={(v) => setSector(v as Sector | "All")}
            options={["All", ...SECTORS]}
          />
          <FilterSelect
            label="Who it is for"
            value={focus}
            onChange={(v) => setFocus(v as FocusFilter)}
            options={FOCUS_FILTERS}
          />
        </div>
      )}

      {/* Result count */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-muted text-sm">
          <strong className="text-dark font-heading font-semibold">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "scheme" : "schemes"}
          {activeFilters > 0 || query ? " match your filters" : " in the directory"}
        </p>
        {(activeFilters > 0 || query) && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-muted hover:text-primary transition-colors"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <SchemeCard key={s.slug} scheme={s} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 shadow-card rounded-2xl p-10 text-center">
          <p className="font-heading font-semibold text-dark mb-1.5">No scheme matches that</p>
          <p className="text-muted text-sm mb-5">
            Try a broader filter — or let a CA look at your case directly. Several windows are
            sector-specific and easy to miss from a keyword search.
          </p>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-1.5">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-background text-sm text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "All" ? `All ${label.toLowerCase()}` : o}
          </option>
        ))}
      </select>
    </label>
  );
}
