"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Info, ArrowRight, Landmark, BadgeIndianRupee, CheckCircle2, AlertTriangle } from "lucide-react";
import { PRO_FEES, DSC_PER_PERSON, GST_RATE, inr } from "@/lib/calc-fees";

type Entity = "proprietor" | "partnership" | "company";

const ENTITIES: { key: Entity; label: string; desc: string; dsc: boolean }[] = [
  { key: "proprietor", label: "Proprietor / Individual", desc: "Verified with Aadhaar OTP — no DSC needed", dsc: false },
  { key: "partnership", label: "Partnership / LLP", desc: "DSC required for the authorised signatory", dsc: true },
  { key: "company", label: "Private Ltd / OPC / Public Ltd", desc: "DSC mandatory for the authorised signatory", dsc: true },
];

const RETURNS = [
  { key: "none", label: "Registration only", months: 0, desc: "Just the GSTIN" },
  { key: "6m", label: "+ 6 months of returns", months: 6, desc: "GSTR-1 and GSTR-3B filed for you" },
  { key: "12m", label: "+ 12 months of returns", months: 12, desc: "A full year, fully covered" },
] as const;
type ReturnPlan = (typeof RETURNS)[number]["key"];

export function GSTRegistrationCostCalculator() {
  const [entity, setEntity] = useState<Entity>("proprietor");
  const [plan, setPlan] = useState<ReturnPlan>("none");
  const [turnover, setTurnover] = useState("2500000");
  const [interState, setInterState] = useState(false);
  const [ecommerce, setEcommerce] = useState(false);
  const [servicesOnly, setServicesOnly] = useState(false);

  const cfg = ENTITIES.find((e) => e.key === entity)!;
  const months = RETURNS.find((r) => r.key === plan)!.months;

  const res = useMemo(() => {
    const dsc = cfg.dsc ? DSC_PER_PERSON : 0;
    const regFee = PRO_FEES["gst-registration"];
    const returnsFee = PRO_FEES["gst-filing"] * months;
    const proFee = regFee + returnsFee;
    // GST applies to the DSC as well as our fee — the GST department charges nothing.
    const gst = Math.round((proFee + dsc) * GST_RATE);
    return { dsc, regFee, returnsFee, proFee, gst, total: dsc + proFee + gst };
  }, [cfg.dsc, months]);

  // Threshold logic — Section 22 read with the 2019 notification.
  const t = parseFloat(turnover) || 0;
  const threshold = servicesOnly ? 20_00_000 : 40_00_000;
  const mandatory = interState || ecommerce || t > threshold;
  const reason = ecommerce
    ? "Every e-commerce seller must register, whatever the turnover."
    : interState
      ? "Inter-state supply makes registration compulsory from the first rupee."
      : t > threshold
        ? `Turnover is above the ₹${(threshold / 1_00_000).toFixed(0)} lakh threshold for ${servicesOnly ? "services" : "goods"}.`
        : `You are under the ₹${(threshold / 1_00_000).toFixed(0)} lakh threshold — registration is voluntary.`;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
          Your business
        </p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Entity type</label>
          <div className="space-y-2">
            {ENTITIES.map((e) => (
              <button
                key={e.key}
                onClick={() => setEntity(e.key)}
                className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                  entity === e.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <span className={`block text-sm font-heading font-semibold ${entity === e.key ? "text-white" : "text-dark"}`}>
                  {e.label}
                </span>
                <span className={`block text-[11px] ${entity === e.key ? "text-white/70" : "text-muted"}`}>
                  {e.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Expected annual turnover (₹)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[1500000, 2500000, 5000000, 10000000].map((v) => (
              <button
                key={v}
                onClick={() => setTurnover(String(v))}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors ${
                  turnover === String(v) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {inr(v)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-heading font-semibold text-dark">Does any of this apply?</label>
          {[
            { on: servicesOnly, set: setServicesOnly, label: "I supply services (not goods)", note: "Threshold drops to ₹20 lakh" },
            { on: interState, set: setInterState, label: "I sell to other states", note: "Registration becomes compulsory" },
            { on: ecommerce, set: setEcommerce, label: "I sell on Amazon / Flipkart / my own store", note: "Registration becomes compulsory" },
          ].map((c) => (
            <button
              key={c.label}
              onClick={() => c.set(!c.on)}
              className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-xl text-left border transition-all ${
                c.on ? "bg-primary/8 border-primary/30" : "bg-slate-50 border-slate-200 hover:border-primary/20"
              }`}
            >
              <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center text-[10px] ${
                c.on ? "bg-primary border-primary text-white" : "border-slate-300"
              }`}>
                {c.on ? "✓" : ""}
              </span>
              <span>
                <span className="block text-[13px] font-heading font-semibold text-dark">{c.label}</span>
                <span className="block text-[11px] text-muted">{c.note}</span>
              </span>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Want us to file your returns too?</label>
          <div className="space-y-2">
            {RETURNS.map((r) => (
              <button
                key={r.key}
                onClick={() => setPlan(r.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  plan === r.key ? "bg-primary text-white shadow-sm" : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <span>
                  <span className={`block text-sm font-heading font-semibold ${plan === r.key ? "text-white" : "text-dark"}`}>
                    {r.label}
                  </span>
                  <span className={`block text-[11px] ${plan === r.key ? "text-white/70" : "text-muted"}`}>{r.desc}</span>
                </span>
                <span className={`text-xs font-heading font-bold whitespace-nowrap ${plan === r.key ? "text-accent" : "text-primary"}`}>
                  {inr(PRO_FEES["gst-registration"] + PRO_FEES["gst-filing"] * r.months)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${entity}-${plan}-${mandatory}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
            Your GST registration cost
          </p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">All-in, including GST</p>
            <p className="text-white font-heading font-bold text-4xl">{inr(res.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/60 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <Landmark size={11} /> Govt. fee
                </p>
                <p className="text-white font-heading font-bold text-lg">NIL</p>
              </div>
              <div className="rounded-xl bg-accent/25 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/70 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <BadgeIndianRupee size={11} /> Our fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.proFee + res.gst)}</p>
              </div>
            </div>
          </div>

          <div className={`flex gap-2 p-3 rounded-xl border ${
            mandatory ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-100"
          }`}>
            {mandatory
              ? <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              : <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />}
            <p className={`text-xs leading-relaxed ${mandatory ? "text-amber-900" : "text-green-800"}`}>
              <strong>{mandatory ? "GST registration is mandatory for you." : "GST registration is optional for you."}</strong>{" "}
              {reason}
              {!mandatory && " Many businesses still register voluntarily to claim input tax credit and to sell to GST-registered buyers."}
            </p>
          </div>

          <div className="space-y-1.5">
            {[
              { label: "GST department fee", amount: 0, note: "There is no government fee for GST registration", pro: false },
              ...(res.dsc ? [{ label: "Digital Signature (DSC)", amount: res.dsc, note: "Authorised signatory — Class 3, two-year", pro: true }] : []),
              { label: "Our fee — registration", amount: res.regFee, note: "REG-01 filing, ARN tracking, GSTIN", pro: true },
              ...(res.returnsFee ? [{ label: `Our fee — ${months} months of returns`, amount: res.returnsFee, note: `${inr(PRO_FEES["gst-filing"])} × ${months} months`, pro: true }] : []),
              { label: "GST @ 18%", amount: res.gst, note: res.dsc ? "On our fee and the DSC" : "On our fee", pro: true },
            ].map((r) => (
              <div
                key={r.label}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl ${
                  r.pro ? "bg-accent/[0.07] border border-accent/15" : "bg-slate-50"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-heading font-semibold text-dark">{r.label}</p>
                  <p className="text-[11px] text-muted leading-snug">{r.note}</p>
                </div>
                <span className="font-heading font-bold text-[13px] text-dark whitespace-nowrap">
                  {r.amount === 0 ? "NIL" : inr(r.amount)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Info size={13} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Late filing costs ₹50 a day (₹20 for a nil return), capped at ₹5,000 per return, plus
              18% annual interest on unpaid tax. Filing on time is the cheapest thing you can do.
            </p>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
          >
            <span className="text-sm font-heading font-semibold text-primary">
              Get my GSTIN — book a free consultation
            </span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
