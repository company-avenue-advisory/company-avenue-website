"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, Users, User, Receipt, FileText, ShieldCheck,
  IndianRupee, BookOpen, Wallet, Rocket, Award, Globe,
  ClipboardList, CalendarCheck, Calculator, ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const services = [
  { id: "private-limited-company", title: "Private Limited Company", desc: "Incorporate your Pvt. Ltd. with end-to-end support and fast processing.", icon: Building2, popular: true },
  { id: "llp-registration", title: "LLP Registration", desc: "Flexible structure with limited liability and lower compliance burden.", icon: Users },
  { id: "one-person-company", title: "One Person Company", desc: "Start solo with full limited liability protection and corporate identity.", icon: User },
  { id: "gst-registration", title: "GST Registration", desc: "Obtain your GSTIN quickly and operate with full tax compliance.", icon: Receipt, popular: true },
  { id: "gst-filing", title: "GST Return Filing", desc: "Accurate monthly, quarterly and annual GST returns, filed on time.", icon: FileText },
  { id: "trademark-registration", title: "Trademark Registration", desc: "Protect your brand identity with a registered trademark.", icon: ShieldCheck },
  { id: "income-tax-return", title: "Income Tax Return Filing", desc: "Expert ITR filing for individuals, firms and companies.", icon: IndianRupee, popular: true },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Accurate books, financial statements and MIS reports.", icon: BookOpen },
  { id: "payroll-management", title: "Payroll Services", desc: "End-to-end payroll processing with statutory compliance.", icon: Wallet },
  { id: "startup-india", title: "Startup India Registration", desc: "DPIIT recognition for tax benefits and government schemes.", icon: Rocket },
  { id: "msme-registration", title: "MSME Registration", desc: "Udyam certificate to unlock government benefits instantly.", icon: Award },
  { id: "iec-registration", title: "Import Export Code (IEC)", desc: "IEC registration for businesses in international trade.", icon: Globe },
  { id: "roc-compliance", title: "ROC Compliance", desc: "Timely MCA filings and secretarial compliance management.", icon: ClipboardList },
  { id: "annual-filing", title: "Annual Compliance", desc: "Annual returns, board resolutions and statutory filings.", icon: CalendarCheck },
  { id: "tds-return", title: "TDS Return Filing", desc: "Accurate TDS deductions, challans and quarterly returns.", icon: Calculator },
];

export function Services() {
  return (
    <section className="py-14 md:py-24 bg-white" id="services">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Services"
          title="Business Solutions Under One Roof"
          subtitle="From business registration to taxation and compliance, our team ensures your business stays legally compliant while you focus on growth."
          className="mb-10 md:mb-16"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 hover:border-primary/20 hover:shadow-[0_8px_32px_rgba(15,45,82,0.08)] transition-all duration-300 h-full overflow-hidden"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {service.popular && (
                    <span className="absolute top-4 right-4 text-[10px] font-heading font-bold tracking-wider uppercase text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/6 group-hover:bg-primary flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300 shrink-0">
                      <Icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="font-heading font-semibold text-dark text-[13.5px] sm:text-[15px] mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-muted text-[11.5px] sm:text-sm leading-relaxed flex-1 mb-2.5 sm:mb-5 line-clamp-2 sm:line-clamp-none">
                      {service.desc}
                    </p>

                    <div className="hidden sm:flex items-center gap-1 text-xs sm:text-[13px] font-heading font-semibold text-primary/70 group-hover:text-primary transition-colors">
                      Learn More
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
