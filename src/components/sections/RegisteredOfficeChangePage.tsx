"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Building2, FileText, ShieldCheck, Clock, Award, Zap,
  Users, MapPin, Home, AlertCircle, ChevronRight, Star,
  Briefcase, RefreshCcw, BadgeCheck, Receipt, Landmark,
  TrendingUp, UserCheck, Download, Hash, Globe, Scale,
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

/* ══════════════════════════════════════ DATA ══════════════════════════════════════ */

const quickFacts = [
  { label: "Form", value: "INC-22 / INC-23" },
  { label: "Timeline", value: "7–15 Days" },
  { label: "Board Meeting", value: "Required" },
  { label: "Different State", value: "NCLT Approval" },
  { label: "Authority", value: "ROC" },
  { label: "Utility Bill", value: "Within 2 Months" },
];

const whoNeeds = [
  { icon: Building2, title: "Same-City Relocation", desc: "Companies moving to new premises within the same city or locality." },
  { icon: MapPin, title: "City-to-City Move", desc: "Companies shifting registered office from one city to another within same state." },
  { icon: Globe, title: "Inter-State Relocation", desc: "Companies relocating to a different state — requires NCLT Regional Director approval." },
  { icon: Home, title: "Startups to Office", desc: "Startups moving from founder's home address to a dedicated commercial office space." },
  { icon: RefreshCcw, title: "Lease Expiry", desc: "Companies changing office due to lease expiry, termination, or landlord disputes." },
  { icon: TrendingUp, title: "Strategic Relocation", desc: "Companies relocating for business expansion, client proximity, or hub advantages." },
  { icon: Scale, title: "Tax Advantage Move", desc: "Companies moving for tax or regulatory advantages offered by specific states." },
  { icon: AlertCircle, title: "Incorrect MCA Records", desc: "Companies with inaccurate or outdated address on MCA master data needing correction." },
];

const benefits = [
  { icon: BadgeCheck, title: "Legal Address Updated", desc: "All MCA records and company master data reflect your current registered address.", color: "bg-primary/8 text-primary" },
  { icon: ShieldCheck, title: "MCA Compliance Maintained", desc: "Full compliance with Companies Act 2013 Section 12 on registered office requirements.", color: "bg-blue-50 text-blue-600" },
  { icon: Landmark, title: "Bank Address Sync", desc: "Enables bank account address update with board resolution and new address proof.", color: "bg-teal-50 text-teal-600" },
  { icon: Receipt, title: "GST Address Update Path", desc: "ROC change creates the basis for GST address change via separate Form REG-14 filing.", color: "bg-green-50 text-green-600" },
  { icon: Award, title: "Vendor & Client Credibility", desc: "Updated registered address enhances trust with vendors, clients, and financial institutions.", color: "bg-amber-50 text-amber-600" },
  { icon: AlertCircle, title: "No Missed Notices", desc: "Legal and regulatory notices reach you at the correct address — zero compliance risk.", color: "bg-rose-50 text-rose-600" },
  { icon: TrendingUp, title: "New State Operations", desc: "State change enables legal business operations and regulatory registrations in the new state.", color: "bg-purple-50 text-purple-600" },
  { icon: FileText, title: "Accurate Regulatory Records", desc: "Accurate records at ROC at all times — eliminates discrepancies across PAN, GST, and MCA.", color: "bg-indigo-50 text-indigo-600" },
];

const processSteps = [
  { n: "01", icon: Users, title: "Board Resolution Approving New Address", desc: "Board of Directors passes a resolution approving the change of registered office and authorising the filing of INC-22." },
  { n: "02", icon: Receipt, title: "Obtain Utility Bill of New Address", desc: "Collect electricity, water, or gas bill of the new address — must be within the last 2 months from the date of filing." },
  { n: "03", icon: FileText, title: "Get NOC from Property Owner", desc: "If the property is rented, obtain a written No Objection Certificate from the landlord permitting use as registered office." },
  { n: "04", icon: Download, title: "File INC-22 Within 30 Days", desc: "File Form INC-22 on MCA portal within 30 days of the board resolution. Delay attracts ₹1,000/day penalty on the company and officers." },
  { n: "05", icon: ShieldCheck, title: "ROC Verification of Documents", desc: "The Registrar of Companies verifies the submitted documents — utility bill, NOC, board resolution, and address proof." },
  { n: "06", icon: BadgeCheck, title: "MCA Master Data Updated", desc: "On approval, MCA updates the company master data with the new registered office address across all records." },
  { n: "07", icon: Receipt, title: "GST Address Change (Separate)", desc: "File Form GST REG-14 on the GST portal separately to update GST registered address — ROC and GST are independent systems." },
  { n: "08", icon: Landmark, title: "Bank Account Address Update", desc: "Notify your bank of the new address with board resolution and new address proof. Bank updates internally per their process." },
];

