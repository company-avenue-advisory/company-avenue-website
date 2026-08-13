"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Info, ArrowRight, RefreshCw, Landmark, BadgeIndianRupee } from "lucide-react";
import Link from "next/link";
import {
  PRO_FEES, DSC_PER_PERSON, NAME_APPROVAL_COMPANY, NAME_APPROVAL_LLP, PAN_TAN, GST_RATE,
  GOVT_FEES, STATE_NAMES, getStampRule, companyStampDuty,
  mcaIncorporationFee, llpFillipFee, llpForm3Fee, inr,
} from "@/lib/calc-fees";

type Entity = "pvtltd" | "llp" | "opc" | "partnership" | "proprietorship" | "section8";

const ENTITIES: { key: Entity; label: string; desc: string; service: keyof typeof PRO_FEES }[] = [
  { key: "pvtltd", label: "Private Limited", desc: "Most popular — investor ready", service: "private-limited-company" },
  { key: "llp", label: "LLP", desc: "Flexible, low compliance", service: "llp-registration" },
  { key: "opc", label: "One Person Company", desc: "Solo founder, limited liability", service: "one-person-company" },
  { key: "partnership", label: "Partnership Firm", desc: "Simple, 2–20 partners", service: "partnership-firm" },
  { key: "proprietorship", label: "Sole Proprietorship", desc: "Cheapest way to start", service: "sole-proprietorship" },
  { key: "section8", label: "Section 8 (NGO)", desc: "Non-profit company", service: "section-8-company" },
];

type Line = { label: string; amount: number; note: string; kind: "govt" | "pro" };

/** Everything a founder actually pays, itemised. */
function estimate(entity: Entity, state: string, capital: number, people: number) {
  const rule = getStampRule(state);
  const cap = capital || 1_00_000;
  const govt: Line[] = [];
  const service = ENTITIES.find((e) => e.key === entity)!.service;
  const proFee = PRO_FEES[service];

  const g = (label: string, amount: number, note: string) =>
    govt.push({ label, amount, note, kind: "govt" as const });

  switch (entity) {
    case "pvtltd":
    case "section8": {
      const dsc = people * DSC_PER_PERSON;
      g("Digital Signature (DSC)", dsc, `${people} director${people > 1 ? "s" : ""} × ${inr(DSC_PER_PERSON)}`);
      g("Name approval (SPICe+ Part A)", NAME_APPROVAL_COMPANY, "RUN / name reservation");
      g("MCA incorporation fee", mcaIncorporationFee(cap),
        cap <= 15_00_000 ? "Nil — capital up to ₹15 lakh is exempt" : "SPICe+ filing fee on authorised capital");
      g("Stamp duty (MoA + AoA)", companyStampDuty(state, cap), `${state} — MoA ${inr(rule.moa)} + AoA on capital`);
      if (entity === "section8") g("Section 8 licence fee", GOVT_FEES.section8Licence, "Licence under Section 8");
      g("PAN & TAN", PAN_TAN, "Issued with incorporation");
      break;
    }
    case "opc": {
      g("Digital Signature (DSC)", DSC_PER_PERSON, "1 director");
      g("Name approval (SPICe+ Part A)", NAME_APPROVAL_COMPANY, "RUN / name reservation");
      g("MCA incorporation fee", mcaIncorporationFee(cap),
        cap <= 15_00_000 ? "Nil — capital up to ₹15 lakh is exempt" : "SPICe+ filing fee on authorised capital");
      g("Stamp duty (MoA + AoA)", companyStampDuty(state, cap), `${state} — on authorised capital`);
      g("PAN & TAN", PAN_TAN, "Issued with incorporation");
      break;
    }
    case "llp": {
      g("Digital Signature (DSC)", people * DSC_PER_PERSON, `${people} partner${people > 1 ? "s" : ""} × ${inr(DSC_PER_PERSON)}`);
      g("Name approval (RUN-LLP)", NAME_APPROVAL_LLP, "Name reservation");
      g("FiLLiP incorporation fee", llpFillipFee(cap), "On capital contribution slab");
      g("Form 3 filing fee", llpForm3Fee(cap), "LLP Agreement filing");
      g("LLP Agreement stamp duty", rule.llp(cap), `${state} — on contribution`);
      g("PAN & TAN", PAN_TAN, "Issued after incorporation");
      break;
    }
    case "partnership": {
      g("Deed stamp paper", rule.llp(cap), `${state} — on capital contribution`);
      g("Notarisation", 200, "Notary charges, approx.");
      g("Firm PAN & TAN", PAN_TAN, "Income Tax Department");
      g("Registrar of Firms fee", 500, "Optional but recommended");
      break;
    }
    case "proprietorship": {
      g("GST registration", GOVT_FEES.gstRegistration, "No government fee");
      g("MSME (Udyam) registration", GOVT_FEES.udyam, "No government fee");
      break;
    }
  }

  const govtTotal = govt.reduce((s, l) => s + l.amount, 0);
  const gst = Math.round(proFee * GST_RATE);
  return {
    lines: [
      ...govt,
      { label: "Our professional fee", amount: proFee, note: "CA-led filing, end to end", kind: "pro" as const },
      { label: "GST on professional fee", amount: gst, note: "18%", kind: "pro" as const },
    ] as Line[],
    govtTotal,
    proFee,
    gst,
    total: govtTotal + proFee + gst,
  };
}

