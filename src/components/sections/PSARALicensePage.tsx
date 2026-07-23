"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Scale, UserCheck, RefreshCcw, Zap, Globe, Shield,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { faqs } from "@/lib/faqs/PSARALicensePage";

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
  { icon: Landmark,    label: "Act",             value: "PSARA 2005" },
  { icon: Shield,      label: "Issuing Auth.",   value: "District Licensing Auth." },
  { icon: Clock,       label: "Timeline",        value: "30-60 Business Days" },
  { icon: DollarSign,  label: "Starting At",     value: "₹9,999" },
  { icon: AlertCircle, label: "Penalty",         value: "₹25,000 + 1 Year Jail" },
  { icon: Users,       label: "Training",        value: "100 hrs Guards / 160 hrs Supervisors" },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Authority to Operate Security Agency", desc: "PSARA license is the only legal basis to operate a private security agency in India. Operating without it is a cognizable criminal offence under Section 4 of the PSARA Act." },
  { icon: Award,       title: "Eligibility for Corporate Contracts",        desc: "Large corporates, banks, hospitals, malls, and government organisations only engage PSARA-licensed security agencies. The license opens the door to high-value, long-term contracts." },
  { icon: Users,       title: "Ability to Deploy Trained Guards and Supervisors", desc: "PSARA license allows you to legally deploy guards (100 hours training) and supervisors (160 hours training) trained at NSDC-approved or government-recognised training institutes." },
  { icon: Globe,       title: "State-Specific License for Operations",      desc: "Each state issues its own PSARA license through the District Licensing Authority. Multi-state operations require separate licenses in each state — we manage multi-state applications." },
  { icon: Scale,       title: "Legally Deploy Armed Security Personnel",    desc: "With appropriate endorsements on the PSARA license and arms licenses for guards, you can legally deploy armed security personnel — a premium service category for banks and VIP protection." },
  { icon: TrendingUp,  title: "Qualifies for Government Security Tenders",  desc: "Central and state government security tenders mandatorily require PSARA license as an eligibility criterion. Without it, you cannot participate in government security procurement." },
  { icon: RefreshCcw,  title: "Renewable License Structure",                desc: "PSARA license is initially issued for 5 years and can be renewed. A consistent compliance and renewal record builds institutional trust with clients and regulators." },
  { icon: UserCheck,   title: "Protects Business Against Legal Action",     desc: "A valid PSARA license protects your security agency from criminal complaints, police action, and regulatory shutdowns — providing operational security for your business." },
];

const whoNeeds = [
  { icon: Building2,   title: "New Security Agency Startups",              desc: "Anyone starting a private security company in India must obtain a PSARA license before deploying any guards or supervisors. No security agency can legally operate without it." },
  { icon: Users,       title: "Housekeeping Companies Adding Security",    desc: "Facility management and housekeeping companies adding security services to their portfolio need a separate PSARA license for the security division." },
  { icon: Globe,       title: "Agencies Expanding to New States",          desc: "Security agencies licensed in one state must obtain a fresh license in each new state before deploying guards there. Multi-state expansion requires multi-state PSARA compliance." },
  { icon: Briefcase,   title: "Companies Seeking Large Corporate Contracts", desc: "Agencies eyeing contracts with banks, IT parks, malls, airports, or large corporates need a valid and current PSARA license as a mandatory eligibility criterion." },
  { icon: TrendingUp,  title: "Agencies Upgrading to Armed Security Services", desc: "Security agencies seeking to provide armed guard services need both a PSARA license and appropriate arms license endorsements for the deployment of armed personnel." },
  { icon: AlertCircle, title: "Agencies with Expired or Lapsed Licenses",  desc: "Agencies whose PSARA license has expired must immediately apply for renewal. Operating with an expired license is equivalent to operating without a license." },
];

const processSteps = [
  { n: "01", title: "Company Incorporation and INC Compliance",  desc: "Ensure the agency is incorporated (Pvt Ltd, LLP, or partnership). The applicant must be an Indian citizen with no criminal record. Directors/partners must submit police verification certificates." },
  { n: "02", title: "Training Institute Agreement",              desc: "Execute an agreement with a NSDC-approved training institute or government-recognised security training institute for mandatory training of guards (100 hours) and supervisors (160 hours) as per Schedule I of PSARA Rules." },
  { n: "03", title: "State Rules Familiarisation",               desc: "Each state has its own PSARA Rules under the central PSARA Act. Review the specific state&apos;s licensing requirements, fee structure, and document requirements before filing." },
  { n: "04", title: "Application to District Licensing Authority", desc: "File the PSARA license application with the Controlling Authority (District Licensing Authority / Commissioner of Police) in the district where the principal office is registered. Pay prescribed fee." },
  { n: "05", title: "Police Verification of Directors/Partners",  desc: "All directors, partners, and principal officers of the agency must undergo police verification. Criminal background checks are conducted by local police. Clean records are mandatory for license grant." },
  { n: "06", title: "Premises Verification",                     desc: "The licensing authority may physically verify the registered office premises of the security agency to confirm the address, facilities, and operational readiness of the applicant." },
  { n: "07", title: "Hearing Before Controlling Authority",       desc: "The Controlling Authority reviews the application, police verification reports, training institute agreement, and other documents. An oral hearing may be scheduled before the license is granted." },
  { n: "08", title: "PSARA License Issuance",                    desc: "Once satisfied with all requirements, the Controlling Authority issues the PSARA license specifying the state(s) of operation, category (armed/unarmed), and validity period (typically 5 years)." },
];

