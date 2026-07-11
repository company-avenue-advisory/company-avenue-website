"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck, Zap, DollarSign, Headphones, Clock, LifeBuoy } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: UserCheck,
    title: "Experienced Chartered Accountants",
    desc: "Qualified CAs and CSs with 15+ years handling thousands of compliance cases.",
  },
  {
    icon: Zap,
    title: "Technology-Driven Process",
    desc: "Fully digital workflow with secure document sharing and live status tracking.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Fixed pricing with detailed breakdowns. No hidden fees, ever.",
  },
  {
    icon: Headphones,
    title: "Dedicated Relationship Manager",
    desc: "One point of contact who knows your business and is always reachable.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround Time",
    desc: "Streamlined processes ensure filings are completed faster than industry norms.",
  },
  {
    icon: LifeBuoy,
    title: "Lifetime Business Support",
    desc: "We stay with you after registration — advisory, compliance, and growth support.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-14 md:py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-[0_16px_64px_rgba(15,45,82,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85"
                alt="Company Avenue Advisory professional office environment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Floating info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute right-3 bottom-3 sm:-right-6 sm:bottom-10 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-card border border-slate-100 max-w-[150px] sm:max-w-[180px]"
            >
              <p className="font-heading font-bold text-2xl sm:text-3xl text-primary leading-none">1000+</p>
              <p className="text-muted text-[11px] sm:text-xs mt-1 leading-snug">Businesses trusted us with their compliance</p>
            </motion.div>

            {/* Accent square */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-24 h-24 bg-primary/8 rounded-2xl -z-10" />
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionHeader
              eyebrow="Why Choose Us"
              title="Why Businesses Choose Company Avenue"
              align="left"
              className="mb-6 md:mb-10 mt-8 lg:mt-0"
            />

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100 hover:border-primary/15 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary/7 group-hover:bg-primary flex items-center justify-center mb-2 sm:mb-3 transition-colors duration-300">
                      <Icon size={15} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="font-heading font-semibold text-dark text-[12.5px] sm:text-sm mb-1 leading-snug">
                      {f.title}
                    </p>
                    <p className="text-muted text-[11px] sm:text-xs leading-relaxed">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
