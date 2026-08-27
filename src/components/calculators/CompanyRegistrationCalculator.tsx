"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info, ArrowRight, RefreshCw, Landmark, BadgeIndianRupee, AlertTriangle } from "lucide-react";
import Link from "next/link";
import {
  PRO_FEES, DSC_PER_PERSON, NAME_RESERVATION, NAME_APPROVAL_LLP, PAN_TAN, GST_RATE,
  GOVT_FEES, STATE_NAMES, getStampRule, incorporationCost,
  llpFillipFee, llpForm3Fee, llpAgreementStampDuty, getLlpStampRule,
  LLP_DPIN_FEE, LLP_FRANKING_NOTARY, NIL_FEE_THRESHOLD,
  incorporationProfessionalFee, FEE_CARD_CEILING, inr,
  type CompanyScale,
} from "@/lib/calc-fees";

type Entity = "pvtltd" | "opc" | "section8" | "llp" | "partnership" | "proprietorship";

const ENTITIES: {
  key: Entity; label: string; desc: string; service: keyof typeof PRO_FEES;
  /** true = priced by a verified fee workbook; false = indicative */
  exact: boolean;
}[] = [
  { key: "pvtltd", label: "Private Limited", desc: "Most popular — investor ready", service: "private-limited-company", exact: true },
  { key: "opc", label: "One Person Company", desc: "Solo founder, limited liability", service: "one-person-company", exact: true },
  { key: "section8", label: "Section 8 (NGO)", desc: "Non-profit company", service: "section-8-company", exact: true },
  // LLP is now exact — CAA_LLP_Cost_Calculator_v2 supplies the MCA bands, the
  // DPIN fee, franking and the State-wise agreement stamp duty table.
  { key: "llp", label: "LLP", desc: "Flexible, low compliance", service: "llp-registration", exact: true },
  { key: "partnership", label: "Partnership Firm", desc: "Simple, 2–20 partners", service: "partnership-firm", exact: false },
  { key: "proprietorship", label: "Sole Proprietorship", desc: "Cheapest way to start", service: "sole-proprietorship", exact: false },
];

type Line = { label: string; amount: number; note: string; kind: "govt" | "pro" };

