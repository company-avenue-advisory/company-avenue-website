"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Info, ArrowRight, Landmark, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import { FSSAI, GST_RATE, inr, type FssaiTier } from "@/lib/calc-fees";

const TIERS: FssaiTier[] = ["basic", "state", "central"];

/** Which licence the FSSAI turnover rules put you in. */
function tierForTurnover(turnover: number, importer: boolean): FssaiTier {
  if (importer) return "central";
  if (turnover <= 12_00_000) return "basic";
  if (turnover <= 20_00_00_000) return "state";
  return "central";
}

export function FSSAICostCalculator() {
  const [turnover, setTurnover] = useState("1000000");
  const [importer, setImporter] = useState(false);
  const [years, setYears] = useState("1");
  const [override, setOverride] = useState<FssaiTier | null>(null);

  const t = parseFloat(turnover) || 0;
  const suggested = tierForTurnover(t, importer);
  const tier = override ?? suggested;
  const yrs = Math.max(1, Math.min(5, parseInt(years) || 1));

  const res = useMemo(() => {
    const cfg = FSSAI[tier];
    const govt = cfg.govtPerYear * yrs;
    const proFee = cfg.pro;
    const gst = Math.round(proFee * GST_RATE);
    return { cfg, govt, proFee, gst, total: govt + proFee + gst };
  }, [tier, yrs]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
          Your food business
        </p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Annual turnover (₹)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={turnover}
            onChange={(e) => { setTurnover(e.target.value); setOverride(null); }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[500000, 1200000, 5000000, 250000000].map((v) => (
              <button
                key={v}
                onClick={() => { setTurnover(String(v)); setOverride(null); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors ${
                  turnover === String(v) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {inr(v)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setImporter(!importer); setOverride(null); }}
          className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-xl text-left border transition-all ${
            importer ? "bg-primary/8 border-primary/30" : "bg-slate-50 border-slate-200 hover:border-primary/20"
          }`}
        >
          <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center text-[10px] ${
            importer ? "bg-primary border-primary text-white" : "border-slate-300"
          }`}>
            {importer ? "✓" : ""}
          </span>
          <span>
            <span className="block text-[13px] font-heading font-semibold text-dark">
              I import or export food, or operate in more than one state
            </span>
            <span className="block text-[11px] text-muted">Central Licence becomes mandatory</span>
          </span>
        </button>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Licence type</label>
          <div className="space-y-2">
            {TIERS.map((k) => {
              const cfg = FSSAI[k];
              const active = tier === k;
              return (
                <button
                  key={k}
                  onClick={() => setOverride(k)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                    active ? "bg-primary text-white shadow-sm" : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                  }`}
                >
                  <span>
                    <span className={`block text-sm font-heading font-semibold ${active ? "text-white" : "text-dark"}`}>
                      {cfg.label}
                      {suggested === k && (
                        <span className={`ml-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          active ? "bg-accent text-white" : "bg-accent/15 text-accent"
                        }`}>
                          Suggested
                        </span>
                      )}
                    </span>
                    <span className={`block text-[11px] ${active ? "text-white/70" : "text-muted"}`}>{cfg.limit}</span>
                  </span>
                  <span className={`text-xs font-heading font-bold whitespace-nowrap ${active ? "text-accent" : "text-primary"}`}>
                    {inr(cfg.pro)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Licence period</label>
          <div className="flex gap-2">
            {["1", "2", "3", "4", "5"].map((n) => (
              <button
                key={n}
                onClick={() => setYears(n)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all ${
                  years === n ? "bg-primary text-white" : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30"
                }`}
              >
                {n}y
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-1">
            FSSAI licences can be taken for 1 to 5 years. The government fee is charged per year.
          </p>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${tier}-${yrs}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
            Your FSSAI cost
          </p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">
              {res.cfg.label} for {yrs} year{yrs > 1 ? "s" : ""}, including GST
            </p>
            <p className="text-white font-heading font-bold text-4xl">{inr(res.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/60 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <Landmark size={11} /> FSSAI fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.govt)}</p>
              </div>
              <div className="rounded-xl bg-accent/25 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/70 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <BadgeIndianRupee size={11} /> Our fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.proFee + res.gst)}</p>
              </div>
            </div>
          </div>

          {override && override !== suggested && (
            <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <ShieldCheck size={13} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                Based on your turnover we would normally recommend the{" "}
                <strong>{FSSAI[suggested].label}</strong>. Operating on the wrong licence category is a
                compliance risk — talk to us before you apply.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            {[
              { label: `FSSAI government fee`, amount: res.govt, note: `${inr(res.cfg.govtPerYear)} per year × ${yrs}`, pro: false },
              { label: "Our professional fee", amount: res.proFee, note: "Application, documents, portal filing and follow-up", pro: true },
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

          <div className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Info size={13} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              State Licence fees vary with capacity, so the figure above is indicative. Water and food
              testing reports, where the department asks for them, are charged at actual. Operating
              without a valid FSSAI licence can attract a penalty of up to ₹10 lakh.
            </p>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
          >
            <span className="text-sm font-heading font-semibold text-primary">
              Apply for my FSSAI licence — free consultation
            </span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
