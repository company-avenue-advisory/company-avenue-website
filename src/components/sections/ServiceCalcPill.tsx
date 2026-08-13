/**
 * Oval calculator button that sits directly under the service page <h1>.
 *
 * SERVER COMPONENT — reads `@/lib/pricing` so no calculator data reaches the
 * client bundle. Service page components are `"use client"`, so the server
 * `page.tsx` passes this down as a `calcPill` slot prop.
 *
 * Styled to read the same on a white hero and a navy hero: solid white pill,
 * gold icon chip, dark text.
 */
import Link from "next/link";
import {
  Building2, Scale, Lightbulb, ClipboardCheck, Calculator, IndianRupee,
  FileText, Wallet, Receipt, Search, PiggyBank, Percent, ArrowRight,
} from "lucide-react";
import { getPrimaryCalculator } from "@/lib/pricing";

const ICONS = {
  Building2, Scale, Lightbulb, ClipboardCheck, Calculator,
  IndianRupee, FileText, Wallet, Receipt, Search, PiggyBank, Percent,
} as const;

export function ServiceCalcPill({ serviceId }: { serviceId: string }) {
  const tool = getPrimaryCalculator(serviceId);
  if (!tool) return null;

  const Icon = ICONS[tool.icon];

  return (
    <div className="mb-7 -mt-1">
      <Link
        href={tool.href}
        className="group inline-flex items-center gap-3 pl-2 pr-4 sm:pr-5 py-2 rounded-full bg-white border border-slate-200 ring-1 ring-accent/25 shadow-card hover:shadow-card-hover hover:ring-accent/60 hover:-translate-y-0.5 transition-all duration-300 max-w-full"
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-accent flex items-center justify-center text-white shadow-sm">
          <Icon size={17} />
        </span>

        <span className="flex flex-col min-w-0 text-left leading-tight">
          <span className="font-heading font-bold text-[13px] sm:text-sm text-dark truncate">
            Get an idea of what it&apos;ll cost
          </span>
          <span className="text-[11px] text-muted truncate">
            Free {tool.title} — instant, no signup
          </span>
        </span>

        <ArrowRight
          size={15}
          className="shrink-0 text-accent group-hover:translate-x-0.5 transition-transform"
        />
      </Link>
    </div>
  );
}
