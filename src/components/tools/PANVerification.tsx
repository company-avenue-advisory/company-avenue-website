"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/gtag";
import { ShieldCheck, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface PANResult {
  pan: string;
  category: string;
  status: string;
  nameMatch: boolean;
  dobMatch: boolean;
  aadhaarLinked: boolean;
}

export function PANVerification() {
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd from <input type="date">
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PANResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!consent) {
      setError("Please confirm consent to proceed with verification.");
      return;
    }

    const [yyyy, mm, dd] = dob.split("-");
    const dobFormatted = dd && mm && yyyy ? `${dd}/${mm}/${yyyy}` : "";

    setLoading(true);
    try {
      const res = await fetch("/api/verify/pan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pan: pan.trim(), name: name.trim(), dob: dobFormatted, consent: "Y" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
        trackEvent("verify_used", { tool: "pan_verification" });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isValid = pan.trim() && name.trim().length >= 2 && dob;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">PAN Number</label>
          <input
            type="text"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            placeholder="e.g. ABCDE1234F"
            maxLength={10}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">Name (as per PAN card)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            Verify PAN
          </button>
        </div>

        <label className="sm:col-span-2 flex items-start gap-2.5 text-xs text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-primary"
          />
          I consent to Company Avenue Advisory verifying these PAN details against government records
          for the sole purpose of this check. Details are not stored.
        </label>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 border border-slate-100 rounded-2xl overflow-hidden">
          <div className={`flex items-center gap-3 px-5 py-4 ${result.status?.toLowerCase() === "valid" ? "bg-green-50" : "bg-amber-50"}`}>
            {result.status?.toLowerCase() === "valid" ? (
              <CheckCircle2 size={22} className="text-green-600 shrink-0" />
            ) : (
              <XCircle size={22} className="text-amber-600 shrink-0" />
            )}
            <div>
              <p className="font-heading font-bold text-sm text-dark">PAN Status: {result.status || "Unknown"}</p>
              <p className="text-xs text-muted">{result.pan} · {result.category}</p>
            </div>
          </div>
          <div className="p-5 grid sm:grid-cols-3 gap-4 text-sm">
            <MatchField label="Name Match" value={result.nameMatch} />
            <MatchField label="DOB Match" value={result.dobMatch} />
            <MatchField label="Aadhaar Linked" value={result.aadhaarLinked} />
          </div>
        </div>
      )}
    </div>
  );
}

function MatchField({ label, value }: { label: string; value: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-muted mb-1">{label}</p>
      <p className={`font-medium flex items-center gap-1.5 ${value ? "text-green-700" : "text-red-600"}`}>
        {value ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
}