const requiredDocs = [
  { icon: FileText,   label: "Certificate of Incorporation or Partnership Deed" },
  { icon: Users,      label: "Police Verification Certificate (all directors)" },
  { icon: FileText,   label: "Training Institute Agreement (NSDC-approved)" },
  { icon: Building2,  label: "Registered Office Address Proof" },
  { icon: FileText,   label: "PAN Card of the Agency" },
  { icon: FileText,   label: "GST Registration Certificate" },
  { icon: UserCheck,  label: "Identity and address proof of all directors" },
  { icon: FileText,   label: "Affidavit of no criminal record (each director)" },
  { icon: Scale,      label: "List of guards and supervisors (if any)" },
  { icon: DollarSign, label: "Government fee payment proof" },
];


export function PSARALicensePage() {
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
            <span className="text-accent">PSARA License</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Private Security Compliance" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              PSARA License{" "}
              <span className="text-accent">for Security Agencies</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Obtain your mandatory Private Security Agencies Regulation Act license from the District Licensing Authority. State-specific, mandatory before deploying guards or supervisors — required for corporate contracts, government tenders, and legal operation of any security business in India.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Get PSARA License <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
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
                What is PSARA License?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                The <strong className="text-dark">Private Security Agencies Regulation Act (PSARA), 2005</strong> is a central law that regulates all private security agencies in India. Under Section 4 of the Act, no person can carry on the business of a private security agency without a valid license from the <strong className="text-dark">Controlling Authority (District Licensing Authority)</strong> of the respective state.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                Security agencies must train guards for a minimum of <strong className="text-dark">100 hours</strong> and supervisors for <strong className="text-dark">160 hours</strong> at NSDC-approved or government-recognised training institutes. Police verification of all directors and principals is mandatory. Armed guard deployment requires additional licensing endorsements.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Operating without a PSARA license attracts penalties of <strong className="text-dark">₹25,000 fine and/or 1 year imprisonment</strong> under Section 25. The license is valid for 5 years and is state-specific — each state of operation requires a separate license.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["State-Specific License", "5-Year Validity", "Police Verification Required", "NSDC Training Mandatory"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <AlertCircle size={18} className="text-red-600" />
                  <p className="font-heading font-bold text-dark text-sm">PSARA Violations and Penalties</p>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { offence: "Operating without PSARA license",         penalty: "₹25,000 fine + 1 year imprisonment (Sec 25)" },
                    { offence: "Deploying untrained guards",               penalty: "License suspension / cancellation" },
                    { offence: "No police verification of guards",         penalty: "License conditions violation" },
                    { offence: "Operating in unlicensed state",            penalty: "Same as operating without license" },
                    { offence: "Falsification of records",                 penalty: "Criminal prosecution" },
                    { offence: "Armed deployment without endorsement",     penalty: "Arms Act violation" },
                  ].map((item) => (
                    <div key={item.offence} className="bg-white border border-red-100 rounded-xl p-3">
                      <p className="font-heading font-semibold text-dark text-xs mb-1">{item.offence}</p>
                      <p className="text-red-700 text-xs">{item.penalty}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    PSARA enforcement has intensified significantly. Police and licensing authorities conduct periodic raids on unlicensed agencies.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs PSARA License?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any entity deploying security guards or supervisors as a commercial service must have a PSARA license.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Benefits of PSARA License</h2>
            <p className="text-muted mt-4">Legal operation, premium contracts, and business protection for your security agency.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">PSARA License Process - Step by Step</h2>
            <p className="text-muted mt-4">From company setup to license certificate — we manage the complete PSARA process.</p>
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
                State-specific requirements apply. We review your state&apos;s PSARA Rules and advise on exact documentation needed.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
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
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary rounded-3xl p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={18} className="text-accent" />
                  <p className="font-heading font-semibold text-base">Starting at ₹9,999</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  All-inclusive professional fee. Includes application preparation, training institute liaison, police verification coordination, and license follow-up. Government fees at actuals.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "PSARA Eligibility Assessment",
                    "Training Institute Agreement",
                    "Application Preparation",
                    "District Authority Filing",
                    "Police Verification Coordination",
                    "Premises Inspection Support",
                    "Authority Hearing Assistance",
                    "PSARA License Certificate",
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
                      { phase: "Document & Application Prep",  time: "5-7 days" },
                      { phase: "Police Verification",          time: "15-30 days" },
                      { phase: "Authority Review",             time: "10-20 days" },
                      { phase: "Total",                        time: "30-60 business days" },
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
                  Get PSARA License <ArrowRight size={13} />
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
            <p className="text-muted mt-4">Everything about PSARA license, training requirements, state-specific rules, and security agency compliance.</p>
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
