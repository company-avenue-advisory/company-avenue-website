"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Scale, RefreshCcw, Zap, Globe, Shield,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="overflow-hidden">
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: FileText,    label: "Form",            value: "TM-R" },
  { icon: Clock,       label: "Period",          value: "Every 10 Years" },
  { icon: RefreshCcw,  label: "Grace Period",    value: "6 Months (with surcharge)" },
  { icon: DollarSign,  label: "Starting At",     value: "₹3,999 + Govt Fees" },
  { icon: Landmark,    label: "Authority",       value: "Trademarks Registry" },
  { icon: ShieldCheck, label: "Protection",      value: "Indefinitely Renewable" },
];

const benefits = [
  { icon: ShieldCheck, title: "Maintain Exclusive Brand Rights Indefinitely",  desc: "A renewed trademark gives you perpetual, indefinite protection for your brand name and logo — as long as you keep renewing every 10 years. There is no expiry of a well-maintained trademark." },
  { icon: Scale,       title: "Preserve Right to Legal Enforcement",           desc: "Only a valid, registered trademark gives you the right to file infringement suits, send legal notices, and file police complaints against brand copycats. An expired mark has no enforcement power." },
  { icon: Globe,       title: "Customs Protection Against Counterfeits",        desc: "Customs authorities can seize counterfeit goods at Indian ports based on recorded trademarks. This protection is only available to registered, renewed marks — not to lapsed registrations." },
  { icon: Award,       title: "Protect Brand Equity and Business Value",       desc: "Brand value is a significant component of business valuation. A lapsed trademark reduces brand value, complicates M&A transactions, and creates IP due diligence risks for investors." },
  { icon: TrendingUp,  title: "Prevent Competitors from Registering Your Mark", desc: "If your trademark lapses and is removed from the register, a competitor can immediately apply to register the same or similar mark. Renewal prevents this competitive risk from arising." },
  { icon: DollarSign,  title: "Cost-Effective Protection",                     desc: "Trademark renewal is one of the most cost-effective brand protections available. The renewal fee (government + professional) is minimal compared to the cost of losing your brand to infringers." },
  { icon: Zap,         title: "Simple Process — No New Examination",           desc: "Unlike a new trademark application, TM-R renewal is an administrative process with no substantive examination of the mark&apos;s distinctiveness. If the mark is already registered, renewal is straightforward." },
  { icon: BadgeCheck,  title: "Enables Licensing and Franchising",             desc: "Licensing your trademark to franchisees, distributors, or partners requires a valid registered mark. Renewal keeps the legal foundation of all licensing agreements intact." },
];

const whoNeeds = [
  { icon: Building2,   title: "Brand Owners with Marks Expiring in 6 Months",  desc: "If your trademark registration certificate shows an expiry date within 6 months, file TM-R immediately. Early renewal avoids the surcharge that applies in the grace period." },
  { icon: Users,       title: "Companies with Multiple Trademark Registrations", desc: "Large brands with trademark portfolios across classes need systematic tracking and timely renewal of each registration. Missing even one renewal can expose a category to infringers." },
  { icon: Briefcase,   title: "Businesses that Assigned or Licensed Trademarks", desc: "If you have assigned or licensed your trademark to another entity, ensure renewal is tracked — the obligation rests with the registered owner, not the licensee." },
  { icon: Globe,       title: "International Brands Operating in India",         desc: "Foreign companies with Indian trademark registrations must renew them as per Indian law. Madrid Protocol registrations designating India are also subject to Indian renewal timelines." },
  { icon: TrendingUp,  title: "Startups Approaching 10-Year Mark",              desc: "Many startups that registered trademarks in 2014-2016 are now approaching their 10-year renewal window. Proactive renewal ensures uninterrupted brand protection." },
  { icon: AlertCircle, title: "Trademark Owners in the Grace Period",           desc: "If your mark has already passed the 10-year period but is still within the 6-month grace period, file TM-R immediately with the applicable surcharge to avoid removal from the register." },
];