const documents = [
  "Board resolution (certified copy) approving new address",
  "Utility bill (electricity/water/gas) not older than 2 months",
  "NOC from property owner (if property is rented)",
  "Rent or lease agreement copy of the new premises",
  "No Objection from Society/building (if required by locality)",
  "Proof of registered office — signboard photo (recommended)",
  "Form INC-22 (digitally signed by director)",
  "Existing Certificate of Incorporation (reference)",
];

const timelineStages = [
  { step: "01", label: "Board Resolution", desc: "Board passes resolution approving new registered address" },
  { step: "02", label: "Document Collection", desc: "Utility bill, NOC, rent agreement compiled and verified" },
  { step: "03", label: "INC-22 Filing", desc: "Form filed within 30 days of board resolution on MCA portal" },
  { step: "04", label: "ROC Review", desc: "Registrar of Companies verifies documents and address proof" },
  { step: "05", label: "MCA Address Update", desc: "Company master data updated with new registered address" },
  { step: "06", label: "GST & Bank Update", desc: "Separate REG-14 filed; bank notified with board resolution" },
];

const deliverables = [
  "INC-22 filing acknowledgment with SRN (Service Request Number)",
  "Updated MCA master data reflecting new registered address",
  "ROC approval confirmation for registered office change",
  "Guidance document on GST address change via Form REG-14",
  "Template board resolution for bank address update notification",
  "Checklist for state-specific follow-up actions (if inter-state)",
];

const whyUs = [
  { icon: Award, title: "ROC Filing Experts", desc: "500+ registered office change filings handled across states — same city, inter-city, and inter-state." },
  { icon: FileText, title: "End-to-End Filing", desc: "From board resolution drafting to MCA filing and ROC approval — every step managed by our team." },
  { icon: Clock, title: "Filing Within 30 Days", desc: "We ensure INC-22 is filed within the mandatory 30-day window with zero delay." },
  { icon: UserCheck, title: "Document Verification", desc: "All documents checked before submission — no deficiency notices, no rejections." },
  { icon: ShieldCheck, title: "INC-23 for State Change", desc: "Full support for inter-state registered office change including NCLT filing and newspaper publication." },
  { icon: Globe, title: "GST & Bank Guidance", desc: "Post-ROC change, guidance on GST REG-14 and bank address update for complete compliance." },
  { icon: TrendingUp, title: "Transparent Pricing", desc: "Flat fee with all government charges included. No hidden costs or surprise bills." },
  { icon: BadgeCheck, title: "Dedicated Support Manager", desc: "One expert handles your filing end-to-end with regular status updates via WhatsApp." },
];

