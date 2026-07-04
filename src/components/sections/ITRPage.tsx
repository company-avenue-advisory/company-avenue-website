"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus, Download,
  MessageCircle, AlertTriangle, FileText, CreditCard, Fingerprint,
  Hash, Zap, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, UserCheck, LifeBuoy, Receipt, BookOpen,
  CalendarCheck, ShieldCheck, TrendingUp, Repeat2, BadgeCheck,
  AlertCircle, Info, Bell, BarChart3, RefreshCcw, Calculator,
  PiggyBank, Home, GraduationCap, HeartPulse, Landmark, Clock,
  ChevronRight, ArrowDown,
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

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const heroSnapshot = [
  { label: "Return Types",  value: "ITR-1 to ITR-7" },
  { label: "Applicable For",value: "Individuals & Businesses" },
  { label: "Process",       value: "100% Online" },
  { label: "Refund Support",value: "Yes" },
  { label: "Verification",  value: "Mandatory" },
  { label: "Compliance",    value: "Annual" },
];

const quickFacts = [
  { icon: Clock,        label: "Filing Time",   value: "30–60 Minutes" },
  { icon: FileText,     label: "Return Types",  value: "7 ITR Forms" },
  { icon: BadgeCheck,   label: "Verification",  value: "Mandatory" },
  { icon: RefreshCcw,   label: "Refund",        value: "Income Tax Dept." },
  { icon: Users,        label: "Applicable For",value: "Individuals & Biz" },
  { icon: Monitor,      label: "Mode",          value: "100% Online" },
];

const itrForms = [
  { form: "ITR-1", sub: "Sahaj", who: "Salaried Individuals",    sources: "Salary, 1 House Property, Other Income", suitable: "Employees with simple income", color: "bg-blue-50 border-blue-200", badge: "bg-blue-600 text-white" },
  { form: "ITR-2", sub: "",      who: "Individuals / HUF",        sources: "Capital Gains, Multiple House Properties", suitable: "Investors & property owners", color: "bg-purple-50 border-purple-200", badge: "bg-purple-600 text-white" },
  { form: "ITR-3", sub: "",      who: "Individuals / HUF",        sources: "Business or Professional Income", suitable: "Freelancers, consultants, professionals", color: "bg-primary/5 border-primary/20", badge: "bg-primary text-white" },
  { form: "ITR-4", sub: "Sugam", who: "Presumptive Taxpayers",    sources: "Presumptive Business/Professional Income", suitable: "Small traders under 44AD/44ADA", color: "bg-green-50 border-green-200", badge: "bg-green-600 text-white" },
  { form: "ITR-5", sub: "",      who: "LLP / Partnership / AOP",  sources: "Business Income, Other Sources", suitable: "LLPs and partnership firms", color: "bg-amber-50 border-amber-200", badge: "bg-amber-600 text-white" },
  { form: "ITR-6", sub: "",      who: "Companies",                sources: "All business income", suitable: "Pvt. Ltd., Public Ltd. companies", color: "bg-rose-50 border-rose-200", badge: "bg-rose-600 text-white" },
  { form: "ITR-7", sub: "",      who: "Trusts / NGOs",            sources: "Charitable & Religious Income", suitable: "Trusts, NGOs, political parties", color: "bg-teal-50 border-teal-200", badge: "bg-teal-600 text-white" },
];

const whoShouldFile = [
  { icon: Briefcase,  title: "Salaried Employees",  desc: "Income above basic exemption limit." },
  { icon: Monitor,    title: "Freelancers",          desc: "Any professional income earned." },
  { icon: UserCheck,  title: "Consultants",          desc: "Fees-based professionals." },
  { icon: HeartPulse, title: "Doctors",              desc: "Clinic income and professional fees." },
  { icon: Landmark,   title: "Lawyers",              desc: "Court fees and retainer income." },
  { icon: BadgeCheck, title: "Chartered Accountants",desc: "Professional practice income." },
  { icon: TrendingUp, title: "Businesses",           desc: "All business owners above threshold." },
  { icon: Zap,        title: "Startups",             desc: "Registered entities with income." },
  { icon: Building2,  title: "Companies",            desc: "Pvt. Ltd. and public companies." },
  { icon: Users,      title: "LLPs",                 desc: "All LLPs regardless of income." },
  { icon: Users,      title: "OPCs",                 desc: "Single-member companies." },
  { icon: Globe,      title: "NRIs",                 desc: "Indian-source income exceeding limits." },
];

