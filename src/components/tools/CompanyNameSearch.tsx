"use client";
import { useState } from "react";
import { Search, Loader2, AlertCircle, AlertTriangle } from "lucide-react";

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

function CompanyNarrative({ record }: { record: CompanyRecord }) {
  const directorNames = record.directors?.map((d) => d.name).filter(Boolean) ?? [];
  return (
    <p className="text-sm text-slate-700 leading-relaxed">
      <strong className="text-dark">{record.company_name}</strong> is registered with the
      Ministry of Corporate Affairs, CIN <strong className="text-dark">{record.corporate_identification_number}</strong>,
      incorporated on {formatDate(record.date_of_registration)} in {record.registered_state}
      {record.registrar_of_companies && record.registrar_of_companies !== "NA" ? ` (${record.registrar_of_companies})` : ""}.
      Its current status is <strong className="text-dark">{record.company_status}</strong>.
      {directorNames.length > 0 && (
        <> The registered directors/signatories on file are {directorNames.join(", ")}.</>
      )}
    </p>
  );
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

  const datasetDateLabel = result?.datasetUpdatedDate ? formatDate(result.datasetUpdatedDate) : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Zenith Traders, or a full legal name like Reliance Industries Limited"
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
        <div className="mt-6 space-y-5">
          {/* Staleness notice — always shown, never buried */}
          {datasetDateLabel && (
            <div className="flex items-start gap-2 p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs leading-relaxed">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              Our government data source was last refreshed on <strong>{datasetDateLabel}</strong>.
              A company registered after that date will not show up here even though it is real
              and active — a &ldquo;no match&rdquo; below is not proof the name is free. Always
              confirm on the official{" "}
              <a href="https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                MCA name check
              </a>{" "}
              before filing.
            </div>
          )}

          {/* Primary result — narrative */}
          <div>
            {result.matches.length > 0 ? (
              <div className="space-y-3">
                {result.matches.map((m) => (
                  <CompanyNarrative key={m.corporate_identification_number} record={m} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-700 leading-relaxed">
                We found <strong className="text-dark">no record</strong> of &ldquo;{result.query}&rdquo;
                — or its Private Limited, Limited, LLP, or OPC Private Limited variants — in our
                data as of the refresh date above.
              </p>
            )}
          </div>

          {/* Combinations — narrative */}
          {(result.combinations.taken.length > 0 || result.combinations.available.length > 0) && (
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                We also checked {result.combinations.taken.length + result.combinations.available.length}{" "}
                common name combinations for &ldquo;{result.query}&rdquo; — words like Technologies,
                Ventures, Solutions, and Infratech — registered as Private Limited or LLP entities.
              </p>

              {result.combinations.taken.length > 0 && (
                <div className="space-y-3 mb-4">
                  {result.combinations.taken.map((t) =>
                    t.records.map((r) => (
                      <CompanyNarrative key={r.corporate_identification_number} record={r} />
                    ))
                  )}
                </div>
              )}

              {result.combinations.available.length > 0 && (
                <p className="text-sm text-slate-500 leading-relaxed">
                  No record was found for: {result.combinations.available.map((n, i) => (
                    <span key={n}>
                      <strong className="text-slate-600 font-medium">{n}</strong>
                      {i < result.combinations.available.length - 1 ? ", " : "."}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}

          <div className="pt-2 text-xs text-muted leading-relaxed">
            This checks <strong className="text-dark">exact-name matches</strong> against the
            government&rsquo;s Company Master Data. It does not check phonetic similarity,
            trademark conflicts, or MCA&rsquo;s full name-approval rules (Rule 8, Companies
            Incorporation Rules).
          </div>
        </div>
      )}
    </div>
  );
}
