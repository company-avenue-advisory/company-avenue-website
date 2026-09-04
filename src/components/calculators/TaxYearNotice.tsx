import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   WS-7.1 — Tax Year signposting.

   Context from the work order, all [VERIFIED]:
     · The Income-tax Act, 2025 took effect on 1 April 2026.
     · It introduces a unified "Tax Year" in place of the previous year /
       assessment year pairing.
     · The first Tax Year under the new Act is 2026-27.

   The calculator on this page computes FY 2025-26 (AY 2026-27) under the
   previous Act. WS-7.1 requires it to stay at its current URL, clearly
   labelled, because belated and revised returns for that period are still
   filed under those rules — and requires clear signposting so a visitor who
   wants the current Tax Year does not silently use the wrong tool.

   ── DELIBERATELY STATES NO RATES, SLABS OR THRESHOLDS FOR TY 2026-27 ──────
   WS-7.1 is explicit: build to the Principal's specification only, and do not
   source rates, slabs or terminology from any other reference, including AI
   tools or competitor sites. So this notice tells the visitor which period the
   tool covers and where to get current-year advice from a person. It must stay
   that way until the specification sheet arrives. Do not "temporarily" add a
   slab table here.
───────────────────────────────────────────────────────────────────────────── */

export function TaxYearNotice() {
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="font-heading text-sm font-bold text-dark">
            This tool covers FY 2025-26 (assessed in 2026-27, under the
            Income-tax Act, 1961)
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
            Use it for a belated or revised return for that period, which is
            still governed by the previous Act&apos;s rules. The Income-tax Act,
            2025 took effect on 1 April 2026 and replaces the previous
            year / assessment year pairing with a single{" "}
            <strong className="text-dark">Tax Year</strong>; the first Tax Year
            under it is 2026-27.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            A Tax Year 2026-27 calculator is being prepared against our
            Principal&apos;s reviewed specification. Until it is published we
            are not showing figures for that year here — for a current-year
            computation, speak to a Chartered Accountant rather than relying on
            last year&apos;s slabs.
          </p>
          <Link
            href="/contact"
            className="mt-3.5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
          >
            Get a Tax Year 2026-27 computation from a CA
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
