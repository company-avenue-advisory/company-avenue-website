/**
 * Header pill for a service page whose calculator is embedded further down
 * the same page (via CalculatorPricingSlot), rather than living on a
 * separate calculator route. Jumps to #calculator instead of navigating
 * away — the generic ServiceCalcPill would send a visitor off this page to
 * reach a tool that's already right here.
 */
import { Calculator, ArrowDown } from "lucide-react";

export function JumpToCalculatorPill() {
  return (
    <div className="mb-7 -mt-1">
      <a
        href="#calculator"
        className="group inline-flex items-center gap-3 pl-2 pr-4 sm:pr-5 py-2 rounded-full bg-white border border-slate-200 ring-1 ring-accent/25 shadow-card hover:shadow-card-hover hover:ring-accent/60 hover:-translate-y-0.5 transition-all duration-300 max-w-full"
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-accent flex items-center justify-center text-white shadow-sm">
          <Calculator size={17} />
        </span>
        <span className="flex flex-col min-w-0 text-left leading-tight">
          <span className="font-heading font-bold text-[13px] sm:text-sm text-dark truncate">
            Get an idea of what it&apos;ll cost
          </span>
          <span className="text-[11px] text-muted truncate">
            Free calculator, below — instant, no signup
          </span>
        </span>
        <ArrowDown
          size={15}
          className="shrink-0 text-accent group-hover:translate-y-0.5 transition-transform"
        />
      </a>
    </div>
  );
}
