"use client";
import { useState } from "react";
import { Building2, Loader2, AlertCircle } from "lucide-react";

interface CompanyResult {
  kind: "company";
  cin: string;
  name: string;
  status: string;
  category: string;
  classOfCompany: string;
  incorporationDate: string;
  address: string;
  rocCode: string;
  paidUpCapital: string;
  authorisedCapital: string;
  directors: unknown[];
}

interface DirectorResult {
  kind: "director";
  din: string;
  name: string;
  companies: { company_name: string; designation: string; begin_date: string; end_date: string }[];
  llps: { llp_name: string; designation: string; begin_date: string; end_date: string }[];
}

type Result = CompanyResult | DirectorResult;

export function CompanyVerification() {
  const [type, setType] = useState<"cin" | "din">("cin");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/verify/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id: id.trim() }),
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
      <div className="flex gap-2 mb-5">
        {(["cin", "din"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setType(t); setId(""); setResult(null); setError(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-colors ${
              type === t ? "bg-primary text-white" : "bg-slate-50 text-muted hover:text-primary"
            }`}
          >
            {t === "cin" ? "Search by CIN / LLPIN" : "Search by DIN"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value.toUpperCase())}
          placeholder={type === "cin" ? "e.g. U74999DL2015PTC123456" : "e.g. 01234567"}
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !id.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Building2 size={16} />}
          Verify
        </button>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result?.kind === "company" && (
        <div className="mt-6 border border-slate-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-primary/5">
            <p className="font-heading font-bold text-sm text-dark">{result.name}</p>
            <p className="text-xs text-muted">{result.cin}</p>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Status" value={result.status} />
            <Field label="Category" value={result.category} />
            <Field label="Class" value={result.classOfCompany} />
            <Field label="Incorporated On" value={result.incorporationDate} />
            <Field label="RoC Code" value={result.rocCode} />
            <Field label="Paid-up Capital" value={result.paidUpCapital} />
            <Field label="Authorised Capital" value={result.authorisedCapital} />
            {result.address && <Field label="Registered Address" value={result.address} className="sm:col-span-2" />}
          </div>
        </div>
      )}

      {result?.kind === "director" && (
        <div className="mt-6 border border-slate-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-primary/5">
            <p className="font-heading font-bold text-sm text-dark">{result.name}</p>
            <p className="text-xs text-muted">DIN {result.din}</p>
          </div>
          <div className="p-5 space-y-4 text-sm">
            {result.companies?.length > 0 && (
              <div>
                <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-muted mb-2">Company Appointments</p>
                <div className="space-y-2">
                  {result.companies.map((c, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-50 pb-2 last:border-0">
                      <span className="text-dark font-medium">{c.company_name}</span>
                      <span className="text-muted text-xs">{c.designation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.llps?.length > 0 && (
              <div>
                <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-muted mb-2">LLP Appointments</p>
                <div className="space-y-2">
                  {result.llps.map((l, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-50 pb-2 last:border-0">
                      <span className="text-dark font-medium">{l.llp_name}</span>
                      <span className="text-muted text-xs">{l.designation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!result.companies?.length && !result.llps?.length && (
              <p className="text-muted text-xs">No active company or LLP appointments found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, className }: { label: string; value?: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-muted mb-1">{label}</p>
      <p className="text-dark font-medium">{value || "—"}</p>
    </div>
  );
}