const processSteps = [
  { n: "01", title: "Trademark Expiry Date Check",              desc: "Retrieve the trademark registration certificate and check the expiry date. Alternatively, search the trademark status on the IP India portal using the trademark number. Confirm whether the mark is still within the primary period or in the 6-month grace period." },
  { n: "02", title: "TM-R Form Preparation",                   desc: "Prepare Form TM-R — the application for renewal of a registered trademark under Section 25 of the Trade Marks Act, 1999. The form requires the trademark number, name, class, and applicant details." },
  { n: "03", title: "Calculate Government Fees",               desc: "Calculate the government renewal fee: ₹9,000 per class for individuals/startups/small enterprises filing online; ₹10,000 per class for others. If filing in the 6-month grace period after expiry, a surcharge of 50% of the renewal fee is added." },
  { n: "04", title: "File TM-R Online on IP India Portal",     desc: "File Form TM-R online on the IP India Trademarks portal (ipindia.gov.in). Upload supporting documents and pay the government fee. An e-filing acknowledgment is generated immediately upon successful submission." },
  { n: "05", title: "Examination of TM-R",                     desc: "The Trademarks Registry examines the TM-R application — primarily to verify that the mark is in the register, the class is correct, the fee is paid, and the application is filed by the registered owner or their agent." },
  { n: "06", title: "Response to Queries (if any)",             desc: "If the Examiner raises queries — typically about applicant identity, agent authorisation, or class discrepancies — respond with the required documents within the specified timeframe." },
  { n: "07", title: "Renewal Certificate Issuance",            desc: "Once the TM-R is approved, the Trademarks Registry updates the register and issues a Renewal Certificate or endorsement confirming the trademark is renewed for the next 10 years." },
  { n: "08", title: "Post-Renewal Monitoring",                 desc: "Note the new expiry date (10 years from the date of renewal) for your records. We provide a compliance calendar to ensure you are reminded 12-18 months before the next renewal deadline." },
];

const requiredDocs = [
  { icon: FileText,   label: "Trademark Registration Certificate (original)" },
  { icon: FileText,   label: "Form TM-R (completed)" },
  { icon: Users,      label: "Power of Attorney (if filing through agent)" },
  { icon: Building2,  label: "Proof of applicant identity (PAN / company docs)" },
  { icon: FileText,   label: "Trademark Number and Class confirmation" },
  { icon: DollarSign, label: "Government Renewal Fee Payment Receipt" },
  { icon: RefreshCcw, label: "Surcharge payment receipt (if in grace period)" },
  { icon: Globe,      label: "Priority document (if claiming restoration date)" },
];

