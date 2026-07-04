"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, CheckCircle, Plus, Minus,
  Download, MessageCircle, AlertTriangle, FileText, CreditCard,
  Hash, Zap, Building2, Users, Globe, Briefcase, Monitor,
  Award, DollarSign, Headphones, UserCheck, LifeBuoy, Receipt,
  BookOpen, CalendarCheck, ShieldCheck, TrendingUp, Repeat2,
  PenLine, BadgeCheck, AlertCircle, Info, Bell, Activity,
  ArrowDown, ChevronRight, BarChart3, RefreshCcw, Layers, ShoppingBag,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const heroSnapshot = [
  { label: "Returns Covered",    value: "GSTR-1, 3B, CMP-08, GSTR-9" },
  { label: "Filing Frequency",   value: "Monthly / Quarterly / Annual" },
  { label: "Penalty Risk",       value: "Late Fee + Interest" },
  { label: "Compliance Status",  value: "Mandatory" },
];

const quickFacts = [
  { icon: FileText,     label: "Return Types",    value: "Multiple" },
  { icon: CalendarCheck,label: "Frequency",       value: "Monthly / Quarterly" },
  { icon: AlertCircle,  label: "Late Fee",        value: "Applicable" },
  { icon: TrendingUp,   label: "Interest",        value: "18% p.a." },
  { icon: BookOpen,     label: "Annual Return",   value: "Mandatory*" },
  { icon: Monitor,      label: "Process",         value: "100% Online" },
];

const returnCards = [
  { id: "gstr1",  title: "GSTR-1",   sub: "Monthly / Quarterly", color: "bg-blue-50 border-blue-200",   badge: "bg-blue-600 text-white",   desc: "Details of all outward taxable supplies and sales invoices issued during the period." },
  { id: "gstr3b", title: "GSTR-3B",  sub: "Monthly / Quarterly", color: "bg-primary/5 border-primary/20", badge: "bg-primary text-white",   desc: "Summary return declaring tax liability, ITC claimed, and net GST payable to the government." },
  { id: "gstr9",  title: "GSTR-9",   sub: "Annual",              color: "bg-green-50 border-green-200",  badge: "bg-green-600 text-white",   desc: "Annual consolidated return filed by regular taxpayers summarising the full year's GST data." },
  { id: "gstr4",  title: "GSTR-4",   sub: "Annual (Composition)",color: "bg-purple-50 border-purple-200",badge: "bg-purple-600 text-white", desc: "Annual return for composition scheme taxpayers, detailing turnover and tax paid." },
  { id: "cmp08",  title: "CMP-08",   sub: "Quarterly",           color: "bg-amber-50 border-amber-200",  badge: "bg-amber-600 text-white",   desc: "Quarterly challan-cum-statement for composition dealers to declare and pay tax." },
  { id: "gstr78", title: "GSTR-7/8", sub: "Monthly (TDS/TCS)",   color: "bg-rose-50 border-rose-200",    badge: "bg-rose-600 text-white",   desc: "Returns filed by TDS deductors (GSTR-7) and e-commerce operators collecting TCS (GSTR-8)." },
];

const filingSteps = [
  { n: "01", title: "Collect Sales & Purchase Data",    desc: "Gather all sales invoices, purchase bills, credit notes, and debit notes for the period." },
  { n: "02", title: "Invoice Verification",             desc: "Verify invoice numbers, GSTIN of suppliers and customers, HSN/SAC codes, and tax rates." },
  { n: "03", title: "Input Tax Credit Reconciliation",  desc: "Match purchase invoices with GSTR-2B to confirm eligible ITC before claiming it." },
  { n: "04", title: "Return Preparation",               desc: "Prepare GSTR-1 (outward supplies) and GSTR-3B (tax summary) based on verified data." },
  { n: "05", title: "Client Approval",                  desc: "Share the draft return for your review and approval before submission." },
  { n: "06", title: "GST Portal Filing",                desc: "File the approved return on the GST portal and pay the net tax liability." },
  { n: "07", title: "Acknowledgement Delivered",        desc: "Share the filed return acknowledgement, ARN, and compliance status confirmation." },
];