const whyFile = [
  { icon: RefreshCcw,  title: "Claim Tax Refund",          desc: "Excess TDS deducted from salary or interest is refunded only when you file your ITR." },
  { icon: AlertCircle, title: "Avoid Penalties",           desc: "Non-filing attracts late fees of ₹5,000 (₹1,000 for small taxpayers) and interest @1% per month." },
  { icon: FileText,    title: "Proof of Income",           desc: "ITR acknowledgement is widely accepted as income proof for loans, visas, and financial products." },
  { icon: Landmark,    title: "Loan Approvals",            desc: "Banks and NBFCs require 2–3 years of ITR for home loans, business loans, and credit cards." },
  { icon: Globe,       title: "Visa Applications",         desc: "Embassies of the US, UK, Schengen, and Canada require filed ITRs as part of visa documentation." },
  { icon: TrendingUp,  title: "Carry Forward Losses",      desc: "Capital losses, business losses, and speculative losses can only be carried forward if the return is filed on time." },
  { icon: ShieldCheck, title: "Government Compliance",     desc: "ITR filing is mandatory for companies, LLPs, and individuals above the threshold regardless of activity." },
  { icon: Award,       title: "Financial Credibility",     desc: "A consistent ITR filing history establishes your financial record for investments and business dealings." },
];

const deductions = [
  { icon: PiggyBank,    title: "Section 80C",        limit: "Up to ₹1.5 Lakh",  desc: "PPF, ELSS, LIC, NSC, FD, EPF, tuition fees, home loan principal." },
  { icon: HeartPulse,   title: "Section 80D",        limit: "Up to ₹25,000",    desc: "Medical insurance premium for self, family, and parents." },
  { icon: Home,         title: "Home Loan Interest", limit: "Up to ₹2 Lakh",    desc: "Interest paid on self-occupied property loan (Section 24b)." },
  { icon: GraduationCap,title: "Education Loan",     limit: "Unlimited",        desc: "Interest paid on education loan (Section 80E) for 8 years." },
  { icon: Landmark,     title: "NPS Investment",     limit: "Up to ₹50,000",    desc: "Additional deduction for NPS contribution under Section 80CCD(1B)." },
  { icon: Briefcase,    title: "HRA Exemption",      limit: "Actual / Formula",  desc: "House Rent Allowance exemption for salaried employees in rented accommodation." },
  { icon: Zap,          title: "LTA",                limit: "Actual",           desc: "Leave Travel Allowance for domestic travel — 2 journeys in 4 years." },
  { icon: Award,        title: "Donations (80G)",    limit: "50%–100%",         desc: "Donations to approved charitable organisations and relief funds." },
];

const requiredDocs = [
  { icon: CreditCard,  label: "PAN Card",                     group: "identity" },
  { icon: Fingerprint, label: "Aadhaar Card",                 group: "identity" },
  { icon: FileText,    label: "Form 16 (from employer)",      group: "income" },
  { icon: Receipt,     label: "Salary Slips",                 group: "income" },
  { icon: Landmark,    label: "Bank Statements",              group: "income" },
  { icon: DollarSign,  label: "Interest Certificates",        group: "income" },
  { icon: TrendingUp,  label: "Capital Gain Statements",      group: "income" },
  { icon: PiggyBank,   label: "Investment Proofs (80C/80D)",  group: "tax" },
  { icon: HeartPulse,  label: "Insurance Premium Receipts",   group: "tax" },
  { icon: Home,        label: "Home Loan Statement",          group: "tax" },
  { icon: BookOpen,    label: "Business Financial Statements",group: "business" },
  { icon: Hash,        label: "GST Returns (businesses)",     group: "business" },
  { icon: BadgeCheck,  label: "TDS Certificates (Form 26AS)", group: "tax" },
  { icon: FileText,    label: "Previous Year ITR (optional)", group: "identity" },
];

