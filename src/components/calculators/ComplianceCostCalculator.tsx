"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Info, RefreshCw } from "lucide-react";

type EntityType = "pvtltd" | "opc" | "llp" | "partnership" | "proprietorship";

const ENTITY_TYPES: { key: EntityType; label: string; desc: string; peopleLabel: string | null }[] = [
  { key: "pvtltd", label: "Private Limited", desc: "AOC-4, MGT-7, audit, DIR-3 KYC", peopleLabel: "Number of Directors" },
  { key: "opc", label: "One Person Company", desc: "Same ROC filings, single director", peopleLabel: null },
  { key: "llp", label: "LLP", desc: "Form 11, Form 8, ITR-5", peopleLabel: "Number of Designated Partners" },
  { key: "partnership", label: "Partnership Firm", desc: "No ROC filing, ITR-5 only", peopleLabel: "Number of Partners" },
  { key: "proprietorship", label: "Sole Proprietorship", desc: "ITR only, simplest compliance", peopleLabel: null },
];

// Standard MCA e-form fee schedule (Companies Registration Offices & Fees Rules) —
// same slab structure used for AOC-4, MGT-7/7A and LLP Form 11/8.
function rocSlabFee(capitalOrContribution: number): number {
  if (capitalOrContribution <= 1_00_000) return 200;
  if (capitalOrContribution <= 5_00_000) return 300;
  if (capitalOrContribution <= 25_00_000) return 400;
  if (capitalOrContribution <= 1_00_00_000) return 500;
  return 600;
}

function taxAuditFee(turnover: number): number {
  if (turnover <= 1_00_00_000) return 8_000;
  if (turnover <= 5_00_00_000) return 15_000;
  if (turnover <= 10_00_00_000) return 25_000;
  return 40_000;
}

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

interface BreakdownItem {
  label: string;
  note: string;
  govtFee: number;
  professionalFee: number;
}

