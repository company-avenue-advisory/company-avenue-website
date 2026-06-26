"use client";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Briefcase, Clock, Users, Star, Monitor } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience", icon: Clock, color: "text-primary", bg: "bg-primary/8" },
  { value: 1000, suffix: "+", label: "Businesses Served", icon: Briefcase, color: "text-secondary", bg: "bg-secondary/8" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star, color: "text-accent", bg: "bg-accent/10" },
  { value: 25, suffix: "+", label: "Professional Experts", icon: Users, color: "text-primary", bg: "bg-primary/8" },
  { value: 100, suffix: "%", label: "Digital Process", icon: Monitor, color: "text-secondary", bg: "bg-secondary/8" },
];

export function Stats() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center group hover:shadow-card hover:border-primary/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <div className={`font-heading font-bold text-3xl md:text-4xl ${stat.color} mb-1`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted text-xs font-body leading-snug">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
