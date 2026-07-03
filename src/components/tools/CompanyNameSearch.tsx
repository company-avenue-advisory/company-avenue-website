"use client";
import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, AlertCircle, Sparkles } from "lucide-react";

interface CompanyRecord {
  corporate_identification_number: string;
  date_of_registration: string;
  company_name: string;
  company_status: string;
  registered_state: string;
  registrar_of_companies: string;
}

interface SearchResult {
  query: string;
  checkedVariants: string[];
  available: boolean;
  matches: { variant: string; records: CompanyRecord[] }[];
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

export function CompanyNameSearch() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/verify/company-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Zenith Traders"
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || name.trim().length < 3}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Check Availability
        </button>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl ${result.available ? "bg-green-50" : "bg-amber-50"}`}>
            {result.available ? (
              <CheckCircle2 size={22} className="text-green-600 shrink-0" />
            ) : (
              <XCircle size={22} className="text-amber-600 shrink-0" />
            )}
            <div>
              <p className={`font-heading font-bold text-sm ${result.available ? "text-green-800" : "text-amber-800"}`}>
                {result.available
                  ? `The bare name "${result.query}" (with common suffixes) looks unregistered`
                  : `A matching registered company was found`}
              </p>
              <p className="text-xs text-muted mt-0.5">
                Checked: {result.checkedVariants.join(" · ")}
              </p>
            </div>
          </div>

          {result.matches.length > 0 && (
            <div className="mt-4 space-y-3">
              {result.matches.map((m) =>
                m.records.map((r) => (
                  <div key={r.corporate_identification_number} className="border border-slate-100 rounded-xl p-4">
                    <p className="font-heading font-bold text-dark text-sm">{r.company_name}</p>
                    <div className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted">
                      <span>CIN: <span className="text-dark font-medium">{r.corporate_identification_number}</span></span>
                      <span>Status: <span className="text-dark font-medium">{r.company_status}</span></span>
                      <span>State: <span className="text-dark font-medium">{r.registered_state}</span></span>
                      <span>Incorporated: <span className="text-dark font-medium">{formatDate(r.date_of_registration)}</span></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {(result.combinations.taken.length > 0 || result.combinations.available.length > 0) && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-primary" />
                <p className="font-heading font-bold text-dark text-sm">
                  Similar Name Combinations for &ldquo;{result.query}&rdquo;
                </p>
              </div>
              <p className="text-xs text-muted mb-4">
                A bare name being free doesn&rsquo;t mean every brandable combination is — we checked{" "}
                {result.combinations.taken.length + result.combinations.available.length} common combinations
                (Technologies, Ventures, Solutions, Infratech, and more) as Pvt Ltd and LLP.
              </p>

              {result.combinations.taken.length > 0 && (
                <div className="mb-4">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-amber-700 mb-2">
                    Already Registered ({result.combinations.taken.length})
                  </p>
                  <div className="space-y-2">
                    {result.combinations.taken.map((t) =>
                      t.records.map((r) => (
                        <div key={r.corporate_identification_number} className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs">
                          <span className="font-heading font-semibold text-dark">{r.company_name}</span>
                          <span className="text-muted shrink-0">{r.registered_state} · {formatDate(r.date_of_registration)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {result.combinations.available.length > 0 && (
                <div>
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-green-700 mb-2">
                    Looks Available ({result.combinations.available.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.combinations.available.map((n) => (
                      <span key={n} className="text-xs font-medium text-green-800 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-muted leading-relaxed">
            This checks <strong className="text-dark">exact-name matches</strong> against the
            government&rsquo;s Company Master Data across common legal suffixes (Pvt Ltd, Ltd, LLP, OPC)
            and common descriptive word combinations. It does not check phonetic similarity, trademark
            conflicts, or MCA&rsquo;s full name-approval rules (Rule 8, Companies Incorporation Rules) —
            always confirm with the official{" "}
            <a href="https://www.mca.gov.in/mcafoportal/checkCompanyName.do" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              MCA name check
            </a>{" "}
            before filing.
          </div>
        </div>
      )}
    </div>
  );
}