const requiredDocs = [
  { icon: Hash,       label: "GSTIN" },
  { icon: FileText,   label: "Sales Register" },
  { icon: BookOpen,   label: "Purchase Register" },
  { icon: Receipt,    label: "Invoices (Sales & Purchase)" },
  { icon: DollarSign, label: "Expense Records" },
  { icon: CreditCard, label: "Bank Statements" },
  { icon: Layers,     label: "E-way Bills (if applicable)" },
  { icon: RefreshCcw, label: "Previous Filed Returns" },
  { icon: BarChart3,  label: "ITC Credit Ledger Details" },
];

const penaltyData = [
  { icon: AlertTriangle, title: "Late Filing Fee",        desc: "₹50/day (₹25 CGST + ₹25 SGST) for regular returns. ₹20/day for Nil returns.", color: "text-red-600 bg-red-50" },
  { icon: TrendingUp,    title: "Interest @ 18% p.a.",    desc: "Interest applies on the unpaid tax amount from the due date until actual payment.", color: "text-orange-600 bg-orange-50" },
  { icon: ShieldCheck,   title: "ITC Blocking",           desc: "Recipients cannot claim ITC if the supplier has not filed returns, creating a compliance chain effect.", color: "text-amber-600 bg-amber-50" },
  { icon: Bell,          title: "Department Notices",     desc: "Habitual non-filers receive show cause notices and may face assessment proceedings.", color: "text-purple-600 bg-purple-50" },
  { icon: AlertCircle,   title: "GST Registration Risk",  desc: "Continuous non-filing can lead to suspension or cancellation of GST registration.", color: "text-rose-600 bg-rose-50" },
  { icon: Activity,      title: "Business Compliance",    desc: "Non-compliance affects business credibility, bank financing, and tender eligibility.", color: "text-blue-600 bg-blue-50" },
];

const whyTimely = [
  { icon: DollarSign,   title: "Avoid Late Fees",              desc: "Every day of delay adds ₹50 in late fees (₹20 for Nil returns). Timely filing eliminates this cost entirely." },
  { icon: ShieldCheck,  title: "Maintain GST Compliance",      desc: "Active compliance status ensures your GSTIN remains valid for business operations." },
  { icon: BarChart3,    title: "Claim Input Tax Credit",        desc: "ITC is available only when GSTR-2B reflects matched invoices. Delays affect your cash flow." },
  { icon: Award,        title: "Improve Business Credibility",  desc: "Clean compliance history builds trust with banks, vendors and government departments." },
  { icon: AlertCircle,  title: "Avoid Department Notices",     desc: "Regular filers are less likely to receive scrutiny notices and departmental audits." },
  { icon: BookOpen,     title: "Simplify Annual Audit",        desc: "Consistently filed monthly returns make year-end reconciliation and GSTR-9 preparation seamless." },
];

const annualCompliance = [
  { icon: FileText,     title: "Monthly Filing",        sub: "GSTR-1 & GSTR-3B",      desc: "File by 11th & 20th of every month for regular taxpayers." },
  { icon: CalendarCheck,title: "Quarterly Filing",      sub: "QRMP Scheme",            desc: "GSTR-1 quarterly + IFF + GSTR-3B quarterly under QRMP." },
  { icon: BookOpen,     title: "Annual Return",         sub: "GSTR-9 by Dec 31",       desc: "Mandatory annual consolidation of all GST data for the financial year." },
  { icon: RefreshCcw,   title: "Books Reconciliation",  sub: "Ongoing",                desc: "Monthly reconciliation of GSTR-2B with purchase register for ITC accuracy." },
  { icon: ShieldCheck,  title: "Audit (where applicable)", sub: "GSTR-9C",             desc: "Self-certified reconciliation statement for turnover above ₹5 crore." },
  { icon: Layers,       title: "Record Maintenance",    sub: "6 Years",                desc: "Mandatory to maintain GST books and invoices for a minimum of 6 years." },
];

const commonMistakes = [
  { title: "Incorrect GSTIN in Invoices",   desc: "Using wrong GSTIN of suppliers or customers leads to ITC mismatch and rejection. Always verify before filing." },
  { title: "Wrong Invoice Values",          desc: "Incorrect taxable values, tax amounts, or invoice numbers create discrepancies between GSTR-1 and GSTR-3B." },
  { title: "Missing or Incorrect ITC",      desc: "Claiming ITC on invoices not reflected in GSTR-2B or on ineligible expenses (personal, blocked credits) leads to demand notices." },
  { title: "Late Filing",                   desc: "Even one day's delay attracts late fees. Set up reminders or use our managed compliance service to never miss a deadline." },
  { title: "Wrong HSN/SAC Codes",           desc: "Incorrect product or service classification affects tax rates, e-way bill requirements and annual return reconciliation." },
  { title: "Duplicate Invoices",            desc: "Filing the same invoice twice inflates your tax liability. Always validate data before portal submission." },
  { title: "Ignoring Reconciliation",       desc: "Not reconciling GSTR-2B with purchase register monthly results in year-end mismatches and potential ITC reversal." },
];