const faqs = [
  { q: "How soon must INC-22 be filed after the board resolution?", a: "INC-22 must be filed within 30 days of the date of board resolution approving the change. Any delay attracts a penalty of ₹1,000 per day for as long as the default continues. Both the company and every officer in default are liable for the penalty under Companies Act 2013." },
  { q: "What if the company is changing its state of registered office?", a: "Inter-state registered office change requires Form INC-23 (not INC-22) along with approval from the Regional Director (NCLT). Additionally, publication in at least one English and one vernacular newspaper is mandatory. The process is more complex, typically taking 30-60 days, and requires special resolution by shareholders. Company Avenue handles the complete INC-23 process." },
  { q: "Is a physical office address mandatory as the registered office?", a: "Yes. Under Section 12 of the Companies Act, 2013, the registered office must be a physical address where notices can be served. A PO Box, virtual office (in most cases), or mail forwarding address is not acceptable. The company should be reachable and have some physical presence at the address." },
  { q: "Can I use a home address as the registered office?", a: "Yes — many startups use the founder's or director's home address as the registered office. This is legally valid provided you have the NOC from the property owner (even if you own it, or from parents) and a recent utility bill in the name of the property. There is no regulatory bar on using a residential address." },
  { q: "Do I need a new Certificate of Incorporation after the address change?", a: "No. A new Certificate of Incorporation is not issued solely for a registered office address change. The MCA master data is updated to reflect the new address, and this updated MCA record serves as official proof. The original Certificate of Incorporation remains valid and unchanged." },
  { q: "Is the GST address change automatic after filing INC-22?", a: "No. The ROC/MCA and GST systems are entirely separate. After the INC-22 is approved and MCA address is updated, you must separately file Form GST REG-14 on the GST portal to update your GSTIN address. Some states may require fresh GST registration if you move to a different state." },
  { q: "How is the bank account address updated?", a: "The bank is notified separately — there is no automatic bank update from MCA. You need to submit a request to your bank branch with a certified copy of the board resolution and the new address proof (utility bill). Each bank has its own internal process, but the board resolution is the key document." },
  { q: "Is the landlord's NOC mandatory if the property is rented?", a: "Yes. If the new registered office is on a rented or leased property, a written No Objection Certificate (NOC) from the property owner is mandatory for the INC-22 filing. The NOC must state that the owner consents to the company using the premises as its registered office. Without it, the ROC may raise a deficiency notice." },
  { q: "What is the penalty for not filing INC-22 within 30 days?", a: "Under Section 12(8) of the Companies Act, 2013, the company and every officer in default is liable to a penalty of ₹1,000 for every day the default continues, up to ₹1,00,000. Beyond penalties, prolonged delay can attract ROC show-cause notices and may affect MCA annual filings." },
  { q: "Is a PO Box acceptable as a registered office address?", a: "No. A PO Box is categorically not acceptable as a registered office. The Companies Act requires a physical address where legal notices can be served. Similarly, virtual offices are generally not accepted by many ROCs unless supported by a proper rental agreement and evidence of physical use." },
];

const relatedServices = [
  { id: "company-name-change", title: "Company Name Change", desc: "Rebrand your company with INC-24 filing." },
  { id: "roc-compliance", title: "ROC Annual Compliance", desc: "AOC-4 and MGT-7 filing for companies." },
  { id: "director-kyc", title: "Director KYC (DIR-3)", desc: "Mandatory annual KYC for all directors." },
  { id: "change-in-directors", title: "Change in Directors", desc: "Appoint or resign directors via MCA." },
  { id: "increase-authorised-capital", title: "Increase Authorised Capital", desc: "Enhance your company's share capital." },
  { id: "company-closure", title: "Company Closure (STK-2)", desc: "Strike off dormant companies easily." },
];