const faqs = [
  {
    q: "Under which section of the Trade Marks Act is trademark renewal governed?",
    a: "Trademark renewal in India is governed by Section 25 of the Trade Marks Act, 1999. Under Section 25(1), a registered trademark can be renewed for a period of 10 years from the date of the original registration or from the date of the last renewal. Section 25(2) provides a grace period of 6 months after expiry, during which the mark can still be renewed with an additional surcharge. Section 25(3) allows restoration of a trademark that has been removed from the register due to non-payment of renewal fees, subject to an application to the Registrar within one year of removal.",
  },
  {
    q: "What is Form TM-R and when must it be filed?",
    a: "Form TM-R is the application form for renewal of a registered trademark under the Trade Marks Act, 1999. It must be filed with the Trademarks Registry, IP India, within 6 months before the expiry of the current registration period (i.e., up to 6 months before the 10-year expiry date) to renew without surcharge. If filed during the grace period (within 6 months after expiry), a surcharge of 50% of the renewal fee is levied. After the grace period expires, the trademark is removed from the register, and restoration must be applied for under Section 25(3).",
  },
  {
    q: "What is the government fee for trademark renewal in India?",
    a: "The current government fee for trademark renewal (per class) via e-filing on the IP India portal is: ₹9,000 per class for individuals, startups, and small enterprises; ₹10,000 per class for others (companies, large enterprises). If the renewal is filed during the 6-month grace period after expiry, an additional surcharge of 50% of the renewal fee is payable (₹4,500 or ₹5,000 additional per class respectively). Trademarks covering multiple classes require payment for each class separately. Our professional fee is charged additionally over the government fee.",
  },
  {
    q: "What happens if a trademark is not renewed and the grace period lapses?",
    a: "If a trademark is not renewed within the 10-year registration period or during the 6-month grace period, the Trademarks Registry removes the trademark from the register and publishes the removal in the Trademarks Journal. Once removed: (1) the mark no longer has statutory trademark protection; (2) third parties can immediately apply to register the same or similar mark; (3) you cannot file infringement suits based on the removed registration (though common law passing-off rights may continue); and (4) customs protection is lost. Restoration is possible within 1 year of removal but requires an application to the Registrar and payment of both the renewal fee and surcharge.",
  },
  {
    q: "What is trademark restoration and how does it differ from renewal?",
    a: "Trademark restoration under Section 25(3) of the Trade Marks Act applies when a trademark has already been removed from the register due to non-renewal. Restoration must be applied for within one year of the date of removal by filing an application to the Registrar explaining the reasons for non-renewal and paying the full renewal fee plus applicable surcharge. The Registrar has discretion to restore the mark if satisfied that there was sufficient cause for the omission. Restoration is more expensive and uncertain than timely renewal — a restored mark may have gaps in protection during the period it was removed.",
  },
  {
    q: "Can a trademark be renewed in perpetuity?",
    a: "Yes. Under Indian trademark law, there is no limit on the number of times a trademark can be renewed. A trademark can theoretically last forever as long as it is renewed every 10 years and is not cancelled for non-use, genericness, or other grounds. This is one of the key advantages of trademark protection over other forms of IP (patents expire in 20 years, design registration in 15 years, copyright in life+60 years). Famous brands like Coca-Cola, Tata, and Amul have maintained trademark registrations for over 100 years through continuous renewal.",
  },
  {
    q: "Who is eligible to file the TM-R renewal application?",
    a: "The renewal application (TM-R) can be filed by: (1) the registered proprietor of the trademark (the person or entity named in the registration certificate); (2) a licensed trademark agent or attorney on behalf of the registered proprietor under a Power of Attorney; (3) in the case of a deceased proprietor, the legal heirs or successors in title. If the trademark has been assigned or transferred since the original registration, the assignee must first record the assignment with the Trademarks Registry before filing the renewal application as the new proprietor.",
  },
  {
    q: "Can a trademark be renewed in some classes but not others?",
    a: "Yes. If a trademark is registered in multiple classes, the renewal application (TM-R) can be filed for all classes or selectively for some classes. It is common for businesses to renew only those classes in which they are currently active and allow classes for discontinued product lines to lapse. However, selective class non-renewal should be a deliberate strategic decision after reviewing the IP portfolio, as allowing a class registration to lapse may later create difficulties if you re-enter that product category. Each class requires a separate renewal fee payment.",
  },
];