const filingSteps = [
  { n: "01", title: "Free Consultation",      desc: "Assess your income sources, applicable ITR form, and potential deductions." },
  { n: "02", title: "Document Collection",    desc: "Securely collect Form 16, bank statements, investment proofs, and other required documents." },
  { n: "03", title: "Tax Computation",        desc: "Calculate taxable income, eligible deductions, TDS credit, and net tax payable or refundable." },
  { n: "04", title: "Review & Verification",  desc: "Share the computed return with you for review before portal submission." },
  { n: "05", title: "ITR Filing",             desc: "File the verified return on the Income Tax portal accurately and on time." },
  { n: "06", title: "E-Verification",         desc: "Complete mandatory e-verification via Aadhaar OTP, net banking, or Digital Signature." },
  { n: "07", title: "Acknowledgement",        desc: "Receive ITR-V acknowledgement confirming successful submission and compliance." },
];

const dueDates = [
  { type: "Individuals",       date: "31st July",      note: "Salaried, freelancers, and non-audit individuals.", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { type: "Businesses",        date: "31st July",      note: "Proprietorships and small businesses not requiring audit.", color: "bg-green-50 border-green-200 text-green-700" },
  { type: "Companies / LLPs",  date: "31st October",   note: "All companies and LLPs with mandatory audit.", color: "bg-primary/5 border-primary/20 text-primary" },
  { type: "Tax Audit Cases",   date: "30th September", note: "Businesses with turnover exceeding audit threshold.", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { type: "Belated Return",    date: "31st December",  note: "Late filing with penalty. No loss carry forward allowed.", color: "bg-orange-50 border-orange-200 text-orange-700" },
  { type: "Updated Return",    date: "Within 2 Years", note: "Correct errors with additional tax payment under Section 139(8A).", color: "bg-purple-50 border-purple-200 text-purple-700" },
];

const penalties = [
  { icon: DollarSign,   title: "Late Filing Fee",         desc: "₹5,000 for income above ₹5 lakh; ₹1,000 for income below ₹5 lakh. Zero if refund is due.", color: "text-red-600 bg-red-50" },
  { icon: TrendingUp,   title: "Interest @ 1% / Month",   desc: "Interest on unpaid tax from the due date under Section 234A, 234B, and 234C.", color: "text-orange-600 bg-orange-50" },
  { icon: RefreshCcw,   title: "Delayed Refund",          desc: "Late filing means your refund is processed later. Interest on refund (Section 244A) only applies in certain cases.", color: "text-amber-600 bg-amber-50" },
  { icon: AlertTriangle,title: "Loss Carry Forward Lost", desc: "Capital losses, business losses, and speculative losses cannot be carried forward if the ITR is not filed by the due date.", color: "text-purple-600 bg-purple-50" },
  { icon: Bell,         title: "Department Notices",      desc: "Non-filers with taxable income receive notices under Section 142(1) and 148 for scrutiny assessment.", color: "text-rose-600 bg-rose-50" },
  { icon: ShieldCheck,  title: "Compliance Record",       desc: "A gap in filing history affects financial credibility, loan applications, and government tenders.", color: "text-blue-600 bg-blue-50" },
];

const commonMistakes = [
  { title: "Choosing the Wrong ITR Form",    desc: "Filing ITR-1 when you have capital gains or business income leads to defective return notices. We verify your correct form." },
  { title: "Missing Form 16 Details",        desc: "All employer-reported figures must match. Discrepancy between Form 16 and AIS triggers departmental scrutiny." },
  { title: "Ignoring AIS / TIS Information",desc: "The Annual Information Statement (AIS) shows all income sources including interest, dividends, and market transactions — all must be reconciled." },
  { title: "Incorrect Bank Account",        desc: "Your refund credit fails if the pre-validated bank account IFSC or account number is wrong in the filing." },
  { title: "Unclaimed Deductions",          desc: "Many taxpayers miss 80C, 80D, HRA, home loan interest, and NPS deductions that could significantly reduce tax liability." },
  { title: "Missing Foreign Income",        desc: "Foreign salaries, investments, and assets must be disclosed in Schedule FA. Non-disclosure attracts heavy penalties under Black Money Act." },
  { title: "Not Verifying the Return",      desc: "Filing without e-verification means the return is treated as not filed. E-verify within 30 days of filing to complete the process." },
];

const whyUsPoints = [
  { icon: Award,        label: "Experienced Chartered Accountants" },
  { icon: UserCheck,    label: "Dedicated Tax Advisor" },
  { icon: DollarSign,   label: "Maximum Eligible Deductions Claimed" },
  { icon: ShieldCheck,  label: "Transparent, Fixed Pricing" },
  { icon: BadgeCheck,   label: "Secure Document Handling" },
  { icon: LifeBuoy,     label: "Year-round Tax Support" },
  { icon: Monitor,      label: "100% Digital Process" },
  { icon: Headphones,   label: "24-Hour Average Response Time" },
];

const complianceJourney = [
  { step: "01", title: "Income Tax Return",      link: "/services/income-tax-return", desc: "File ITR for individuals & businesses", active: true },
  { step: "02", title: "GST Compliance",         link: "/services/gst-filing",        desc: "Monthly & annual GST return filing" },
  { step: "03", title: "Accounting & Bookkeeping",link: "/services/accounting-bookkeeping", desc: "Accurate books & financial records" },
  { step: "04", title: "Payroll Management",     link: "/services/payroll-management",desc: "Salaries, PF, ESIC compliance" },
  { step: "05", title: "Annual Compliance",      link: "/services/annual-filing",     desc: "ROC filings & statutory compliance" },
  { step: "06", title: "Business Growth",        link: "/services",                   desc: "Complete business advisory support" },
];

const relatedServices = [
  { id: "accounting-bookkeeping",title: "Accounting & Bookkeeping", desc: "Books, MIS & financial statements." },
  { id: "gst-registration",      title: "GST Registration",         desc: "Obtain GSTIN for your business." },
  { id: "gst-filing",            title: "GST Return Filing",        desc: "Monthly & quarterly GST returns." },
  { id: "tds-return",            title: "TDS Return Filing",        desc: "Quarterly TDS compliance." },
  { id: "payroll-management",    title: "Payroll Management",       desc: "Salaries & statutory compliance." },
  { id: "roc-compliance",        title: "Annual Compliance",        desc: "ROC filings & secretarial." },
];

const faqs = [
  { q: "What is an Income Tax Return (ITR)?", a: "An Income Tax Return (ITR) is a form filed with the Income Tax Department reporting your annual income, taxes paid, deductions claimed, and net tax liability or refund due. It is filed annually and is mandatory for individuals and entities above the prescribed threshold." },
  { q: "Who should file an ITR?", a: "Individuals with income above the basic exemption limit (₹2.5 lakh for below 60, ₹3 lakh for 60–80, ₹5 lakh for above 80), all companies and LLPs regardless of income, individuals with foreign assets, those seeking refunds, and anyone with capital gains or multiple income sources." },
  { q: "Which ITR form should I choose?", a: "ITR-1 for salaried with simple income; ITR-2 for capital gains; ITR-3 for business/professional income; ITR-4 for presumptive income; ITR-5 for LLPs and firms; ITR-6 for companies; ITR-7 for trusts and NGOs. We assess your income profile and select the correct form." },
  { q: "Can I file ITR without Form 16?", a: "Yes. Form 16 is not mandatory. You can file using salary slips, Form 26AS, the Annual Information Statement (AIS), and bank statements. We reconcile all available data to prepare an accurate return even without Form 16." },
  { q: "How can I claim a tax refund?", a: "File your ITR accurately reporting all TDS deducted and advance tax paid. If the total tax paid exceeds your actual tax liability, the excess is refunded directly to your pre-validated bank account linked with PAN. Refunds are typically processed within 20–45 days of e-verification." },
  { q: "What happens if I miss the due date?", a: "Late filing attracts ₹5,000 late fee (₹1,000 if income is below ₹5 lakh). Interest @ 1% per month applies on unpaid tax. Capital and business losses cannot be carried forward. The return can still be filed as a Belated Return by 31st December of the assessment year." },
  { q: "Can freelancers file ITR?", a: "Yes. Freelancers with professional income file ITR-3 or ITR-4 (under presumptive scheme 44ADA if eligible). They can claim business expenses, home office costs, and other professional deductions to reduce taxable income." },
  { q: "Is Aadhaar mandatory for ITR filing?", a: "Yes. Aadhaar is mandatory for ITR filing under Section 139AA. Your PAN must be linked with Aadhaar before filing. E-verification of the filed return can also be done via Aadhaar OTP." },
  { q: "How long does refund processing take?", a: "Typically 20–45 days after e-verification for straightforward returns. Complex returns with capital gains, foreign income, or audit requirements may take longer. Refunds are credited directly to the pre-validated bank account." },
  { q: "Can I revise my ITR?", a: "Yes. A revised return can be filed under Section 139(5) to correct any omission or error in the original return. Revised returns can be filed up to 31st December of the assessment year or before assessment, whichever is earlier." },
  { q: "What is e-verification and is it mandatory?", a: "E-verification confirms your identity after filing and completes the submission process. It can be done via Aadhaar OTP, net banking, demat account EVC, or Digital Signature Certificate. It must be completed within 30 days of filing — else the return is treated as not filed." },
  { q: "Do I need to file ITR if TDS is already deducted?", a: "Yes. TDS deduction does not exempt you from filing. Filing is required to reconcile TDS, claim excess TDS as refund, disclose all income sources, and maintain compliance — especially if you have multiple income streams." },
  { q: "Can businesses file ITR online?", a: "Yes. All businesses including proprietorships, partnerships, LLPs, and companies file ITR through the Income Tax Portal. Audit-required businesses must upload the audit report before filing. We handle the complete process." },
  { q: "Can LLPs file ITR through Company Avenue?", a: "Yes. LLPs file ITR-5 and must have their books audited if turnover exceeds prescribed limits. We handle LLP audit, ITR preparation, and filing with full compliance." },
  { q: "Can companies file ITR through Company Avenue?", a: "Yes. Companies file ITR-6 and must attach the Board's Report, Financial Statements, and Tax Audit Report. Our team of CAs handles company ITR filing end-to-end." },
  { q: "How much does ITR filing cost?", a: "Individual ITR-1 starts from ₹499. Complex returns with capital gains, business income, or foreign assets are priced based on complexity. We provide transparent, fixed pricing upfront with no hidden charges." },
  { q: "Can I claim deductions under 80C?", a: "Yes. Section 80C allows deductions up to ₹1.5 lakh for PPF, ELSS, LIC premium, NSC, ELSS funds, home loan principal, EPF, and children's tuition fees. We identify and claim all eligible 80C investments from your documents." },
  { q: "Can I file a NIL return?", a: "Yes. A NIL return is filed when your income is below the taxable threshold. While not mandatory in most cases, filing a NIL return maintains your compliance record, is useful for loan applications, and establishes your tax filing history." },
  { q: "How many years should I keep tax records?", a: "Income tax records must be kept for 6 years from the end of the relevant assessment year as per Section 149. For cases involving serious fraud or foreign assets, records should be maintained for up to 16 years." },
  { q: "Can I switch between Old and New Tax Regime?", a: "Salaried individuals and those without business income can switch between old and new regime every year. Individuals with business income can switch only once from new to old regime. We analyse both regimes for you and recommend the most tax-efficient option." },
];

/* ─── ITR Eligibility Checker ─── */
type CheckerAnswers = { who?: string; income?: string; gains?: string; foreign?: string };

function getITRRecommendation(a: CheckerAnswers): { form: string; note: string; consult: boolean } {
  if (a.who === "company")    return { form: "ITR-6", note: "Companies (other than those exempt under Section 11) file ITR-6 annually.", consult: true };
  if (a.who === "llp")        return { form: "ITR-5", note: "LLPs, AOPs, and partnership firms file ITR-5. Audit may be required.", consult: true };
  if (a.who === "opc")        return { form: "ITR-6", note: "OPCs are companies and must file ITR-6 with mandatory audit.", consult: true };
  if (a.who === "partnership")return { form: "ITR-5", note: "Partnership firms file ITR-5. Consult our experts for audit requirements.", consult: true };
  if (a.who === "business")   return { form: "ITR-3 or ITR-4", note: "Business owners may use ITR-4 (presumptive) or ITR-3 (regular books).", consult: false };
  if (a.who === "professional")return { form: "ITR-3 or ITR-4", note: "Professionals can use ITR-4 under 44ADA or ITR-3 with regular books.", consult: false };
  if (a.gains === "yes")      return { form: "ITR-2", note: "Capital gains require ITR-2. Cannot use the simplified ITR-1.", consult: false };
  if (a.foreign === "yes")    return { form: "ITR-2 or ITR-3", note: "Foreign income/assets must be disclosed in Schedule FA. Expert guidance recommended.", consult: true };
  if (a.income === "below")   return { form: "Nil Return Possible", note: "Income below exemption limit. Filing is optional but recommended for compliance record.", consult: false };
  if (a.who === "freelancer") return { form: "ITR-3 or ITR-4", note: "Freelancers with professional income use ITR-4 (44ADA) or ITR-3.", consult: false };
  return { form: "ITR-1 (Sahaj)", note: "Salaried taxpayers with simple income can use the simplified ITR-1 form.", consult: false };
}

const checkerSteps = [
  { id: "who", q: "Who are you?", opts: [
    { label: "Salaried Employee", val: "salaried" },
    { label: "Freelancer",        val: "freelancer" },
    { label: "Professional",      val: "professional" },
    { label: "Business Owner",    val: "business" },
    { label: "Company",           val: "company" },
    { label: "LLP",               val: "llp" },
    { label: "OPC",               val: "opc" },
    { label: "Partnership Firm",  val: "partnership" },
  ]},
  { id: "income", q: "What is your approximate annual income?", opts: [
    { label: "Below Basic Exemption (< ₹2.5L)", val: "below" },
    { label: "Above Exemption Limit",            val: "above" },
  ]},
  { id: "gains", q: "Do you have capital gains (stocks, mutual funds, property)?", opts: [
    { label: "Yes", val: "yes" }, { label: "No", val: "no" },
  ]},
  { id: "foreign", q: "Do you have foreign income or foreign assets?", opts: [
    { label: "Yes", val: "yes" }, { label: "No", val: "no" },
  ]},
];

function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CheckerAnswers>({});
  const [done, setDone] = useState(false);

  const current = checkerSteps[step];
  function choose(val: string) {
    const next = { ...answers, [current.id]: val } as CheckerAnswers;
    setAnswers(next);
    // Skip income/gains/foreign for entity types
    if (current.id === "who" && ["company","llp","opc","partnership"].includes(val)) { setAnswers(next); setDone(true); return; }
    if (step + 1 < checkerSteps.length) setStep(step + 1);
    else setDone(true);
  }
  function reset() { setStep(0); setAnswers({}); setDone(false); }
  const rec = done ? getITRRecommendation(answers) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-10 shadow-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-heading font-bold text-dark text-lg">ITR Eligibility & Form Finder</p>
          <p className="text-muted text-xs mt-0.5">Quick questions to find your applicable ITR form</p>
        </div>
        {(step > 0 || done) && (
          <button onClick={reset} className="text-xs text-muted hover:text-primary font-heading font-semibold transition-colors">Start Over</button>
        )}
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : `${(step / checkerSteps.length) * 100}%` }}
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
              <span className="text-primary text-sm mr-2">{step + 1}/{checkerSteps.length}</span>
              {current.q}
            </p>
            <div className="flex flex-wrap gap-3">
              {current.opts.map((opt) => (
                <motion.button key={opt.val} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => choose(opt.val)}
                  className="px-5 py-2.5 border-2 border-slate-200 rounded-xl font-heading font-semibold text-sm text-dark hover:border-primary hover:bg-primary/5 transition-all"
                >{opt.label}</motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-5">
              <p className="text-muted text-xs mb-1">Your Recommended ITR Form</p>
              <p className="font-heading font-bold text-dark text-2xl mb-2">{rec?.form}</p>
              <p className="text-muted text-sm leading-relaxed flex items-start gap-2">
                <Info size={13} className="shrink-0 mt-0.5 text-primary" />{rec?.note}
              </p>
              {rec?.consult && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <AlertTriangle size={12} className="shrink-0" />
                  Expert consultation recommended for this return type.
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
              >
                Start My Tax Filing <ArrowRight size={13} className="inline ml-1" />
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
        <p className="font-heading font-bold text-dark text-base mb-1">File Your ITR Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Expert CAs handle your complete return — from computation to e-verification.</p>
        <div className="space-y-2 mb-5">
          {["Maximum Deductions Claimed", "Secure Data Handling", "On-time Filing", "Refund Tracking"].map(pt => (
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
          <p className="font-heading font-semibold text-sm">ITR Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete ITR filing document checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "15K+", l: "ITRs Filed" }, { v: "99%", l: "Accuracy" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export function ITRPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="itr-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#itr-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Income Tax Return Filing</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Income Tax Experts • Accurate Filing • Maximum Tax Savings</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Income Tax Return<br /><span className="text-primary">(ITR) Filing Online</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Whether you&apos;re a salaried employee, freelancer, business owner, or company — we ensure accurate ITR filing, maximise eligible deductions, and keep you fully compliant.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File My ITR <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to Tax Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Expert Chartered Accountants", "Secure Document Handling", "Maximum Eligible Deductions", "End-to-End Tax Filing"].map(pt => (
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
                      <p className="font-heading font-bold text-dark text-sm">ITR Filing Snapshot</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Filed
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
                <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">Individual filing from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹499</p>
                  </div>
                  <Link href="/contact"
                    className="px-4 py-2 bg-primary text-white text-xs font-heading font-semibold rounded-lg hover:bg-[#0a2444] transition-colors"
                  >
                    Get Started
                  </Link>
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

      {/* ── WHAT IS ITR ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=85"
                  alt="Income tax return filing and tax computation"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">15,000+</p>
                <p className="text-white/60 text-xs">ITRs Filed</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is Income Tax Return Filing?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                An <strong>Income Tax Return (ITR)</strong> is an annual declaration submitted to the Income Tax Department reporting your income, deductions claimed, taxes paid, and net tax liability. It establishes your financial record and enables tax refunds.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Filing ITR is mandatory for individuals above the exemption threshold, all companies and LLPs, and anyone with foreign income or capital gains — regardless of whether tax is already deducted at source.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Report Income Accurately", "Claim Tax Refunds", "Stay Legally Compliant", "Build Financial Credibility"].map(pt => (
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

      {/* ── ELIGIBILITY CHECKER ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Eligibility Checker" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Should You File an Income Tax Return?</h2>
            <p className="text-muted text-base max-w-lg mx-auto">Answer a few quick questions to find your applicable ITR form and filing requirements.</p>
          </div>
          <EligibilityChecker />
        </div>
      </section>

      {/* ── ITR FORMS TABLE ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="ITR Forms" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Which ITR Form Applies to You?</h2>
            <p className="text-muted text-base max-w-xl mx-auto">There are 7 ITR forms for different taxpayer categories. Using the wrong form results in a defective return notice.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {itrForms.map((form, i) => (
              <motion.div key={form.form} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className={`border rounded-2xl p-5 hover:shadow-card transition-all duration-300 ${form.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${form.badge}`}>{form.sub || form.who.split("/")[0].trim()}</span>
                </div>
                <p className="font-heading font-bold text-dark text-xl mb-1">{form.form}</p>
                <p className="text-muted text-xs leading-relaxed mb-2">{form.who}</p>
                <p className="text-xs text-slate-500 leading-snug border-t border-white/60 pt-2">{form.suitable}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
            >
              Find My ITR Form <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD FILE ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should File an ITR?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whoShouldFile.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group bg-white border border-slate-100 rounded-2xl p-4 hover:border-primary/20 hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 mx-auto transition-colors duration-300">
                    <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-semibold text-dark text-xs mb-1">{item.title}</p>
                  <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY FILE ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Why File an Income Tax Return?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyFile.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={19} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-sm mb-1">{item.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
            >
              File My ITR Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Tax Savings" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Tax Deductions &amp; Exemptions</h2>
            <p className="text-muted text-base max-w-xl mx-auto mt-3">Claim every eligible deduction to reduce your tax liability legally.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deductions.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-bold text-dark text-sm mb-1">{d.title}</p>
                  <p className="text-primary text-xs font-heading font-semibold mb-2">{d.limit}</p>
                  <p className="text-muted text-xs leading-relaxed">{d.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* REQUIRED DOCUMENTS */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">ITR Filing Document Checklist</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
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
                    <Download size={14} /> Download ITR Document Checklist
                  </button>
                </div>
              </div>
            </section>

            {/* FILING PROCESS */}
            <section>
              <Eyebrow label="Filing Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">ITR Filing Process — Step by Step</h2>
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

            {/* DUE DATE CALENDAR */}
            <section>
              <Eyebrow label="Due Dates" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">ITR Filing Due Date Calendar</h2>
              <p className="text-muted text-sm mb-8">Missing your due date attracts late fees and restricts loss carry-forward benefits.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {dueDates.map((d, i) => (
                  <motion.div key={d.type} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className={`border rounded-2xl p-5 hover:shadow-card transition-all ${d.color}`}
                  >
                    <p className="font-heading font-bold text-base mb-1">{d.type}</p>
                    <p className="font-heading font-semibold text-2xl mb-2">{d.date}</p>
                    <p className="text-xs opacity-80 leading-relaxed">{d.note}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <Bell size={20} className="text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="font-heading font-bold text-dark text-sm">Never Miss a Due Date</p>
                  <p className="text-muted text-xs mt-0.5">Our compliance team sends you timely reminders and handles your filing before the deadline.</p>
                </div>
                <Link href="/contact"
                  className="shrink-0 px-4 py-2 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
                >
                  Set Reminder
                </Link>
              </div>
            </section>

            {/* REFUND PROCESS */}
            <section>
              <Eyebrow label="Tax Refund" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">How Tax Refund Works</h2>
              <p className="text-muted text-sm mb-8">If total taxes paid (TDS + advance tax) exceed your actual liability, you receive a refund.</p>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                  {[
                    { label: "ITR Filed",           icon: FileText },
                    { label: "E-Verified",          icon: BadgeCheck },
                    { label: "Dept. Processing",    icon: RefreshCcw },
                    { label: "Refund Approved",     icon: CheckCircle },
                    { label: "Bank Credit",         icon: Landmark },
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
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">Average refund processing is 20–45 days after e-verification. Complex returns may take longer depending on departmental verification.</p>
                </div>
              </div>
            </section>

            {/* PENALTIES */}
            <section>
              <Eyebrow label="Late Filing Risk" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Consequences of Late ITR Filing</h2>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-dark text-sm leading-relaxed">
                  <strong>Warning:</strong> Don&apos;t wait until the last day. Late filing attracts penalty, interest, and permanently restricts loss carry-forward benefits.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {penalties.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card transition-all"
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

            {/* COMMON MISTAKES */}
            <section>
              <Eyebrow label="Common Mistakes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Avoid These ITR Filing Mistakes</h2>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for ITR Filing?</h2>
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
                    { v: "15,000+", l: "ITRs Filed",      c: "bg-primary text-white" },
                    { v: "99%",     l: "Accuracy Rate",   c: "bg-accent text-dark" },
                    { v: "15+",     l: "Years Experience",c: "bg-slate-800 text-white" },
                    { v: "24 hrs",  l: "Response Time",   c: "bg-green-600 text-white" },
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Free Tax Filing Resources</h2>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-7 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "ITR Filing Checklist",       sub: "All documents in one list",          icon: FileText,    color: "bg-blue-50 text-blue-600" },
                  { title: "Tax Saving Guide",           sub: "80C to 80U deductions guide",        icon: PiggyBank,   color: "bg-green-50 text-green-600" },
                  { title: "ITR Due Date Calendar",      sub: "All deadlines for the year",         icon: CalendarCheck,color: "bg-purple-50 text-purple-600" },
                  { title: "Investment Deduction Guide", sub: "Maximise your 80C investments",      icon: BarChart3,   color: "bg-amber-50 text-amber-600" },
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

            {/* RELATED TOOLS */}
            <section>
              <Eyebrow label="Tax Tools" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Income Tax Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Income Tax Calculator",           sub: "Compute your tax liability"          },
                  { title: "Old vs New Regime Calculator",    sub: "Compare both tax regimes"            },
                  { title: "HRA Calculator",                  sub: "Calculate HRA exemption"             },
                  { title: "80C Deduction Calculator",        sub: "Maximise section 80C savings"        },
                  { title: "Advance Tax Calculator",          sub: "Calculate quarterly advance tax"     },
                ].map((item) => (
                  <div key={item.title}
                    className="relative border border-slate-100 rounded-2xl p-5 bg-white hover:shadow-card transition-all overflow-hidden"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-heading font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Coming Soon</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                      <Calculator size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* COMPLIANCE JOURNEY */}
            <section>
              <Eyebrow label="Compliance Journey" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Your Complete Tax Compliance Journey</h2>
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
                          <p className={`font-heading font-bold text-sm mb-0.5 ${item.active ? "text-dark" : "text-dark group-hover:text-primary transition-colors"}`}>{item.title}</p>
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

          </div>{/* end main */}
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
            <defs><pattern id="cta-itr" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-itr)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              File Your Income Tax Return<br />the Smart Way
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Avoid errors, maximise eligible tax savings, and ensure complete compliance with expert guidance from Company Avenue Advisory. Whether you&apos;re an individual taxpayer or a growing business, we simplify the entire filing process.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors"
              >
                File My ITR <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Book Free Tax Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