const whyUsPoints = [
  { icon: Award,       label: "Experienced GST Experts with 15+ Years" },
  { icon: UserCheck,   label: "Dedicated Compliance Manager" },
  { icon: Bell,        label: "Automated Filing Reminders" },
  { icon: RefreshCcw,  label: "Invoice Reconciliation Included" },
  { icon: DollarSign,  label: "Transparent, Fixed Pricing" },
  { icon: LifeBuoy,    label: "Year-round Compliance Support" },
  { icon: Monitor,     label: "100% Digital Process" },
  { icon: Headphones,  label: "24-Hour Average Response Time" },
];

const complianceJourney = [
  { step: "01", title: "GST Registration",        link: "/services/gst-registration",    desc: "Obtain GSTIN for your business" },
  { step: "02", title: "GST Return Filing",        link: "/services/gst-filing",          desc: "Monthly, quarterly & annual returns", active: true },
  { step: "03", title: "Accounting & Bookkeeping", link: "/services/accounting-bookkeeping", desc: "Accurate books & financial records" },
  { step: "04", title: "Annual Compliance",        link: "/services/annual-filing",       desc: "ROC filings & statutory compliance" },
  { step: "05", title: "Income Tax Filing",        link: "/services/income-tax-return",   desc: "ITR for individuals & businesses" },
];

const relatedServices = [
  { id: "gst-registration",      title: "GST Registration",        desc: "Obtain your GSTIN quickly." },
  { id: "accounting-bookkeeping",title: "Accounting & Bookkeeping",desc: "Books, MIS & statements." },
  { id: "payroll-management",    title: "Payroll Management",      desc: "Salaries & statutory compliance." },
  { id: "tds-return",            title: "TDS Return Filing",       desc: "Quarterly TDS returns." },
  { id: "income-tax-return",     title: "Income Tax Return",       desc: "ITR for all business types." },
  { id: "roc-compliance",        title: "Annual Compliance",       desc: "ROC filings & secretarial." },
];