export function CompanyRegistrationCalculator() {
  const [entity, setEntity] = useState<Entity>("pvtltd");
  const [state, setState] = useState("Delhi");
  const [capital, setCapital] = useState("1500000");
  const [people, setPeople] = useState("2");
  const [smallCompany, setSmallCompany] = useState(true);
  const [nameReservation, setNameReservation] = useState(true);
  /** LLP only — designated partners who do not already hold a DIN or DPIN. */
  const [newDpin, setNewDpin] = useState("0");

  const cfg = ENTITIES.find((e) => e.key === entity)!;
  const isCompany = entity === "pvtltd" || entity === "opc" || entity === "section8";
  const needsCapital = entity !== "proprietorship";
  const needsPeople = entity !== "proprietorship";

  const cap = parseFloat(capital) || 0;
  const dsc = Math.max(1, parseInt(people) || 1);

  /* Companies are priced off the fee card — the fee moves with authorised capital
     and with whether we also reserve the name. Everything else is a fixed fee. */
  const card = incorporationProfessionalFee(cap, nameReservation);
  const proFee = isCompany ? card.fee : PRO_FEES[cfg.service];

  const res = useMemo(() => {
    /* ── companies: the workbook engine, exactly ── */
    if (isCompany) {
      const scale: CompanyScale = entity === "opc" || (entity === "pvtltd" && smallCompany) ? "opcSmall" : "general";
      const r = incorporationCost({
        capital: cap, scale, state, isSection8: entity === "section8",
        nameReservation, dscCount: dsc, professionalFee: proFee,
      });
      const lines: Line[] = [
        { label: "MCA fee — Memorandum of Association", amount: r.moaFee, kind: "govt",
          note: r.moaFee === 0 ? `Nil — capital up to ${inr(NIL_FEE_THRESHOLD)} is exempt` : "Rule 12, Table of Fees" },
        { label: "MCA fee — SPICe+ (INC-32) & Articles", amount: r.formFee, kind: "govt",
          note: r.formFee === 0 ? "Nil under the same exemption" : "Filing fee on authorised capital" },
        { label: "Stamp duty — e-Form INC-32", amount: r.stamp.eForm, kind: "govt", note: state },
        { label: "Stamp duty — Memorandum", amount: r.stamp.moa, kind: "govt",
          note: r.stamp.exempt ? "Exempt for Section 8 in this State" : state },
        { label: "Stamp duty — Articles", amount: r.stamp.aoa, kind: "govt",
          note: r.stamp.exempt ? "Exempt for Section 8 in this State" : r.stamp.rule.note },
        { label: "PAN & TAN", amount: r.panTan, kind: "govt", note: "Issued with incorporation" },
        ...(r.nameFee ? [{ label: "Name reservation (SPICe+ Part A)", amount: r.nameFee, kind: "govt" as const, note: "₹1,000 per application" }] : []),
        { label: "Digital Signature (DSC)", amount: r.dscTotal, kind: "pro",
          note: `${dsc} × ${inr(DSC_PER_PERSON)} — Class 3, two-year validity` },
        { label: "Our professional fee", amount: r.professionalFee, kind: "pro", note: "CA-led filing, end to end" },
        { label: "GST @ 18%", amount: r.gst, kind: "pro", note: "On DSC and professional fee only" },
      ];
      return { lines, passThrough: r.passThrough, ourSide: r.taxable + r.gst, total: r.total, stampUnknown: false };
    }

    /* ── LLP: the LLP workbook engine ── */
    const govt: Line[] = [];
    const g = (label: string, amount: number, note: string) => govt.push({ label, amount, note, kind: "govt" });
    /* Franking and notarisation sit on our side of the invoice — the LLP workbook
       treats them as absorbed into the fee and charged with GST, not as a
       pure-agent disbursement. */
    let taxableExtras = 0;
    let stampUnknown = false;

    if (entity === "llp") {
      const dpin = Math.max(0, parseInt(newDpin) || 0);
      const llpDuty = llpAgreementStampDuty(cap, state);
      stampUnknown = llpDuty === null;
      g("Name approval (RUN-LLP / FiLLiP Part A)", NAME_APPROVAL_LLP, "Flat statutory fee per application");
      g("FiLLiP incorporation fee", llpFillipFee(cap), "Band set by total capital contribution");
      g("Form 3 filing fee — LLP Agreement", llpForm3Fee(cap), "Due within 30 days of incorporation");
      if (dpin) g("DPIN / DIN allotment", dpin * LLP_DPIN_FEE, `${dpin} × ${inr(LLP_DPIN_FEE)} — partners without an existing DIN`);
      g("LLP Agreement stamp duty", llpDuty ?? 0,
        stampUnknown
          ? `${state} — no rate published for this State, obtain before you budget`
          : `${state} — ${getLlpStampRule(state)?.note ?? ""}`);
      g("PAN & TAN", PAN_TAN, "Issued on incorporation");
      taxableExtras = LLP_FRANKING_NOTARY;
    } else if (entity === "partnership") {
      const deedDuty = llpAgreementStampDuty(cap, state);
      stampUnknown = deedDuty === null;
      g("Deed stamp paper", deedDuty ?? 0, `${state} — on capital contribution`);
      g("Notarisation", 200, "Notary charges, approx.");
      g("Firm PAN & TAN", PAN_TAN, "Income Tax Department");
      g("Registrar of Firms fee", 500, "Optional but recommended");
    } else {
      g("GST registration", GOVT_FEES.gstRegistration, "No government fee");
      g("MSME (Udyam) registration", GOVT_FEES.udyam, "No government fee");
    }

    const dscTotal = entity === "llp" ? dsc * DSC_PER_PERSON : 0;
    const taxable = dscTotal + proFee + taxableExtras;
    const gst = Math.round(taxable * GST_RATE);
    const passThrough = govt.reduce((s, l) => s + l.amount, 0);
    return {
      lines: [
        ...govt,
        ...(dscTotal ? [{ label: "Digital Signature (DSC)", amount: dscTotal, kind: "pro" as const, note: `${dsc} × ${inr(DSC_PER_PERSON)} — Class 3, two-year validity` }] : []),
        ...(taxableExtras ? [{ label: "Franking, stamp paper and notarisation", amount: taxableExtras, kind: "pro" as const, note: "Coordination of stamping and notarising the LLP Agreement" }] : []),
        { label: "Our professional fee", amount: proFee, kind: "pro" as const,
          note: entity === "llp" ? "Incorporation, LLP Agreement drafting and Form 3" : "CA-led filing, end to end" },
        { label: "GST @ 18%", amount: gst, kind: "pro" as const, note: dscTotal ? "On DSC, franking and professional fee" : "On professional fee" },
      ],
      passThrough, ourSide: taxable + gst, total: passThrough + taxable + gst, stampUnknown,
    };
  }, [entity, isCompany, smallCompany, state, cap, dsc, proFee, nameReservation, newDpin]);

  const capitalLabel = entity === "llp" || entity === "partnership" ? "Capital contribution (₹)" : "Authorised share capital (₹)";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Registration details</p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Entity type</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {ENTITIES.map((e) => (
              <button
                key={e.key}
                onClick={() => setEntity(e.key)}
                className={`px-4 py-3 rounded-xl text-left transition-all ${
                  entity === e.key ? "bg-primary text-white shadow-sm" : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <span className={`block text-sm font-heading font-semibold ${entity === e.key ? "text-white" : "text-dark"}`}>{e.label}</span>
                <span className={`block text-[11px] ${entity === e.key ? "text-white/70" : "text-muted"}`}>{e.desc}</span>
                <span className={`block mt-1 text-[11px] font-heading font-bold ${entity === e.key ? "text-accent" : "text-primary"}`}>
                  Our fee {inr(
                    e.key === "pvtltd" || e.key === "opc" || e.key === "section8"
                      ? incorporationProfessionalFee(cap, nameReservation).fee
                      : PRO_FEES[e.service]
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">State / Union Territory</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm bg-white"
          >
            {STATE_NAMES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {isCompany && (
            <p className="text-xs text-muted mt-1">{getStampRule(state).note}</p>
          )}
        </div>

        {needsCapital && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">{capitalLabel}</label>
            <input
              type="number" inputMode="numeric" placeholder="1500000" value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[100000, 500000, 1500000, 2500000, 5000000].map((v) => (
                <button
                  key={v} onClick={() => setCapital(String(v))}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold transition-colors ${
                    capital === String(v) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >{inr(v)}</button>
              ))}
            </div>
            {isCompany && (
              <>
                <p className={`text-xs mt-2 ${cap > NIL_FEE_THRESHOLD ? "text-amber-700" : "text-green-700"}`}>
                  {cap > NIL_FEE_THRESHOLD
                    ? `Above ${inr(NIL_FEE_THRESHOLD)} — the MCA registration fee now applies and rises steeply.`
                    : `MCA charges no registration fee up to ${inr(NIL_FEE_THRESHOLD)} authorised capital.`}
                </p>
                <p className="text-xs text-muted mt-1">
                  {card.onQuotation
                    ? `Above ${inr(FEE_CARD_CEILING)} authorised capital our fee is quoted separately — the figure shown is the top slab.`
                    : `Our fee slab: authorised capital up to ${inr(card.slab.upTo)} → ${inr(card.fee)}.`}
                </p>
              </>
            )}
          </div>
        )}

        {entity === "pvtltd" && (
          <button
            onClick={() => setSmallCompany(!smallCompany)}
            className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-xl text-left border transition-all ${
              smallCompany ? "bg-primary/8 border-primary/30" : "bg-slate-50 border-slate-200 hover:border-primary/20"
            }`}
          >
            <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center text-[10px] ${smallCompany ? "bg-primary border-primary text-white" : "border-slate-300"}`}>
              {smallCompany ? "✓" : ""}
            </span>
            <span>
              <span className="block text-[13px] font-heading font-semibold text-dark">This is a small company</span>
              <span className="block text-[11px] text-muted">Paid-up capital ≤ ₹4 crore and turnover ≤ ₹40 crore — a lower MCA scale applies up to ₹50 lakh capital</span>
            </span>
          </button>
        )}

        {isCompany && (
          <button
            onClick={() => setNameReservation(!nameReservation)}
            className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-xl text-left border transition-all ${
              nameReservation ? "bg-primary/8 border-primary/30" : "bg-slate-50 border-slate-200 hover:border-primary/20"
            }`}
          >
            <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center text-[10px] ${nameReservation ? "bg-primary border-primary text-white" : "border-slate-300"}`}>
              {nameReservation ? "✓" : ""}
            </span>
            <span>
              <span className="block text-[13px] font-heading font-semibold text-dark">Reserve the name first (SPICe+ Part A)</span>
              <span className="block text-[11px] text-muted">
                ₹1,000 government fee per application, and {inr(card.slab.withName - card.slab.without)} on
                our fee. Neither is payable if the name is reserved within Part B.
              </span>
            </span>
          </button>
        )}

        {needsPeople && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">
              {entity === "llp" ? "Designated partners" : entity === "partnership" ? "Partners" : "Directors / promoters"}
            </label>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5"].map((n) => (
                <button
                  key={n} onClick={() => setPeople(n)}
                  disabled={entity === "opc" && n !== "1"}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                    people === n ? "bg-primary text-white" : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30"
                  }`}
                >{n}</button>
              ))}
            </div>
            <p className="text-xs text-muted mt-1">Each one needs their own Digital Signature.</p>
          </div>
        )}

        {entity === "llp" && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">
              Partners needing a fresh DPIN / DIN
            </label>
            <div className="flex gap-2">
              {["0", "1", "2", "3"].map((n) => (
                <button
                  key={n} onClick={() => setNewDpin(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all ${
                    newDpin === n ? "bg-primary text-white" : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30"
                  }`}
                >{n}</button>
              ))}
            </div>
            <p className="text-xs text-muted mt-1">
              {inr(LLP_DPIN_FEE)} each. Count only partners who do not already hold a DIN or DPIN.
            </p>
          </div>
        )}

        <button
          onClick={() => { setCapital("1500000"); setPeople("2"); setState("Delhi"); setEntity("pvtltd"); setSmallCompany(true); setNameReservation(true); setNewDpin("0"); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* ── Result ── */}
      <div data-calc-result className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${entity}-${state}-${capital}-${people}-${smallCompany}-${nameReservation}-${newDpin}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Your estimated cost</p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">All-in, including GST</p>
            <p className="text-white font-heading font-bold text-4xl">{inr(res.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/60 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <Landmark size={11} /> Government
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.passThrough)}</p>
                <p className="text-white/40 text-[10px]">No GST — pure agent</p>
              </div>
              <div className="rounded-xl bg-accent/25 px-3 py-2">
                <p className="flex items-center gap-1.5 text-white/70 text-[10px] font-heading font-bold uppercase tracking-wider">
                  <BadgeIndianRupee size={11} /> DSC + our fee
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.ourSide)}</p>
                <p className="text-white/40 text-[10px]">Incl. 18% GST</p>
              </div>
            </div>
          </div>

          {res.stampUnknown && (
            <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Stamp duty not shown for {state}.</strong> Our State schedule carries no
                published rate for {state}, so the agreement stamp duty is counted as nil above and
                the total is understated. Ask us for the current rate before you budget.
              </p>
            </div>
          )}

          {!cfg.exact && (
            <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Indicative figure.</strong> Our verified fee schedules cover companies
                having share capital and LLPs. {cfg.label} costs are close estimates — confirm
                with us before you budget.
              </p>
            </div>
          )}

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
              MCA fees and stamp duty are recovered at actuals as a pure agent under Rule 33 of
              the CGST Rules, 2017 — no GST is added to them. GST at 18% applies only to the
              Digital Signatures, our professional fee
              {entity === "llp" ? " and the franking and notarisation charge" : ""}.
            </p>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
          >
            <span className="text-sm font-heading font-semibold text-primary">Lock this in — book a free consultation</span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
