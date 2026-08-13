"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Segmented, ResultRow, HeroResult, Note, CTALink } from "./_shared";
import { PRO_FEES, GST_RATE, trademarkGovtFee } from "@/lib/calc-fees";

type Entity = "pvtltd" | "llp" | "opc" | "proprietorship" | "partnership";

/**
 * Government figures are typical all-in incorporation costs (DSC + name approval
 * + stamp duty + PAN/TAN) for a ₹1 lakh capital entity in a mid-cost state. The
 * Registration Cost Calculator itemises these exactly, state by state.
 */
const BASE: Record<Entity, { label: string; govt: number; professional: number }> = {
  pvtltd: { label: "Private Limited", govt: 4500, professional: PRO_FEES["private-limited-company"] },
  llp: { label: "LLP", govt: 4900, professional: PRO_FEES["llp-registration"] },
  opc: { label: "One Person Co.", govt: 2900, professional: PRO_FEES["one-person-company"] },
  partnership: { label: "Partnership", govt: 1300, professional: PRO_FEES["partnership-firm"] },
  proprietorship: { label: "Proprietorship", govt: 0, professional: PRO_FEES["sole-proprietorship"] },
};

const ADDONS = [
  { key: "gst", label: "GST Registration", cost: PRO_FEES["gst-registration"] },
  { key: "msme", label: "MSME / Udyam", cost: 999 },
  { key: "trademark", label: "Trademark Filing (1 class)", cost: PRO_FEES["trademark-registration"] + trademarkGovtFee("msme") },
  { key: "gstFiling", label: "3-month GST Filing", cost: PRO_FEES["gst-filing"] * 3 },
  { key: "accounting", label: "Accounting & Bookkeeping (1 month)", cost: PRO_FEES["accounting-bookkeeping"] },
  { key: "startupIndia", label: "Startup India (DPIIT)", cost: 4999 },
] as const;

export function BusinessSetupCalculator() {
  const [entity, setEntity] = useState<Entity>("pvtltd");
  const [addons, setAddons] = useState<Record<string, boolean>>({ gst: true });

  const res = useMemo(() => {
    const base = BASE[entity];
    const addonTotal = ADDONS.filter((a) => addons[a.key]).reduce((s, a) => s + a.cost, 0);
    const govtGst = Math.round(base.professional * GST_RATE);
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
        <Note>Our professional fee is fixed and shown above. Government fees are indicative for ₹1 lakh capital — use the Registration Cost Calculator for an exact, state-wise breakdown.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Estimated Setup Cost</p>
          <HeroResult label="Total" value={formatINR(res.total)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label={`${res.base.label} — Govt Fees`} value={res.base.govt === 0 ? "NIL" : formatINR(res.base.govt)} />
            <ResultRow label="Professional Fees" value={formatINR(res.base.professional)} />
            <ResultRow label="GST on Professional Fees (18%)" value={formatINR(res.govtGst)} />
            {res.addonTotal > 0 && <ResultRow label="Add-on Services" value={formatINR(res.addonTotal)} accent />}
          </div>
          <CTALink label="Get an exact quote & start registration" href="/contact" />
        </motion.div>
      </div>
    </div>
  );
}