export function ComplianceCostCalculator() {
  const [entityType, setEntityType] = useState<EntityType>("llp");
  const [people, setPeople] = useState("2");
  const [capital, setCapital] = useState(""); // authorised capital / LLP contribution
  const [turnover, setTurnover] = useState("");
  const [mostlyDigital, setMostlyDigital] = useState(true);
  const [gstRegistered, setGstRegistered] = useState(false);
  const [gstFrequency, setGstFrequency] = useState<"monthly" | "quarterly">("quarterly");
  const [employees, setEmployees] = useState("0");
  const [result, setResult] = useState<{ items: BreakdownItem[]; total: number } | null>(null);

  const config = ENTITY_TYPES.find((e) => e.key === entityType)!;

  function calculate() {
    const capitalNum = parseFloat(capital) || 1_00_000;
    const turnoverNum = parseFloat(turnover) || 0;
    const peopleNum = Math.max(1, parseInt(people) || 1);
    const employeeNum = parseInt(employees) || 0;
    const items: BreakdownItem[] = [];

    const auditThreshold = mostlyDigital ? 10_00_00_000 : 1_00_00_000;
    const needsTaxAudit = turnoverNum > auditThreshold;

    if (entityType === "pvtltd" || entityType === "opc") {
      const rocFee = rocSlabFee(capitalNum);
      items.push({ label: "AOC-4 — Filing of Financial Statements", note: `ROC govt fee (capital ${formatINR(capitalNum)} slab)`, govtFee: rocFee, professionalFee: 3_000 });
      items.push({ label: "MGT-7 / MGT-7A — Annual Return", note: "ROC govt fee, same capital slab", govtFee: rocFee, professionalFee: 3_000 });
      items.push({ label: "Statutory Audit", note: "Mandatory every year regardless of turnover", govtFee: 0, professionalFee: 8_000 });
      const kycCount = entityType === "opc" ? 1 : peopleNum;
      items.push({ label: `DIR-3 KYC (${kycCount} director${kycCount > 1 ? "s" : ""})`, note: "Annual director KYC — ₹5,000 penalty per director if missed", govtFee: 0, professionalFee: 500 * kycCount });
      items.push({ label: "Secretarial Compliance (Board Meetings & Minutes)", note: "Minimum 4 board meetings/year, statutory registers", govtFee: 0, professionalFee: 4_000 });
      items.push({ label: "Income Tax Return (ITR-6)", note: "Mandatory corporate ITR filing", govtFee: 0, professionalFee: 5_000 });
    }

    if (entityType === "llp") {
      const rocFee = rocSlabFee(capitalNum);
      items.push({ label: "Form 11 — Annual Return", note: `ROC govt fee (contribution ${formatINR(capitalNum)} slab)`, govtFee: rocFee, professionalFee: 2_000 });
      items.push({ label: "Form 8 — Statement of Account & Solvency", note: "ROC govt fee, same contribution slab", govtFee: rocFee, professionalFee: 2_500 });
      items.push({ label: `DIR-3 KYC (${peopleNum} designated partner${peopleNum > 1 ? "s" : ""})`, note: "Annual KYC for designated partners", govtFee: 0, professionalFee: 500 * peopleNum });
      items.push({ label: "Income Tax Return (ITR-5)", note: "Mandatory LLP ITR filing", govtFee: 0, professionalFee: 4_000 });
    }

    if (entityType === "partnership") {
      items.push({ label: "Income Tax Return (ITR-5)", note: "No ROC filing required — firm is not MCA-registered", govtFee: 0, professionalFee: 3_000 });
    }

    if (entityType === "proprietorship") {
      items.push({ label: "Income Tax Return (ITR-3/4)", note: "Filed under the proprietor's own PAN", govtFee: 0, professionalFee: 2_000 });
    }

    if (needsTaxAudit) {
      items.push({
        label: "Tax Audit (Section 44AB)",
        note: mostlyDigital
          ? "Turnover exceeds ₹10 Cr digital-transactions threshold"
          : "Turnover exceeds ₹1 Cr threshold",
        govtFee: 0,
        professionalFee: taxAuditFee(turnoverNum),
      });
    }

    if (gstRegistered) {
      if (gstFrequency === "monthly") {
        items.push({ label: "GST Return Filing (GSTR-1 + 3B, monthly)", note: "12 filings/year", govtFee: 0, professionalFee: 1_000 * 12 });
      } else {
        items.push({ label: "GST Return Filing (QRMP scheme, quarterly)", note: "Eligible since turnover < ₹5 Cr", govtFee: 0, professionalFee: 800 * 4 + 1_500 });
      }
      if (turnoverNum > 2_00_00_000) {
        items.push({ label: "GSTR-9 — Annual Return", note: "Mandatory above ₹2 Cr turnover", govtFee: 0, professionalFee: 3_000 });
      }
      if (turnoverNum > 5_00_00_000) {
        items.push({ label: "GSTR-9C — Reconciliation Statement", note: "Mandatory above ₹5 Cr turnover, CA-certified", govtFee: 0, professionalFee: 5_000 });
      }
    }

    if (employeeNum >= 20) {
      items.push({ label: "PF (EPFO) — Monthly ECR Filing", note: "Mandatory once headcount reaches 20", govtFee: 0, professionalFee: 1_000 * 12 });
    }
    if (employeeNum >= 10) {
      items.push({ label: "ESI — Monthly Contribution Filing", note: "Mandatory once headcount reaches 10 (wages < ₹21,000/month)", govtFee: 0, professionalFee: 800 * 12 });
    }

    const total = items.reduce((sum, i) => sum + i.govtFee + i.professionalFee, 0);
    setResult({ items, total });
  }

  function reset() {
    setResult(null);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      {/* Entity type */}
      <p className="text-xs font-heading font-semibold text-muted mb-3">Business Structure</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {ENTITY_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => { setEntityType(t.key); setResult(null); }}
            className={`text-left p-3 rounded-xl border text-xs transition-colors ${
              entityType === t.key ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/30"
            }`}
          >
            <p className="font-heading font-bold text-dark">{t.label}</p>
            <p className="text-muted text-[10px] mt-0.5 leading-snug">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {config.peopleLabel && (
          <div>
            <label className="block text-xs font-heading font-semibold text-muted mb-1.5">{config.peopleLabel}</label>
            <input
              type="number"
              min={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        )}
        {(entityType === "pvtltd" || entityType === "opc" || entityType === "llp") && (
          <div>
            <label className="block text-xs font-heading font-semibold text-muted mb-1.5">
              {entityType === "llp" ? "LLP Contribution (₹)" : "Authorised Capital (₹)"}
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="e.g. 100000"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">Annual Turnover (₹)</label>
          <input
            type="number"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            placeholder="e.g. 5000000"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">Number of Employees</label>
          <input
            type="number"
            min={0}
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        <label className="flex items-center gap-2 text-xs font-heading font-medium text-dark cursor-pointer">
          <input type="checkbox" checked={gstRegistered} onChange={(e) => setGstRegistered(e.target.checked)} className="accent-primary" />
          GST Registered
        </label>
        {gstRegistered && (
          <div className="flex items-center gap-2">
            {(["quarterly", "monthly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setGstFrequency(f)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-heading font-semibold capitalize transition-colors ${
                  gstFrequency === f ? "bg-primary text-white" : "bg-slate-50 text-muted"
                }`}
              >
                {f} (GSTR-1/3B)
              </button>
            ))}
          </div>
        )}
        <label className="flex items-center gap-2 text-xs font-heading font-medium text-dark cursor-pointer">
          <input type="checkbox" checked={mostlyDigital} onChange={(e) => setMostlyDigital(e.target.checked)} className="accent-primary" />
          &gt;95% digital transactions (raises tax-audit threshold to ₹10 Cr)
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
        >
          <ClipboardCheck size={16} />
          Calculate Compliance Cost
        </button>
        {result && (
          <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-3 text-muted hover:text-primary text-sm font-heading font-medium transition-colors">
            <RefreshCw size={14} /> Reset
          </button>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-slate-50 text-[11px] font-heading font-semibold uppercase tracking-wide text-muted">
                <span>Compliance Item</span>
                <span className="text-right w-24">Govt Fee</span>
                <span className="text-right w-28">Professional Fee</span>
              </div>
              {result.items.map((item, i) => (
                <div key={i} className="grid sm:grid-cols-[1fr_auto_auto] gap-1 sm:gap-4 px-5 py-3.5 border-t border-slate-50 text-sm">
                  <div>
                    <p className="font-heading font-semibold text-dark">{item.label}</p>
                    <p className="text-muted text-xs mt-0.5">{item.note}</p>
                  </div>
                  <span className="text-right w-24 text-dark font-medium">{item.govtFee > 0 ? formatINR(item.govtFee) : "—"}</span>
                  <span className="text-right w-28 text-dark font-medium">{formatINR(item.professionalFee)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-5 py-4 bg-primary/5">
                <span className="font-heading font-bold text-dark">Total Estimated Annual Compliance Cost</span>
                <span className="font-heading font-bold text-primary text-lg">{formatINR(result.total)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-muted">
              <Info size={14} className="shrink-0 mt-0.5" />
              Estimates only — actual government fees follow MCA/GST slab rules exactly, but
              professional fees vary by firm and complexity. Presumptive taxation (44AD/44ADA)
              and sector-specific exemptions are not modelled here. Talk to us for an exact quote.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