const faqs = [
  { q: "What is a GST Return?", a: "A GST Return is a document every GST-registered taxpayer must file with the tax authorities. It contains details of sales, purchases, tax collected on sales (output tax), and tax paid on purchases (input tax credit). Returns are filed monthly, quarterly, or annually depending on the taxpayer category." },
  { q: "Who needs to file GST returns?", a: "Every GST-registered business must file returns, including regular taxpayers, composition dealers, e-commerce operators, non-resident taxable persons, and input service distributors. Even if there is no business activity, a Nil Return must be filed." },
  { q: "What is GSTR-1?", a: "GSTR-1 is a monthly or quarterly return containing details of all outward taxable supplies (sales). It includes B2B invoices, B2C invoices, credit/debit notes, and export details. Regular taxpayers with turnover above ₹5 crore file monthly; others may opt for quarterly filing under QRMP." },
  { q: "What is GSTR-3B?", a: "GSTR-3B is a monthly or quarterly self-declared summary return where taxpayers declare their total tax liability, input tax credit claimed, and net tax payable. It must be filed along with the tax payment by the 20th of the following month (regular taxpayers)." },
  { q: "What is GSTR-9?", a: "GSTR-9 is the annual GST return filed by regular taxpayers consolidating all monthly/quarterly returns filed during the financial year. It must be filed by December 31st following the end of the financial year. It is mandatory for taxpayers with turnover above ₹2 crore." },
  { q: "Can I file a Nil Return?", a: "Yes. If there are no sales or purchases during a period, you must file a Nil Return (GSTR-1 and GSTR-3B with zero values). Failing to file even a Nil Return attracts late fees of ₹20/day (₹10 CGST + ₹10 SGST)." },
  { q: "What happens if I miss the due date?", a: "Late filing attracts a fee of ₹50/day (₹25 CGST + ₹25 SGST) for regular returns, subject to a maximum cap. For Nil returns, the fee is ₹20/day. Additionally, interest @ 18% per annum applies on any unpaid tax from the due date." },
  { q: "How much is the GST late fee?", a: "₹50/day for regular returns (₹25 CGST + ₹25 SGST). ₹20/day for Nil returns (₹10 CGST + ₹10 SGST). The government periodically introduces amnesty schemes to waive late fees for older returns — we help you take advantage of such schemes." },
  { q: "Can I revise GST returns?", a: "GSTR-3B cannot be revised once filed. However, corrections to GSTR-1 can be made in subsequent periods through amendments. For significant errors, rectification through amended returns in the next filing period is the standard approach." },
  { q: "How is Input Tax Credit (ITC) claimed?", a: "ITC is claimed in GSTR-3B based on invoices reflected in your GSTR-2B (auto-populated from supplier filings). You can only claim ITC for invoices where the supplier has filed their GSTR-1 and the amount appears in your GSTR-2B." },
  { q: "What is invoice matching?", a: "Invoice matching is the process of reconciling your purchase records with GSTR-2B data. It ensures that the ITC you claim matches what suppliers have reported. Mismatches can lead to ITC rejection and demand notices from the GST department." },
  { q: "Do I need to file returns if there are no sales?", a: "Yes. Even if there are zero sales in a period, a Nil Return must be filed. Failure to file attracts late fees regardless of whether you had any business activity or not." },
  { q: "Can I file returns myself?", a: "Yes, you can file on the GST portal (gst.gov.in). However, professional filing ensures accurate data entry, ITC reconciliation, HSN/SAC validation, and timely submission — minimising the risk of errors, notices, and penalties." },
  { q: "What documents are required for filing?", a: "Sales register, purchase register, all invoices (sales and purchase), bank statements, e-way bills, expense records, and previous filed return data. We provide a complete checklist upon engagement." },
  { q: "Can Company Avenue file monthly returns on my behalf?", a: "Yes. We offer monthly, quarterly, and annual GST return filing packages. Your dedicated compliance manager collects data, reconciles ITC, prepares the return, gets your approval, and files — all on time." },
  { q: "What is the annual GST return (GSTR-9)?", a: "GSTR-9 is an annual return consolidating all GSTR-1 and GSTR-3B data for the financial year. It reconciles reported figures, highlights discrepancies, and is due by December 31st. It is mandatory for taxpayers with annual turnover above ₹2 crore." },
  { q: "Is GST audit mandatory?", a: "GSTR-9C (self-certified reconciliation statement) is required for taxpayers with annual turnover above ₹5 crore. It reconciles books of accounts with the annual return and does not require a CA certificate (since 2021) but must be accurate." },
  { q: "How long should GST records be maintained?", a: "GST records including invoices, returns, tax payment challans, and books of accounts must be maintained for a minimum of 6 years from the due date of the annual return for the relevant year." },
  { q: "How much does GST return filing cost?", a: "Our monthly GST return filing packages start from ₹499/month. Pricing depends on the number of invoices, return type, and frequency. We offer transparent fixed pricing with no hidden charges. Request a free quote today." },
  { q: "How can I avoid GST penalties?", a: "File returns on or before due dates, ensure ITC reconciliation monthly, use correct HSN/SAC codes, verify GSTINs of counterparties, and engage a professional compliance partner. Our managed compliance service ensures zero late filings." },
];

/* ─── GST Return Finder ─── */
type FinderAnswers = { bizType?: string; activity?: string; frequency?: string };
type Recommendation = { returns: string[]; note: string };

function getRecommendation(a: FinderAnswers): Recommendation {
  if (a.bizType === "composition") return { returns: ["CMP-08 (Quarterly)", "GSTR-4 (Annual)"], note: "Composition dealers pay flat tax quarterly and file GSTR-4 annually." };
  if (a.bizType === "isd")         return { returns: ["GSTR-6 (Monthly)"], note: "Input Service Distributors must file GSTR-6 monthly to distribute ITC." };
  if (a.bizType === "tds")         return { returns: ["GSTR-7 (Monthly)"], note: "TDS deductors under GST must file GSTR-7 by the 10th of every month." };
  if (a.bizType === "ecommerce")   return { returns: ["GSTR-8 (Monthly)", "GSTR-9B (Annual)"], note: "E-commerce operators collecting TCS must file GSTR-8 monthly." };
  if (a.activity === "nil")        return { returns: ["GSTR-1 Nil", "GSTR-3B Nil"], note: "Even with no business activity, Nil returns must be filed on time." };
  if (a.frequency === "quarterly") return { returns: ["GSTR-1 (Quarterly)", "GSTR-3B (Quarterly)", "GSTR-9 (Annual)"], note: "QRMP scheme applies for regular taxpayers with turnover ≤ ₹5 crore." };
  return { returns: ["GSTR-1 (Monthly)", "GSTR-3B (Monthly)", "GSTR-9 (Annual)"], note: "Standard monthly filing for regular GST taxpayers." };
}

