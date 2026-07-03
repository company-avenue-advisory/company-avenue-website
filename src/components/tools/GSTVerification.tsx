"use client";
import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface GSTResult {
  gstin: string;
  legalName: string;
  tradeName: string;
  businessType: string;
  taxpayerType: string;
  status: string;
  registrationDate: string;
  lastUpdated: string;
  address: string | null;
}

export function GSTVerification() {
  const [gstin, setGstin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GSTResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/verify/gst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gstin: gstin.trim() }),
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

  const isActive = result?.status?.toLowerCase().includes("active");

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={gstin}
          onChange={(e) => setGstin(e.target.value.toUpperCase())}
          placeholder="e.g. 07AABCU9603R1ZM"
          maxLength={15}
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || gstin.length !== 15}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Verify GSTIN
        </button>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 border border-slate-100 rounded-2xl overflow-hidden">
          <div className={`flex items-center gap-3 px-5 py-4 ${isActive ? "bg-green-50" : "bg-amber-50"}`}>
            {isActive ? (
              <CheckCircle2 size={22} className="text-green-600 shrink-0" />
            ) : (
              <XCircle size={22} className="text-amber-600 shrink-0" />
            )}
            <div>
              <p className={`font-heading font-bold text-sm ${isActive ? "text-green-800" : "text-amber-800"}`}>
                {result.status || "Status unavailable"}
              </p>
              <p className="text-xs text-muted">GSTIN {result.gstin}</p>
            </div>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Legal Name" value={result.legalName} />
            <Field label="Trade Name" value={result.tradeName} />
            <Field label="Business Type" value={result.businessType} />
            <Field label="Taxpayer Type" value={result.taxpayerType} />
            <Field label="Registered Since" value={result.registrationDate} />
            <Field label="Last Updated" value={result.lastUpdated} />
            {result.address && <Field label="Address" value={result.address} className="sm:col-span-2" />}
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
