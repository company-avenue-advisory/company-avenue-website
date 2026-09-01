"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info, ArrowRight, ArrowLeft, RefreshCw, Landmark, BadgeIndianRupee, AlertTriangle, Check, Plus, Minus } from "lucide-react";
import Link from "next/link";
import {
  PRO_FEES, DSC_PER_PERSON, NAME_RESERVATION, NAME_APPROVAL_LLP, PAN_TAN, GST_RATE,
  GOVT_FEES, STATE_NAMES, getStampRule, incorporationCost,
  llpFillipFee, llpForm3Fee, llpAgreementStampDuty, getLlpStampRule,
  LLP_DPIN_FEE, LLP_FRANKING_NOTARY, NIL_FEE_THRESHOLD,
  incorporationProfessionalFee, FEE_CARD_CEILING, inr,
  SETUP_ADDONS,
  type CompanyScale,
} from "@/lib/calc-fees";
import { calcContactHref } from "@/lib/calc-lead";

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

  /* Step 2 is the add-on services step. It is a separate step rather than more
     controls under the entity/state/capital block — that screen is already
     dense, and the add-ons only make sense once a base cost exists. */
  const [step, setStep] = useState<1 | 2>(1);

  /** Add-on id → quantity. Absent or 0 = not selected. Everything starts off. */
  const [addons, setAddons] = useState<Record<string, number>>({});

  const toggleAddon = (id: string) =>
    setAddons((p) => ({ ...p, [id]: p[id] ? 0 : 1 }));

  const setAddonQty = (id: string, qty: number) =>
    setAddons((p) => ({ ...p, [id]: Math.max(1, Math.min(20, qty)) }));

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

  /* ── add-ons ──────────────────────────────────────────────────────────────
     Kept in its own memo, deliberately: `res` above is the base registration
     engine and its numbers are verified against the client workbooks. Layering
     add-ons on top rather than inside it means the base figures for all six
     entity types are provably unchanged by this step.

     Add-ons are our own professional services, so they sit on the taxable side
     of the invoice alongside the DSC and our fee — never in the pure-agent
     government pass-through. */
  const addonRes = useMemo(() => {
    const picked = SETUP_ADDONS
      .filter((a) => (addons[a.id] ?? 0) > 0)
      .map((a) => {
        const qty = addons[a.id] ?? 1;
        return { ...a, qty, amount: a.fee * qty };
      });
    const subtotal = picked.reduce((sum, a) => sum + a.amount, 0);
    return { picked, subtotal, gst: Math.round(subtotal * GST_RATE) };
  }, [addons]);

  const grandTotal = res.total + addonRes.subtotal + addonRes.gst;

  /* ── T8: carry the whole configuration into /contact ── */
  const contactHref = calcContactHref({
    service: "Company Registration",
    from: "Business Setup Calculator",
    rows: [
      { label: "Structure", value: cfg.label },
      { label: "State", value: state },
      ...(needsCapital
        ? [{ label: entity === "llp" || entity === "partnership" ? "Capital contribution" : "Authorised capital", value: inr(cap) }]
        : []),
      ...(needsPeople
        ? [{ label: entity === "llp" ? "Designated partners" : entity === "partnership" ? "Partners" : "Directors / promoters", value: String(dsc) }]
        : []),
      ...(isCompany ? [{ label: "Name reservation", value: nameReservation ? "Yes — SPICe+ Part A" : "No — name already approved" }] : []),
      {
        label: "Add-ons",
        value: addonRes.picked.length
          ? addonRes.picked.map((a) => `${a.label}${a.qty > 1 ? ` × ${a.qty}` : ""} (${inr(a.amount)})`).join(", ")
          : "None selected",
      },
      { label: "Government fees (no GST)", value: inr(res.passThrough) },
      { label: "Our fees, DSC and add-ons incl. GST", value: inr(grandTotal - res.passThrough) },
    ],
    total: `${inr(grandTotal)} all-in`,
  });

  const capitalLabel = entity === "llp" || entity === "partnership" ? "Capital contribution (₹)" : "Authorised share capital (₹)";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        {/* Step rail. Both steps stay clickable — someone on the add-ons step
            must be able to go back and change their capital without losing it. */}
        <div className="flex items-center gap-2">
          {([
            { n: 1 as const, label: "Registration" },
            { n: 2 as const, label: "Add-on services" },
          ]).map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => setStep(s.n)}
                aria-current={step === s.n ? "step" : undefined}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors ${
                  step === s.n ? "bg-primary text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className={`w-5 h-5 shrink-0 rounded-full grid place-items-center text-[10px] font-heading font-bold ${
                  step === s.n ? "bg-white/20 text-white" : "bg-white text-slate-500 border border-slate-200"
                }`}>{s.n}</span>
                <span className="text-[11px] font-heading font-semibold whitespace-nowrap">{s.label}</span>
              </button>
              {i === 0 && <span className="h-px flex-1 bg-slate-200" />}
            </div>
          ))}
        </div>

        {step === 1 && (
        <>
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

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setCapital("1500000"); setPeople("2"); setState("Delhi"); setEntity("pvtltd"); setSmallCompany(true); setNameReservation(true); setNewDpin("0"); setAddons({}); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-800 transition-colors"
          >
            Add services <ArrowRight size={14} />
          </button>
        </div>
        </>
        )}

        {/* ── Step 2: add-on services ──────────────────────────────────────────
            Rates come from SETUP_ADDONS in lib/calc-fees, which derives them from
            the same ADDON_SERVICES / PRO_FEES tables that /pricing's add-on table
            and each service page read. Nothing is typed in twice here. */}
        {step === 2 && (
        <>
        <div>
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Add-on services</p>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Optional, and nothing is pre-selected. These are our bundled rates — what you pay
            when they are set up alongside the registration rather than bought on their own.
            The total updates as you pick.
          </p>
        </div>

        <div className="space-y-2">
          {SETUP_ADDONS.map((a) => {
            const qty = addons[a.id] ?? 0;
            const on = qty > 0;
            return (
              <div
                key={a.id}
                className={`rounded-xl border transition-all ${on ? "bg-primary/[0.06] border-primary/30" : "bg-slate-50 border-slate-200"}`}
              >
                <button
                  type="button"
                  onClick={() => toggleAddon(a.id)}
                  aria-pressed={on}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left"
                >
                  <span className={`mt-0.5 w-4 h-4 shrink-0 rounded border grid place-items-center ${on ? "bg-primary border-primary text-white" : "border-slate-300 bg-white"}`}>
                    {on && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-heading font-semibold text-dark">{a.label}</span>
                    <span className="block text-[11px] text-muted leading-snug">{a.note}</span>
                    {a.govtNote && (
                      <span className="block text-[11px] text-amber-700 leading-snug mt-0.5">{a.govtNote}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-[13px] font-heading font-bold text-dark whitespace-nowrap">{inr(a.fee)}</span>
                    {a.unit && <span className="block text-[10px] text-muted whitespace-nowrap">{a.unit}</span>}
                  </span>
                </button>

                {/* Quantity only where the unit makes one meaningful — trademark
                    classes and months of bookkeeping. */}
                {on && a.unit && (
                  <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-1 border-t border-primary/15">
                    <span className="text-[11px] text-muted">{a.unit.replace("per ", "How many ")}{a.unit === "per class" ? "es" : "s"}?</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button" aria-label="Fewer"
                        onClick={() => setAddonQty(a.id, qty - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white grid place-items-center text-slate-600 hover:border-primary hover:text-primary transition-colors"
                      ><Minus size={12} /></button>
                      <span className="w-8 text-center text-[13px] font-heading font-bold text-dark">{qty}</span>
                      <button
                        type="button" aria-label="More"
                        onClick={() => setAddonQty(a.id, qty + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white grid place-items-center text-slate-600 hover:border-primary hover:text-primary transition-colors"
                      ><Plus size={12} /></button>
                      <span className="ml-1.5 text-[13px] font-heading font-bold text-primary whitespace-nowrap">{inr(a.fee * qty)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-muted leading-relaxed">
          Add-ons are our professional fees and carry 18% GST, same as the registration fee.
          Any government fee on an add-on is charged at cost on top.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Registration details
          </button>
          {addonRes.picked.length > 0 && (
            <button
              onClick={() => setAddons({})}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              <RefreshCw size={14} /> Clear add-ons
            </button>
          )}
        </div>
        </>
        )}
      </div>

      {/* ── Result ── */}
      <div data-calc-result className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div
          key={`${entity}-${state}-${capital}-${people}-${smallCompany}-${nameReservation}-${newDpin}-${JSON.stringify(addons)}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Your estimated cost</p>

          <div className="rounded-2xl bg-primary p-5 text-center">
            <p className="text-white/60 text-xs font-heading font-medium mb-1">
              {addonRes.picked.length > 0 ? "All-in, registration + add-ons, including GST" : "All-in, including GST"}
            </p>
            <p className="text-white font-heading font-bold text-4xl">{inr(grandTotal)}</p>
            {addonRes.picked.length > 0 && (
              <p className="text-white/50 text-[11px] mt-1">
                {inr(res.total)} registration + {inr(addonRes.subtotal + addonRes.gst)} add-ons
              </p>
            )}
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
                  <BadgeIndianRupee size={11} /> {addonRes.picked.length > 0 ? "DSC, fees + add-ons" : "DSC + our fee"}
                </p>
                <p className="text-white font-heading font-bold text-lg">{inr(res.ourSide + addonRes.subtotal + addonRes.gst)}</p>
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

          {/* Add-ons listed separately so it stays obvious which part of the
              total is the registration and which part the visitor opted into. */}
          {addonRes.picked.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest pt-2">Add-on services</p>
              {addonRes.picked.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-primary/[0.06] border border-primary/20">
                  <div className="min-w-0">
                    <p className="text-[13px] font-heading font-semibold text-dark">
                      {a.label}{a.qty > 1 ? ` × ${a.qty}` : ""}
                    </p>
                    <p className="text-[11px] text-muted leading-snug">{a.note}</p>
                  </div>
                  <span className="font-heading font-bold text-[13px] text-dark whitespace-nowrap">{inr(a.amount)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-accent/[0.07] border border-accent/15">
                <div className="min-w-0">
                  <p className="text-[13px] font-heading font-semibold text-dark">GST @ 18% on add-ons</p>
                  <p className="text-[11px] text-muted leading-snug">On {inr(addonRes.subtotal)} of professional fees</p>
                </div>
                <span className="font-heading font-bold text-[13px] text-dark whitespace-nowrap">{inr(addonRes.gst)}</span>
              </div>
            </div>
          )}

          {step === 1 && addonRes.picked.length === 0 && (
            <button
              onClick={() => setStep(2)}
              className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors group"
            >
              <span className="text-left">
                <span className="block text-[13px] font-heading font-semibold text-dark">Need GST, MSME or a trademark too?</span>
                <span className="block text-[11px] text-muted">Add them at our bundled rates and see the full first-year cost</span>
              </span>
              <ArrowRight size={14} className="text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          <div className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Info size={13} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              MCA fees and stamp duty are recovered at actuals as a pure agent under Rule 33 of
              the CGST Rules, 2017 — no GST is added to them. GST at 18% applies only to the
              Digital Signatures, our professional fee
              {entity === "llp" ? " and the franking and notarisation charge" : ""}.
            </p>
          </div>

          {/* T8: carries entity, State, capital, directors, add-ons and the computed
              total into /contact, where they pre-fill the form. Editable there. */}
          <Link
            href={contactHref}
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