const finderSteps = [
  { id: "bizType", q: "What type of GST taxpayer are you?", opts: [
    { label: "Regular Taxpayer",  val: "regular" },
    { label: "Composition Dealer",val: "composition" },
    { label: "E-commerce Operator",val: "ecommerce" },
    { label: "Input Service Distributor", val: "isd" },
    { label: "TDS Deductor",      val: "tds" },
  ]},
  { id: "activity", q: "What describes your business activity this period?", opts: [
    { label: "Sales of Goods",    val: "sales" },
    { label: "Services",          val: "services" },
    { label: "Exports",           val: "exports" },
    { label: "No Business Activity", val: "nil" },
  ]},
  { id: "frequency", q: "What is your filing preference / turnover threshold?", opts: [
    { label: "Monthly (Turnover > ₹5 Cr)",  val: "monthly" },
    { label: "Quarterly (QRMP, ≤ ₹5 Cr)",   val: "quarterly" },
    { label: "Annual Only",                  val: "annual" },
  ]},
];

function ReturnFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [done, setDone] = useState(false);

  const current = finderSteps[step];
  function choose(val: string) {
    const next = { ...answers, [current.id]: val } as FinderAnswers;
    setAnswers(next);
    if (step + 1 < finderSteps.length) setStep(step + 1);
    else setDone(true);
  }
  function reset() { setStep(0); setAnswers({}); setDone(false); }
  const rec = done ? getRecommendation(answers) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-10 shadow-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-heading font-bold text-dark text-lg">GST Return Finder</p>
          <p className="text-muted text-xs mt-0.5">3 quick questions to find your required returns</p>
        </div>
        {(step > 0 || done) && (
          <button onClick={reset} className="text-xs text-muted hover:text-primary transition-colors font-heading font-semibold">Start Over</button>
        )}
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : `${(step / finderSteps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          >
            <p className="font-heading font-semibold text-dark text-base mb-5">
              <span className="text-primary text-sm mr-2">{step + 1}/{finderSteps.length}</span>
              {current.q}
            </p>
            <div className="flex flex-wrap gap-3">
              {current.opts.map((opt) => (
                <motion.button key={opt.val} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => choose(opt.val)}
                  className="px-5 py-2.5 border-2 border-slate-200 rounded-xl font-heading font-semibold text-sm text-dark hover:border-primary hover:bg-primary/5 transition-all"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-5">
              <p className="font-heading font-bold text-dark text-sm mb-3">Your Required GST Returns</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {rec?.returns.map(r => (
                  <span key={r} className="px-3 py-1 bg-primary text-white text-xs font-heading font-bold rounded-full">{r}</span>
                ))}
              </div>
              <p className="text-muted text-xs leading-relaxed flex items-start gap-2">
                <Info size={13} className="shrink-0 mt-0.5 text-primary" />{rec?.note}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
              >
                File My GST Return <ArrowRight size={13} className="inline ml-1" />
              </Link>
              <button onClick={reset}
                className="px-5 py-3 border border-slate-200 text-dark font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
              >
                Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── GST Calendar ─── */
const calendarData = [
  { month: "Jan", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Dec" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Dec" }] },
  { month: "Feb", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Jan" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Jan" }] },
  { month: "Mar", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Feb" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Feb" }, { day: 18, type: "CMP-08", freq: "quarterly", note: "CMP-08 Q3 (Oct–Dec)" }] },
  { month: "Apr", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Mar" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Mar" }] },
  { month: "May", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Apr" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Apr" }] },
  { month: "Jun", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for May" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for May" }, { day: 18, type: "CMP-08", freq: "quarterly", note: "CMP-08 Q4 (Jan–Mar)" }] },
  { month: "Jul", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Jun" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Jun" }] },
  { month: "Aug", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Jul" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Jul" }] },
  { month: "Sep", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Aug" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Aug" }, { day: 18, type: "CMP-08", freq: "quarterly", note: "CMP-08 Q1 (Apr–Jun)" }] },
  { month: "Oct", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Sep" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Sep" }] },
  { month: "Nov", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Oct" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Oct" }] },
  { month: "Dec", dates: [{ day: 11, type: "GSTR-1", freq: "monthly", note: "GSTR-1 for Nov" }, { day: 20, type: "GSTR-3B", freq: "monthly", note: "GSTR-3B for Nov" }, { day: 18, type: "CMP-08", freq: "quarterly", note: "CMP-08 Q2 (Jul–Sep)" }, { day: 31, type: "GSTR-9", freq: "annual", note: "Annual Return for FY" }] },
];

const typeColors: Record<string, string> = {
  "GSTR-1":  "bg-blue-100 text-blue-700 border-blue-200",
  "GSTR-3B": "bg-primary/10 text-primary border-primary/20",
  "CMP-08":  "bg-amber-100 text-amber-700 border-amber-200",
  "GSTR-9":  "bg-green-100 text-green-700 border-green-200",
};

function GSTCalendar() {
  const [filter, setFilter] = useState<"all"|"monthly"|"quarterly"|"annual">("all");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "monthly", "quarterly", "annual"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold border transition-all capitalize ${filter === f ? "bg-primary text-white border-primary" : "border-slate-200 text-muted hover:border-primary hover:text-primary"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {calendarData.map((m) => {
          const filtered = filter === "all" ? m.dates : m.dates.filter(d => d.freq === filter);
          return (
            <motion.div key={m.month} whileHover={{ y: -2 }}
              className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
            >
              <p className="font-heading font-bold text-dark text-sm mb-3">{m.month}</p>
              <div className="space-y-2">
                {filtered.length === 0 ? (
                  <p className="text-muted text-xs italic">No {filter} filings</p>
                ) : filtered.map((d) => (
                  <div key={`${m.month}-${d.day}-${d.type}`}
                    onMouseEnter={() => setHovered(`${m.month}-${d.day}-${d.type}`)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative cursor-default"
                  >
                    <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-[11px] font-heading font-semibold ${typeColors[d.type] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      <span>{d.type}</span>
                      <span>by {d.day}th</span>
                    </div>
                    {hovered === `${m.month}-${d.day}-${d.type}` && (
                      <div className="absolute z-20 left-0 top-full mt-1 w-48 bg-dark text-white text-[11px] rounded-xl p-3 shadow-lg leading-relaxed">
                        <p className="font-heading font-semibold mb-1">{d.type} — Due {d.day}th</p>
                        <p className="text-white/70">{d.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sticky Sidebar ─── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">File GST Returns On Time</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our compliance team handles your returns every month — accurately and on time.</p>
        <div className="space-y-2 mb-5">
          {["Monthly Filing Managed", "ITC Reconciliation", "Zero Late Fees Guarantee", "Dedicated CA Manager"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Consultation
          </Link>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Filing Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete GST return filing checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "10K+", l: "Returns Filed" }, { v: "99%", l: "On-time" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
            <div key={s.l} className="text-center">
              <p className="font-heading font-bold text-primary text-lg leading-none">{s.v}</p>
              <p className="text-muted text-[10px] mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export function GSTFilingPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="gstf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#gstf-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">GST Return Filing</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">GST Compliance Experts • Accurate &amp; Timely Filing</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                GST Return Filing<br /><span className="text-primary">Made Easy</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Never miss another GST due date. We prepare, verify, and file your GST returns accurately while helping you stay compliant and avoid unnecessary penalties.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File GST Return <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to GST Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Expert GST Professionals", "Timely Filing", "ITC Reconciliation", "PAN India Service"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <FileText size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">GST Compliance Snapshot</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {heroSnapshot.map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
                      className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-heading font-semibold text-dark">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Compliance health bar */}
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted font-heading font-semibold">Filing Health</p>
                    <span className="text-xs text-green-600 font-heading font-bold">Compliant</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }} animate={{ width: "92%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wider mb-1">{f.label}</p>
                  <p className="font-heading font-bold text-dark text-sm leading-snug">{f.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT IS GST RETURN FILING ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85"
                  alt="GST return filing and tax compliance"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">10,000+</p>
                <p className="text-white/60 text-xs">Returns Filed</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is GST Return Filing?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                GST Return Filing is the process of reporting <strong>sales, purchases, tax collected, tax paid, and Input Tax Credit</strong> to the GST department. Every registered taxpayer must file applicable returns within prescribed due dates.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Even if there is <strong>no business activity</strong> during the period, a Nil Return must be filed. Non-filing attracts late fees and interest, and can result in ITC blocking for your buyers.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Report Sales & Purchases", "Claim Input Tax Credit", "Maintain Compliance", "Avoid Penalties"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RETURN FINDER ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Return Finder" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Which GST Return Do You Need?</h2>
            <p className="text-muted text-base max-w-lg mx-auto">Answer 3 quick questions to identify your required GST returns and filing schedule.</p>
          </div>
          <ReturnFinder />
        </div>
      </section>

      {/* ── GST RETURNS EXPLAINED ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Returns Explained" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">GST Returns — Complete Guide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {returnCards.map((card, i) => (
              <motion.div key={card.id} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className={`border rounded-2xl p-6 hover:shadow-card transition-all duration-300 group ${card.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${card.badge}`}>{card.sub}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-xl mb-2">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILING CALENDAR ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Due Dates" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">GST Return Filing Calendar</h2>
            <p className="text-muted text-base max-w-lg mx-auto">Hover any date to see return details. Filter by filing frequency below.</p>
          </div>
          <GSTCalendar />
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + STICKY SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* FILING PROCESS */}
            <section>
              <Eyebrow label="Filing Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">GST Return Filing Process — Step by Step</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {filingSteps.map((step, i) => (
                    <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex gap-5 relative"
                    >
                      <div className="w-11 h-11 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                        {step.n}
                      </div>
                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 hover:shadow-card hover:border-primary/15 transition-all duration-300">
                        <p className="font-heading font-bold text-dark text-sm mb-1">{step.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* REQUIRED DOCUMENTS */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">GST Return Filing Checklist</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {requiredDocs.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <motion.div key={doc.label} whileHover={{ x: 4 }}
                        className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <span className="text-dark text-xs font-medium">{doc.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-heading font-semibold text-sm rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Download size={14} /> Download GST Filing Checklist
                  </button>
                </div>
              </div>
            </section>

            {/* ITC EXPLAINER */}
            <section>
              <Eyebrow label="Input Tax Credit" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">How Input Tax Credit (ITC) Works</h2>
              <p className="text-muted text-sm mb-8">ITC allows you to offset GST paid on purchases against GST collected on sales — reducing your actual tax outflow.</p>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                  {[
                    { label: "Purchase Made",        icon: ShoppingBag },
                    { label: "GST Paid",             icon: DollarSign },
                    { label: "Invoice Matching",     icon: RefreshCcw },
                    { label: "ITC Available",        icon: CheckCircle },
                    { label: "Tax Liability Reduced",icon: TrendingUp },
                  ].map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-2">
                            <Icon size={16} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[80px]">{step.label}</p>
                        </div>
                        {i < 4 && <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Important:</strong> Incorrect invoice matching or supplier non-filing may lead to denial of Input Tax Credit and demand notices from the GST department.
                  </p>
                </div>
              </div>
            </section>

            {/* PENALTIES */}
            <section>
              <Eyebrow label="Penalties & Risk" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Consequences of Non-Compliance</h2>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-dark text-sm leading-relaxed">
                  <strong>Warning:</strong> Non-filing of GST returns attracts ₹50/day late fee, 18% annual interest on unpaid tax, ITC blocking, and potential registration cancellation. Protect your compliance record.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {penaltyData.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${p.color}`}>
                        <Icon size={15} />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{p.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* WHY TIMELY */}
            <section>
              <Eyebrow label="Why It Matters" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Why Timely GST Filing Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {whyTimely.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ANNUAL COMPLIANCE */}
            <section>
              <Eyebrow label="Annual Compliance" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">Complete Annual GST Compliance</h2>
              {/* Health Meter */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Fully Compliant", color: "bg-green-500", sub: "All returns filed on time", dot: "bg-green-500" },
                  { label: "Pending Returns", color: "bg-amber-400", sub: "1–2 returns overdue", dot: "bg-amber-400" },
                  { label: "High Risk",        color: "bg-red-500",   sub: "Multiple filings missed", dot: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
                    <div className={`w-3 h-3 rounded-full ${item.dot} mx-auto mb-2`} />
                    <p className="font-heading font-bold text-dark text-xs mb-1">{item.label}</p>
                    <p className="text-muted text-[11px] leading-snug">{item.sub}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {annualCompliance.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                        <Icon size={16} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-primary font-heading font-semibold mb-1">{item.sub}</p>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* COMMON MISTAKES */}
            <section>
              <Eyebrow label="Common Mistakes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Avoid These GST Filing Mistakes</h2>
              <div className="space-y-3">
                {commonMistakes.map((m, i) => (
                  <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-amber-200 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center shrink-0 transition-colors">
                      <AlertTriangle size={15} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{m.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for GST Filing?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUsPoints.map((pt) => {
                      const Icon = pt.icon;
                      return (
                        <div key={pt.label} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-primary" />
                          </div>
                          <span className="text-dark text-xs font-medium leading-snug">{pt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: "10,000+", l: "Returns Filed",     c: "bg-primary text-white" },
                    { v: "99%",     l: "On-time Filing",    c: "bg-accent text-dark" },
                    { v: "15+",     l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "24 hrs",  l: "Response Time",     c: "bg-green-600 text-white" },
                  ].map((s) => (
                    <motion.div key={s.l} whileHover={{ y: -4 }}
                      className={`${s.c} rounded-2xl p-6 text-center shadow-card`}
                    >
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* DOWNLOAD CENTER */}
            <section>
              <Eyebrow label="Download Center" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Free GST Compliance Resources</h2>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-7 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "GST Return Filing Checklist",     sub: "All documents in one list",         icon: FileText,    color: "bg-blue-50 text-blue-600" },
                  { title: "GST Due Date Calendar",           sub: "All return deadlines for the year",  icon: CalendarCheck,color: "bg-green-50 text-green-600" },
                  { title: "Input Tax Credit Guide",          sub: "How to claim and reconcile ITC",     icon: BarChart3,   color: "bg-purple-50 text-purple-600" },
                  { title: "Annual Compliance Checklist",     sub: "GSTR-9 and year-end guide",          icon: BookOpen,    color: "bg-amber-50 text-amber-600" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                        <Icon size={18} />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs mb-3">{item.sub}</p>
                      <button className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold hover:gap-2.5 transition-all">
                        <Download size={12} /> Download Free
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* COMPLIANCE JOURNEY */}
            <section>
              <Eyebrow label="Compliance Journey" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Your Complete GST Compliance Journey</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-4">
                  {complianceJourney.map((item, i) => (
                    <motion.div key={item.step} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-5 relative"
                    >
                      <div className={`w-11 h-11 rounded-full font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm ${item.active ? "bg-accent text-dark" : "bg-primary text-white"}`}>
                        {item.step}
                      </div>
                      <Link href={item.link}
                        className={`flex-1 flex items-center justify-between rounded-2xl p-4 border transition-all group hover:shadow-card ${item.active ? "border-accent/30 bg-accent/5" : "border-slate-100 bg-white hover:border-primary/15"}`}
                      >
                        <div>
                          <p className={`font-heading font-bold text-sm mb-0.5 ${item.active ? "text-accent-dark" : "text-dark group-hover:text-primary transition-colors"}`}>{item.title}</p>
                          <p className="text-muted text-xs">{item.desc}</p>
                        </div>
                        {item.active
                          ? <span className="text-[10px] font-heading font-bold px-2.5 py-1 bg-accent text-dark rounded-full shrink-0">Current</span>
                          : <ArrowRight size={14} className="text-muted group-hover:text-primary transition-colors shrink-0" />
                        }
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

          </div>{/* end main content */}
          <div className="hidden xl:block sticky top-24 self-start"><StickySidebar /></div>
        </div>
      </div>

      {/* ── RELATED SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-2xl text-dark mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedServices.map((s, i) => (
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Link href={`/services/${s.id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300 h-full"
                >
                  <p className="font-heading font-bold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{s.title}</p>
                  <p className="text-muted text-xs mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-heading font-semibold group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-gstf" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-gstf)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Stay GST Compliant<br />Without the Stress
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you&apos;re filing monthly, quarterly, or annual GST returns, Company Avenue Advisory ensures accurate filings, timely submissions, and complete compliance — so you can focus on running your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors"
              >
                File Your GST Return <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Schedule Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
