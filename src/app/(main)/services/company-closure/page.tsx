import type { Metadata } from "next";
import { CompanyClosurePage } from "@/components/sections/CompanyClosurePage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/CompanyClosurePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { ccfsStatus, closureAllIn, inr, CLOSURE_HEADLINE } from "@/lib/calc-fees";

/**
 * generateMetadata, not a static `metadata` export: the MCA fee quoted in the
 * description flips when CCFS-2026 expires, and a static object would freeze
 * whatever was true at build time. og:description and twitter:description are
 * not set here on purpose — the (main) layout leaves them unset so Next falls
 * back to this `description`, which means one edit fixes all three.
 */
export function generateMetadata(): Metadata {
  const ccfs = ccfsStatus();

  return {
    alternates: { canonical: "/services/company-closure" },
    title: "Company Closure — Strike Off & Winding Up",
    description:
      "Close your company legally via STK-2 strike off under Section 248 or voluntary winding up via NCLT. Clear pending filings, cancel GST, and achieve clean dissolution. " +
      `Strike-off ${inr(CLOSURE_HEADLINE.strikeOffStk2)} end to end; MCA fee ${inr(ccfs.stk2Fee)}` +
      (ccfs.live
        ? ` under CCFS-2026 to ${ccfs.deadline}.`
        : ` — the CCFS-2026 concession closed on ${ccfs.deadline}.`),
  };
}

export default function CompanyClosureServicePage() {
  // Resolved on the server and handed down as a prop. CompanyClosurePage is a
  // client component; letting it call `new Date()` itself would risk the server
  // and the browser disagreeing across the expiry boundary mid-hydration.
  const closure = closureAllIn({ directors: 2 });

  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <CompanyClosurePage
        closure={closure}
        pricingSlot={<ServicePricingBlock serviceId="company-closure" />}
        calcPill={<ServiceCalcPill serviceId="company-closure" />}
      />
    </>
  );
}
