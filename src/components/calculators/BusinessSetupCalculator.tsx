"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Segmented, ResultRow, HeroResult, Note, CTALink } from "./_shared";

type Entity = "pvtltd" | "llp" | "opc" | "proprietorship" | "partnership";

const BASE: Record<Entity, { label: string; govt: number; professional: number }> = {
  pvtltd: { label: "Private Limited", govt: 4000, professional: 6999 },
  llp: { label: "LLP", govt: 3000, professional: 5999 },
  opc: { label: "One Person Co.", govt: 3500, professional: 5999 },
  partnership: { label: "Partnership", govt: 2000, professional: 3999 },
  proprietorship: { label: "Proprietorship", govt: 500, professional: 1999 },
};

const ADDONS = [
  { key: "gst", label: "GST Registration", cost: 1499 },
  { key: "msme", label: "MSME / Udyam", cost: 999 },
  { key: "trademark", label: "Trademark Filing", cost: 6999 },
  { key: "gstFiling", label: "3-month GST Filing", cost: 2999 },
  { key: "accounting", label: "Accounting Setup", cost: 3999 },
  { key: "startupIndia", label: "Startup India (DPIIT)", cost: 4999 },
] as const;

export function BusinessSetupCalculator() {
  const [entity, setEntity] = useState<Entity>("pvtltd");
  const [addons, setAddons] = useState<Record<string, boolean>>({ gst: true });

  const res = useMemo(() => {
    const base = BASE[entity];
    const addonTotal = ADDONS.filter((a) => addons[a.key]).reduce((s, a) => s + a.cost, 0);
    const govtGst = Math.round(base.professional * 0.18);
    const total = base.govt + base.professional + govtGst + addonTotal;
    return { base, addonTotal, govtGst, total };
  }, [entity, addons]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <Segmented
          label="Business Structure"
          value={entity}
          onChange={setEntity}
          cols={2}
          options={(Object.keys(BASE) as Entity[]).map((k) => ({ key: k, label: BASE[k].label }))}
        />
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Add-on Services</label>
          <div className="space-y-2">
            {ADDONS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => setAddons((p) => ({ ...p, [a.key]: !p[a.key] }))}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-heading font-medium transition-all border ${
                  addons[a.key]
                    ? "bg-primary/8 border-primary/30 text-primary"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-primary/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${addons[a.key] ? "bg-primary border-primary text-white" : "border-slate-300"}`}>
                    {addons[a.key] ? "✓" : ""}
                  </span>
                  {a.label}
                </span>
                <span className="text-xs text-muted">+{formatINR(a.cost)}</span>
              </button>
            ))}
          </div>
        </div>
        <Note>Estimates are indicative professional + government fees. Stamp duty varies by state and authorised capital. Get an exact quote from our team.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Estimated Setup Cost</p>
          <HeroResult label="Total" value={formatINR(res.total)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label={`${res.base.label} — Govt Fees`} value={formatINR(res.base.govt)} />
            <ResultRow label="Professional Fees" value={formatINR(res.base.professional)} />
            <ResultRow label="GST on Professional Fees (18%)" value={formatINR(res.govtGst)} />
            {res.addonTotal > 0 && <ResultRow label="Add-on Services" value={formatINR(res.addonTotal)} accent />}
          </div>
          <CTALink label="Get an exact quote & start registration" href="/pricing" />
        </motion.div>
      </div>
    </div>
  );
}
