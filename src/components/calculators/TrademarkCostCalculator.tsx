"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Info, ArrowRight, Landmark, BadgeIndianRupee, Award } from "lucide-react";
import {
  PRO_FEES, TRADEMARK_FEES, GST_RATE, trademarkGovtFee, inr, type TMApplicant,
} from "@/lib/calc-fees";

const APPLICANTS: { key: TMApplicant; label: string; desc: string }[] = [
  { key: "individual", label: "Individual / Proprietor", desc: "Concessional government fee" },
  { key: "msme", label: "MSME (Udyam)", desc: "Concessional government fee" },
  { key: "startup", label: "DPIIT Startup", desc: "Concessional government fee" },
  { key: "company", label: "Company / LLP / Partnership", desc: "Standard government fee" },
];

const STAGES = [
  { key: "filing", label: "Filing only", desc: "Search, classify and file TM-A" },
  { key: "objection", label: "Filing + objection reply", desc: "Covers an examination report" },
  { key: "hearing", label: "Full service to registration", desc: "Adds evidence and hearing" },
] as const;
type Stage = (typeof STAGES)[number]["key"];

/** Our fee ladders with the work involved; the base is the published TM fee. */
const STAGE_FEE: Record<Stage, number> = {
  filing: PRO_FEES["trademark-registration"],
  objection: PRO_FEES["trademark-registration"] + 4_500,
  hearing: PRO_FEES["trademark-registration"] + 13_000,
};

export function TrademarkCostCalculator() {
  const [applicant, setApplicant] = useState<TMApplicant>("msme");
  const [classes, setClasses] = useState("1");
  const [stage, setStage] = useState<Stage>("filing");

  const res = useMemo(() => {
    const n = Math.max(1, Math.min(45, parseInt(classes) || 1));
    const perClassGovt = trademarkGovtFee(applicant);
    const govtTotal = perClassGovt * n;
    const proFee = STAGE_FEE[stage] * n;
    const gst = Math.round(proFee * GST_RATE);
    return { n, perClassGovt, govtTotal, proFee, gst, total: govtTotal + proFee + gst };
  }, [applicant, classes, stage]);

  const concessional = applicant !== "company";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
          Trademark details
        </p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Who is applying?</label>
          <div className="space-y-2">
            {APPLICANTS.map((a) => (
              <button
                key={a.key}
                onClick={() => setApplicant(a.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  applicant === a.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <span>
                  <span className={`block text-sm font-heading font-semibold ${applicant === a.key ? "text-white" : "text-dark"}`}>
                    {a.label}
                  </span>
                  <span className={`block text-[11px] ${applicant === a.key ? "text-white/70" : "text-muted"}`}>
                    {a.desc}
                  </span>
                </span>
                <span className={`text-xs font-heading font-bold whitespace-nowrap ${applicant === a.key ? "text-accent" : "text-primary"}`}>
                  {inr(trademarkGovtFee(a.key))}/class
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            How many classes?
          </label>
          <input
            type="number"
            min={1}
            max={45}
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm"
          />
          <div className="flex gap-1.5 mt-2">
            {["1", "2", "3", "5"].map((n) => (
              <button
                key={n}
                onClick={() => setClasses(n)}
                className={`px-3 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors ${
                  classes === n ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n} class{n === "1" ? "" : "es"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">
            One class covers one category of goods or services. Both fees multiply per class.{" "}
            <Link href="/verify/trademark-class-finder" className="text-primary font-semibold hover:underline">
              Find your class →
            </Link>
          </p>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">How far do you want us to go?</label>
          <div className="space-y-2">
            {STAGES.map((s) => (
              <button
                key={s.key}
                onClick={() => setStage(s.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  stage === s.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <span>
                  <span className={`block text-sm font-heading font-semibold ${stage === s.key ? "text-white" : "text-dark"}`}>
                    {s.label}
                  </span>
                  <span className={`block text-[11px] ${stage === s.key ? "text-white/70" : "text-muted"}`}>
                    {s.desc}
                  </span>
                </span>
                <span className={`text-xs font-heading font-bold whitespace-nowrap ${stage === s.key ? "text-accent" : "text-primary"}`}>
                  {inr(STAGE_FEE[s.key])}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${applicant}-${classes}-${stage}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
            Your trademark cost
          </p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">
              All-in for {res.n} class{res.n > 1 ? "es" : ""}, including GST
            </p>
            <p className="text-white font-heading font-bold text-4xl">{inr(res.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/60 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <Landmark size={11} /> Govt. fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.govtTotal)}</p>
              </div>
              <div className="rounded-xl bg-accent/25 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/70 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <BadgeIndianRupee size={11} /> Our fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.proFee + res.gst)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {[
              { label: "Government fee (Form TM-A)", amount: res.govtTotal, note: `${inr(res.perClassGovt)} × ${res.n} class${res.n > 1 ? "es" : ""}`, pro: false },
              { label: "Our professional fee", amount: res.proFee, note: `${inr(STAGE_FEE[stage])} × ${res.n} class${res.n > 1 ? "es" : ""}`, pro: true },
              { label: "GST on professional fee", amount: res.gst, note: "18%", pro: true },
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
                <span className="font-heading font-bold text-[13px] text-dark whitespace-nowrap">{inr(r.amount)}</span>
              </div>
            ))}
          </div>

          {concessional && (
            <div className="flex gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
              <Award size={13} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs text-green-800 leading-relaxed">
                You qualify for the concessional government fee of {inr(4_500)} per class instead of{" "}
                {inr(9_000)} — a saving of {inr(4_500 * res.n)}. You will need to attach your Udyam or
                DPIIT certificate with the application.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-muted mb-2">
              Later on
            </p>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="flex justify-between"><span>Renewal, every 10 years</span><span className="font-heading font-bold text-dark">{inr(TRADEMARK_FEES.renewal)}/class</span></p>
              <p className="flex justify-between"><span>Late renewal surcharge</span><span className="font-heading font-bold text-dark">+{inr(TRADEMARK_FEES.lateRenewalSurcharge)}</span></p>
              <p className="flex justify-between"><span>Restoration after expiry</span><span className="font-heading font-bold text-dark">+{inr(TRADEMARK_FEES.restoration)}</span></p>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Info size={13} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Government fees are as per the First Schedule of the Trade Marks Rules, 2017 and are
              passed through at actual. A trademark takes 12–24 months to register if unopposed.
            </p>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
          >
            <span className="text-sm font-heading font-semibold text-primary">
              File my trademark — book a free consultation
            </span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