export function CompanyRegistrationCalculator() {
  const [entity, setEntity] = useState<Entity>("pvtltd");
  const [state, setState] = useState("Delhi");
  const [capital, setCapital] = useState("100000");
  const [people, setPeople] = useState("2");

  const needsCapital = entity !== "proprietorship";
  const needsPeople = ["pvtltd", "llp", "section8"].includes(entity);

  const res = useMemo(
    () => estimate(entity, state, parseFloat(capital) || 0, parseInt(people) || 2),
    [entity, state, capital, people]
  );

  const capitalLabel =
    entity === "llp" || entity === "partnership" ? "Capital contribution (₹)" : "Authorised capital (₹)";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
          Registration details
        </p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Entity type</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {ENTITIES.map((e) => (
              <button
                key={e.key}
                onClick={() => setEntity(e.key)}
                className={`px-4 py-3 rounded-xl text-left transition-all ${
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
                <span className={`block mt-1 text-[11px] font-heading font-bold ${entity === e.key ? "text-accent" : "text-primary"}`}>
                  Our fee {inr(PRO_FEES[e.service])}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">State of registration</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm bg-white"
          >
            {STATE_NAMES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <p className="text-xs text-muted mt-1">Stamp duty is the one cost that really moves with state.</p>
        </div>

        {needsCapital && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">{capitalLabel}</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="100000"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[100000, 500000, 1000000, 1500000].map((v) => (
                <button
                  key={v}
                  onClick={() => setCapital(String(v))}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors ${
                    capital === String(v)
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {inr(v)}
                </button>
              ))}
            </div>
            {(entity === "pvtltd" || entity === "opc" || entity === "section8") && (
              <p className="text-xs text-muted mt-2">
                MCA charges no incorporation fee up to ₹15 lakh authorised capital.
              </p>
            )}
          </div>
        )}

        {needsPeople && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">
              {entity === "llp" ? "Designated partners" : "Directors / promoters"}
            </label>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5"].map((n) => (
                <button
                  key={n}
                  onClick={() => setPeople(n)}
                  disabled={entity !== "llp" && n === "1"}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                    people === n
                      ? "bg-primary text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-1">Each one needs their own Digital Signature.</p>
          </div>
        )}

        <button
          onClick={() => { setCapital("100000"); setPeople("2"); setState("Delhi"); setEntity("pvtltd"); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* ── Result ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${entity}-${state}-${capital}-${people}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
            Your estimated cost
          </p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">All-in, including GST</p>
            <p className="text-white font-heading font-bold text-4xl">{inr(res.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/60 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <Landmark size={11} /> Government
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
            {res.lines.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl ${
                  item.kind === "pro" ? "bg-accent/[0.07] border border-accent/15" : "bg-slate-50"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-heading font-semibold text-dark">{item.label}</p>
                  <p className="text-[11px] text-muted leading-snug">{item.note}</p>
                </div>
                <span className="font-heading font-bold text-[13px] text-dark whitespace-nowrap">
                  {item.amount === 0 ? "NIL" : inr(item.amount)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Info size={13} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Government fees are passed through at actual — we never mark them up. Stamp duty
              rates are set by each state and change from time to time.
            </p>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
          >
            <span className="text-sm font-heading font-semibold text-primary">
              Lock this in — book a free consultation
            </span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