/* ══════════ STICKY SIDEBAR ══════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Registered Office Change</p>
        <p className="text-muted text-xs mb-3 leading-relaxed">File INC-22 with complete MCA support. Starting at ₹3,999.</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-heading font-bold text-primary text-xl">₹3,999</span>
          <span className="text-muted text-xs">onwards</span>
        </div>
        <div className="space-y-2 mb-5">
          {["Board Resolution Drafting", "INC-22 Filing", "Document Verification", "ROC Follow-up", "GST & Bank Guidance"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >File INC-22 Now <ArrowRight size={12} /></Link>
          <a href="tel:+919876543210"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          ><Phone size={13} /> Call an Expert</a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Quick Facts</p>
        <div className="space-y-3">
          {[
            { label: "Form (Same State)", value: "INC-22" },
            { label: "Form (Diff. State)", value: "INC-23" },
            { label: "Filing Deadline", value: "30 Days of Board Res." },
            { label: "Authority", value: "ROC / NCLT" },
            { label: "Timeline", value: "7–15 Working Days" },
            { label: "Penalty for Delay", value: "₹1,000/Day" },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between">
              <span className="text-white/50 text-xs">{f.label}</span>
              <span className="text-white text-xs font-heading font-semibold">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-sm mb-3">Quick Navigation</p>
        <div className="space-y-1">
          {[
            { href: "#what-is", label: "What is Registered Office Change?" },
            { href: "#who-needs", label: "Who Needs This?" },
            { href: "#benefits", label: "Key Benefits" },
            { href: "#process", label: "Process Steps" },
            { href: "#documents", label: "Documents Required" },
            { href: "#timeline", label: "Timeline" },
            { href: "#deliverables", label: "What You Receive" },
            { href: "#why-us", label: "Why Company Avenue" },
            { href: "#faq", label: "FAQs" },
          ].map(item => (
            <a key={item.href} href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors group"
            >
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "500+", l: "Filings Done" }, { v: "7 Days", l: "Avg. Processing" }, { v: "100%", l: "ROC Approved" }, { v: "0", l: "Rejections" }].map(s => (
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

/* ══════════════════════════════════════ MAIN EXPORT ══════════════════════════════════════ */
export function RegisteredOfficeChangePage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="roc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#roc-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Registered Office Change</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">MCA Expert Filing • INC-22 & INC-23 • PAN India</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Registered Office<br /><span className="text-primary">Change (INC-22)</span><br />Filing Online
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Change your company&apos;s registered office address legally with MCA. Complete INC-22 filing support, board resolution drafting, ROC follow-up, and post-filing GST & bank update guidance — all in one place.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Change Registered Office <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["INC-22 & INC-23 Support", "Board Resolution Drafting", "30-Day Compliance", "GST & Bank Guidance"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Visual Card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <MapPin size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Registered Office Change</p>
                        <p className="text-white/50 text-[10px]">Ministry of Corporate Affairs — INC-22</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● MCA Filing</span>
                  </div>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85"
                      alt="Modern office space representing registered office change"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-dark text-xs">Address Change Complete</p>
                          <p className="text-muted text-[10px]">MCA master data updated successfully</p>
                        </div>
                        <CheckCircle size={16} className="text-green-500 ml-auto shrink-0" />
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Filing Timeline</p>
                      <p className="font-heading font-bold text-primary text-xs">7–15 Working Days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Starting Price</p>
                      <p className="font-heading font-bold text-green-600 text-xs">₹3,999 onwards</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Filing Deadline</p>
                  <p className="font-heading font-bold text-primary text-sm">30 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-16 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Penalty (Delay)</p>
                  <p className="font-heading font-bold text-rose-600 text-sm">₹1,000/Day</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Quick facts strip */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-16"
          >
            {quickFacts.map(s => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:border-primary/20 hover:bg-primary/[0.02] transition-colors">
                <p className="font-heading font-bold text-primary text-base leading-none mb-1">{s.value}</p>
                <p className="text-muted text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ MAIN CONTENT + STICKY SIDEBAR ══ */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* ── WHAT IS ── */}
            <section id="what-is">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Overview" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What is Registered Office Change?
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
                  <p className="text-muted text-base leading-relaxed">
                    Every company registered under the <strong className="text-dark">Companies Act, 2013</strong> must maintain a registered office — the official address for all legal, regulatory, and statutory communications. Under <strong className="text-dark">Section 12 of the Companies Act</strong>, the registered office must be a physical location capable of receiving notices.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    When a company changes its registered office address — whether within the same city, to a different city in the same state, or to a new state — it must file <strong className="text-dark">Form INC-22</strong> with the Registrar of Companies (ROC) within 30 days of the board resolution.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    For <strong className="text-dark">inter-state relocation</strong>, the process is more complex — requiring <strong className="text-dark">Form INC-23</strong>, a special shareholder resolution, and approval from the Regional Director (NCLT), along with mandatory newspaper publications.
                  </p>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-xs leading-relaxed font-heading">
                      <strong>Important:</strong> Failure to file INC-22 within 30 days attracts ₹1,000/day penalty. All notices to wrong address can result in missed compliance deadlines.
                    </p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card">
                    <Image
                      src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=85"
                      alt="Company office building representing registered office"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── WHO NEEDS ── */}
            <section id="who-needs" className="bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-16 rounded-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Who Needs This" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Who Needs Registered Office Change?
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Any company that has moved, is planning to move, or has an incorrect address on MCA records must file INC-22.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {whoNeeds.map((w, i) => (
                  <motion.div key={w.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                      <w.icon size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1.5">{w.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── BENEFITS ── */}
            <section id="benefits">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Key Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Key Benefits of Filing INC-22
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Updating your registered office with MCA carries immediate compliance, legal, and operational advantages.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${b.color} group-hover:scale-105 transition-transform`}>
                      <b.icon size={18} />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1.5">{b.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── PROCESS ── */}
            <section id="process" className="bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-16 rounded-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Process Steps" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  8-Step INC-22 Filing Process
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A systematic process ensuring 100% compliance with Companies Act requirements for registered office change.
                </p>
              </motion.div>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent hidden md:block" />
                <div className="space-y-4">
                  {processSteps.map((step, i) => (
                    <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                      className="flex gap-5 group"
                    >
                      <div className="shrink-0 relative z-10">
                        <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:bg-accent transition-colors duration-300">
                          <step.icon size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-heading font-bold text-accent tracking-widest">{step.n}</span>
                          <p className="font-heading font-semibold text-dark text-sm">{step.title}</p>
                        </div>
                        <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── DOCUMENTS ── */}
            <section id="documents">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Documents Required" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Documents Required for INC-22 Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Ensure all documents are ready before initiating the filing to avoid ROC deficiency notices.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc, i) => (
                  <motion.div key={doc} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/15 transition-all"
                  >
                    <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-sm leading-relaxed">{doc}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-start gap-3"
              >
                <BadgeCheck size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-primary text-sm mb-1">Utility Bill Validity is Critical</p>
                  <p className="text-muted text-xs leading-relaxed">The utility bill (electricity/water/gas) must be dated within the last 2 months from the date of INC-22 filing. An expired bill is the most common reason for ROC deficiency notices — we verify this before submission.</p>
                </div>
              </motion.div>
            </section>

            {/* ── TIMELINE ── */}
            <section id="timeline" className="bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-16 rounded-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Registered Office Change Timeline
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Typically completed in 7–15 working days depending on ROC processing and document readiness.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {timelineStages.map((stage, i) => (
                  <motion.div key={stage.step} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="relative"
                  >
                    {i < timelineStages.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[calc(100%+8px)] w-4 h-px bg-primary/25 z-10" />
                    )}
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/20 transition-all h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-xs font-heading font-bold">{stage.step}</span>
                      </div>
                      <p className="font-heading font-bold text-dark text-xs mb-2 leading-snug">{stage.label}</p>
                      <p className="text-muted text-[10px] leading-relaxed">{stage.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3"
              >
                <Clock size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-xs leading-relaxed font-heading">
                  <strong>Note:</strong> Inter-state registered office change (INC-23) takes longer — typically 30–60 days — due to NCLT Regional Director approval and mandatory newspaper publication requirements.
                </p>
              </motion.div>
            </section>

            {/* ── DELIVERABLES ── */}
            <section id="deliverables">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="What You Receive" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What You Receive After Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Complete documentation package for the registered office change, ready for bank and GST updates.
                </p>
              </motion.div>
              <div className="space-y-3">
                {deliverables.map((d, i) => (
                  <motion.div key={d} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/15 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <p className="text-dark text-sm leading-relaxed font-heading font-medium">{d}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WHY US ── */}
            <section id="why-us" className="bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-16 rounded-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Companies Trust Us for INC-22 Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  500+ registered office changes handled. Zero rejection rate. Expert INC-22 and INC-23 support.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUs.map((pt, i) => (
                  <motion.div key={pt.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/15 transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <pt.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{pt.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{pt.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Common questions from companies about changing their registered office address.
                </p>
              </motion.div>
              <div className="space-y-2">
                {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            </section>

            {/* ── RELATED SERVICES ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Explore More" />
                <h2 className="font-heading font-bold text-2xl text-dark tracking-tight mb-8">Related Services</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedServices.map((svc, i) => (
                  <motion.div key={svc.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <Link href={`/services/${svc.id}`}
                      className="flex items-center justify-between gap-2 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-card hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                    >
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm group-hover:text-primary transition-colors">{svc.title}</p>
                        <p className="text-muted text-xs mt-0.5">{svc.desc}</p>
                      </div>
                      <ChevronRight size={15} className="text-muted group-hover:text-primary shrink-0 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>{/* end main column */}

          {/* ── STICKY SIDEBAR ── */}
          <div className="hidden xl:block sticky top-24 self-start"><StickySidebar /></div>
        </div>
      </div>

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-[#0F2D52] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="roc-cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#roc-cta-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-5">
              <span className="w-6 h-px bg-accent" />Update Your Registered Office Today<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Change Your Registered Office<br />with Zero Compliance Risk
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              File INC-22 within the 30-day window. Avoid penalties. Get MCA updated with your correct address — complete support from board resolution to ROC approval.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#e2b76a] transition-colors shadow-lg shadow-accent/20"
              >
                File INC-22 Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Free Expert Consultation
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["INC-22 & INC-23 Support", "30-Day Compliance Guarantee", "GST & Bank Guidance", "PAN India Service"].map(pt => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-accent" />
                  <span className="text-white/70 text-sm">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