export function TrademarkRenewalPage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* HERO */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Trademark Renewal</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Intellectual Property" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Trademark Renewal{" "}
              <span className="text-accent">Form TM-R</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Renew your trademark registration every 10 years under Section 25 of the Trade Marks Act. File within 6 months before expiry (or 6 months after with surcharge). After the grace period, the mark is removed from the register. Protect your brand indefinitely with timely TM-R filing.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Renew My Trademark <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to an Expert
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <Icon size={18} className="text-accent mx-auto mb-2" />
                  <p className="text-accent font-heading font-bold text-sm leading-tight">{f.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Trademark Renewal?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                A registered trademark is valid for <strong className="text-dark">10 years from the date of registration</strong> under Section 25 of the Trade Marks Act, 1999. After 10 years, the trademark must be renewed by filing <strong className="text-dark">Form TM-R</strong> to continue receiving statutory protection.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                Renewal can be filed up to <strong className="text-dark">6 months before expiry</strong> (without surcharge) or within <strong className="text-dark">6 months after expiry</strong> (with 50% surcharge). After the 6-month grace period, the trademark is <strong className="text-dark">removed from the register</strong> and competitors can register it.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                A trademark can be renewed indefinitely — there is no limit on the number of renewal cycles. Famous marks like <strong className="text-dark">Tata and Godrej</strong> have maintained registrations for over a century through consistent renewal. Each renewal cycle costs the prescribed government fee plus a professional fee.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["10-Year Renewal Cycle", "Form TM-R Filing", "6-Month Grace Period", "Indefinitely Renewable"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Renewal Timeline" />
                <p className="font-heading font-bold text-dark text-base mb-5">Critical Dates for Trademark Renewal</p>
                <div className="space-y-3 mb-5">
                  {[
                    { period: "Up to 6 months before expiry",      status: "Ideal window",    color: "text-green-700 bg-green-50",  note: "File TM-R — no surcharge" },
                    { period: "On or before expiry date",          status: "Standard",        color: "text-blue-700 bg-blue-50",    note: "File TM-R — no surcharge" },
                    { period: "Within 6 months after expiry",      status: "Grace Period",    color: "text-amber-700 bg-amber-50",  note: "File TM-R + 50% surcharge" },
                    { period: "After grace period expires",        status: "Mark Removed",    color: "text-red-700 bg-red-50",      note: "Mark removed from register" },
                    { period: "Within 1 year of removal",          status: "Restoration",     color: "text-purple-700 bg-purple-50",note: "Apply for restoration (Sec 25(3))" },
                    { period: "More than 1 year after removal",    status: "Lost Forever",    color: "text-red-700 bg-red-50",      note: "Cannot restore — competitor can register" },
                  ].map((item) => (
                    <div key={item.period} className="bg-white border border-slate-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark text-xs font-heading font-semibold">{item.period}</span>
                        <span className={`text-xs font-heading font-bold px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                      </div>
                      <p className="text-muted text-xs">{item.note}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Critical:</strong> Once the 1-year restoration window closes, your trademark cannot be recovered. A competitor can freely register it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs Trademark Renewal?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any registered trademark owner approaching the 10-year anniversary needs to act on renewal.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoNeeds.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Renew Your Trademark on Time?</h2>
            <p className="text-muted mt-4">Protect your brand for another 10 years — the most cost-effective IP investment you can make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Trademark Renewal Process - Step by Step</h2>
            <p className="text-muted mt-4">From expiry check to renewal certificate — we manage the TM-R filing completely.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" aria-hidden="true" />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-5 relative">
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
        </div>
      </section>

      {/* DOCUMENTS & PRICING */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Trademark renewal is primarily a fee-payment and form-filing process. Minimal documentation is needed beyond the trademark registration details.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {requiredDocs.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-dark text-xs font-medium">{doc.label}</span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-bold text-dark text-sm mb-2">Government Fee Structure (per class)</p>
                    <div className="space-y-1">
                      {[
                        { type: "Individuals / Startups / SMEs (e-filing)", fee: "₹9,000 per class" },
                        { type: "Others — Companies (e-filing)",            fee: "₹10,000 per class" },
                        { type: "Grace Period Surcharge (50% additional)",  fee: "₹4,500 or ₹5,000" },
                        { type: "Physical filing (additional fee)",         fee: "₹11,250 / ₹12,500" },
                      ].map(item => (
                        <div key={item.type} className="flex justify-between text-xs py-1 border-b border-blue-100 last:border-0">
                          <span className="text-muted">{item.type}</span>
                          <span className="font-heading font-semibold text-dark">{item.fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary rounded-3xl p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={18} className="text-accent" />
                  <p className="font-heading font-semibold text-base">Starting at ₹3,999 + Govt. Fees</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  Our professional fee for TM-R filing. Government fee (₹9,000-₹10,000 per class) is charged at actuals. Surcharge if in grace period is additional.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Trademark Status Verification",
                    "Expiry Date Confirmation",
                    "TM-R Form Preparation",
                    "IP India Portal Filing",
                    "Government Fee Processing",
                    "Query Response Support",
                    "Renewal Certificate",
                    "Next Renewal Date Reminder",
                  ].map(pt => (
                    <div key={pt} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-accent shrink-0" />
                      <span className="text-white/80 text-xs">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mb-5">
                  <p className="text-white/60 text-xs mb-2">Timeline:</p>
                  <div className="space-y-1">
                    {[
                      { phase: "TM-R Preparation",   time: "1-2 days" },
                      { phase: "IP India Filing",     time: "1 day" },
                      { phase: "Registry Processing", time: "15-30 days" },
                      { phase: "Total",               time: "15-30 business days" },
                    ].map(item => (
                      <div key={item.phase} className="flex justify-between text-xs">
                        <span className="text-white/60">{item.phase}</span>
                        <span className="text-white font-heading font-semibold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/contact"
                  className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                  Renew My Trademark Now <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">All you need to know about trademark renewal, TM-R, grace period, and restoration.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
