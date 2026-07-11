"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search, Loader2, AlertCircle, AlertTriangle, CheckCircle2, XCircle,
  ChevronDown, MapPin, Calendar, BadgeCheck, ArrowRight,
  Sparkles, ExternalLink,
} from "lucide-react";

interface Director {
  name: string;
  designation: string;
}

interface CompanyRecord {
  corporate_identification_number: string;
  date_of_registration: string;
  company_name: string;
  company_status: string;
  registered_state: string;
  registrar_of_companies: string;
  directors: Director[] | null;
}

interface SearchResult {
  query: string;
  checkedVariants: string[];
  available: boolean;
  matches: CompanyRecord[];
  datasetUpdatedDate: string | null;
  combinations: {
    taken: { name: string; records: CompanyRecord[] }[];
    available: string[];
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* Entity badge derived from the legal suffix in a company name. */
function entityBadge(name: string): { label: string; cls: string } {
  const n = name.toUpperCase();
  if (n.includes("OPC")) return { label: "OPC", cls: "bg-purple-100 text-purple-700" };
  if (n.endsWith("LLP") || n.includes(" LLP")) return { label: "LLP", cls: "bg-teal-100 text-teal-700" };
  if (n.includes("PRIVATE LIMITED")) return { label: "Pvt Ltd", cls: "bg-blue-100 text-blue-700" };
  if (n.includes("LIMITED")) return { label: "Ltd", cls: "bg-indigo-100 text-indigo-700" };
  return { label: "Company", cls: "bg-slate-100 text-slate-600" };
}

/* A likelihood-to-clear score derived from what the search actually found. */
function computeScore(r: SearchResult) {
  if (r.matches.length > 0) {
    const score = Math.max(8, 28 - (r.matches.length - 1) * 6);
    return { score, tone: "red" as const };
  }
  const takenCombos = r.combinations.taken.length;
  if (takenCombos === 0) return { score: 97, tone: "green" as const };
  return { score: Math.max(62, 94 - takenCombos * 6), tone: "amber" as const };
}

const STATUS_TONE: Record<string, string> = {
  green: "text-emerald-600",
  amber: "text-amber-500",
  red: "text-rose-500",
};

function ScoreRing({ score, tone }: { score: number; tone: "green" | "amber" | "red" }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const stroke = tone === "green" ? "#10b981" : tone === "amber" ? "#f59e0b" : "#f43f5e";
  return (
    <div className="relative shrink-0" style={{ width: 88, height: 88 }}>
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e2e8f0" strokeWidth="7" />
        <circle
          cx="44" cy="44" r={r} fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-heading font-bold ${STATUS_TONE[tone]}`}>{score}%</span>
        <span className="text-[9px] font-heading font-semibold tracking-wide text-muted uppercase">
          {tone === "red" ? "Taken" : "Likely clear"}
        </span>
      </div>
    </div>
  );
}

function CompanyCard({ record }: { record: CompanyRecord }) {
  const [open, setOpen] = useState(false);
  const badge = entityBadge(record.company_name);
  const directorNames = record.directors?.map((d) => d.name).filter(Boolean) ?? [];
  const active = /ACTIVE/i.test(record.company_status);
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className={`shrink-0 text-[10px] font-heading font-bold px-2 py-1 rounded-md ${badge.cls}`}>
          {badge.label}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-heading font-semibold text-dark truncate">
            {record.company_name}
          </span>
          <span className="block text-[11px] text-muted font-mono truncate">
            {record.corporate_identification_number}
          </span>
        </span>
        <span className={`hidden sm:inline text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full ${active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
          {record.company_status}
        </span>
        <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={13} className="text-primary/60 shrink-0" />
            Incorporated {formatDate(record.date_of_registration)}
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={13} className="text-primary/60 shrink-0" />
            {record.registered_state}
            {record.registrar_of_companies && record.registrar_of_companies !== "NA" ? ` · ${record.registrar_of_companies}` : ""}
          </div>
          {directorNames.length > 0 && (
            <div className="sm:col-span-2 flex items-start gap-2 text-slate-600">
              <BadgeCheck size={13} className="text-primary/60 shrink-0 mt-0.5" />
              <span>Directors / signatories: {directorNames.join(", ")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const EXAMPLES = ["Zenith Traders", "Reliance", "Innovate Solutions", "TechNova"];

export function CompanyNameSearch() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);

  async function runSearch(query: string) {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/verify/company-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(name);
  }

  const datasetDateLabel = result?.datasetUpdatedDate ? formatDate(result.datasetUpdatedDate) : null;
  const takenRecords = result
    ? [
        ...result.matches,
        ...result.combinations.taken.flatMap((t) => t.records),
      ].filter((rec, i, arr) => arr.findIndex((x) => x.corporate_identification_number === rec.corporate_identification_number) === i)
    : [];
  const scoreData = result ? computeScore(result) : null;
  const isTaken = (result?.matches.length ?? 0) > 0;

  return (
    <div className="relative">
      {/* Search card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_10px_40px_-12px_rgba(15,45,82,0.18)] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-dark text-lg leading-tight">Company Name Availability Checker</h3>
            <p className="text-xs text-muted">Checks identical & suffix-variant names the way MCA&rsquo;s RUN process does</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type a name — e.g. Zenith Traders or Reliance Industries"
              className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading || name.trim().length < 3}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-heading font-semibold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm whitespace-nowrap"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Check Availability
          </button>
        </form>

        {/* Example chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setName(ex); runSearch(ex); }}
              className="px-3 py-1 rounded-full border border-slate-200 text-primary hover:bg-primary/5 hover:border-primary/30 font-medium transition"
            >
              {ex}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-5 flex items-start gap-2 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && !result && (
        <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-8 flex items-center justify-center gap-3 text-muted text-sm">
          <Loader2 size={18} className="animate-spin text-primary" />
          Searching MCA company master data…
        </div>
      )}

      {/* Results */}
      {result && scoreData && (
        <div className="mt-5 space-y-5">
          {/* Verdict banner with score */}
          <div className={`rounded-2xl border p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5 ${
            isTaken
              ? "bg-rose-50/70 border-rose-200"
              : scoreData.tone === "amber"
                ? "bg-amber-50/70 border-amber-200"
                : "bg-emerald-50/70 border-emerald-200"
          }`}>
            <ScoreRing score={scoreData.score} tone={scoreData.tone} />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {isTaken
                  ? <XCircle size={20} className="text-rose-500" />
                  : <CheckCircle2 size={20} className="text-emerald-500" />}
                <h3 className="font-heading font-bold text-lg text-dark">
                  {isTaken
                    ? "This exact name is already registered"
                    : scoreData.tone === "amber"
                      ? "Good news — this name looks largely available"
                      : "Excellent — no conflicts found"}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For <strong className="text-dark">&ldquo;{result.query}&rdquo;</strong>:{" "}
                {isTaken
                  ? `we found ${result.matches.length} exact or suffix-variant match${result.matches.length > 1 ? "es" : ""} on MCA. You'll need a different name or a distinctive variation.`
                  : result.combinations.taken.length > 0
                    ? `we found ${takenRecords.length} similar name${takenRecords.length > 1 ? "s" : ""} on MCA. Your chance of clearing RUN is strong — file soon before someone else reserves it.`
                    : "no identical or suffix-variant match was found in the MCA master data. Your chance of clearing RUN is strong."}
              </p>
            </div>
          </div>

          {/* Similar / taken names */}
          {takenRecords.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
              <h4 className="text-xs font-heading font-bold tracking-widest uppercase text-primary mb-4">
                Similar names already on MCA ({takenRecords.length})
              </h4>
              <div className="space-y-2.5">
                {takenRecords.map((rec) => (
                  <CompanyCard key={rec.corporate_identification_number} record={rec} />
                ))}
              </div>
            </div>
          )}

          {/* Available combinations */}
          {result.combinations.available.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
              <h4 className="text-xs font-heading font-bold tracking-widest uppercase text-emerald-600 mb-3 flex items-center gap-2">
                <Sparkles size={13} /> No record found for these variations
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.combinations.available.map((n) => (
                  <span key={n} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[12px] text-emerald-700 font-medium">
                    <CheckCircle2 size={12} className="shrink-0" /> {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Staleness notice */}
          {datasetDateLabel && (
            <div className="flex items-start gap-2 p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs leading-relaxed">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span>
                Our government data source was last refreshed on <strong>{datasetDateLabel}</strong>.
                A company registered after that date won&rsquo;t show up here — a &ldquo;no match&rdquo;
                is not proof the name is free. Always confirm on the official{" "}
                <a href="https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html" target="_blank" rel="noopener noreferrer" className="underline font-medium inline-flex items-center gap-0.5">
                  MCA name check <ExternalLink size={10} />
                </a>{" "}
                before filing.
              </span>
            </div>
          )}

          {/* Ready to reserve CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-900 p-6 md:p-7 text-white overflow-hidden relative">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
            <div className="relative">
              <h4 className="font-heading font-bold text-lg mb-1.5">
                {isTaken ? "Need help finding an approvable name?" : "Ready to reserve this name?"}
              </h4>
              <p className="text-white/60 text-sm mb-5 max-w-xl">
                Company Avenue files your RUN application and the full incorporation — DSC, DIN,
                MOA/AOA, PAN, TAN &amp; GST — end to end, with expert CAs &amp; CS.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/private-limited-company"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-primary-900 text-sm font-heading font-bold rounded-xl hover:bg-accent-light transition shadow-sm">
                  Start Registration <ArrowRight size={15} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/15 text-white text-sm font-heading font-semibold rounded-xl hover:bg-white/20 transition">
                  Talk to a CA
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted leading-relaxed px-1">
            This checks <strong className="text-slate-600">exact-name matches</strong> against the
            government&rsquo;s Company Master Data. It does not check phonetic similarity, trademark
            conflicts, or MCA&rsquo;s full name-approval rules (Rule 8, Companies Incorporation Rules).
          </p>
        </div>
      )}
    </div>
  );
}
