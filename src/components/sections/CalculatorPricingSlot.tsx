/**
 * Calculator-first pricing slot for an entity-formation service page.
 *
 * SERVER COMPONENT — passed into a service page as its `pricingSlot` prop,
 * same convention as ServicePricingBlock. Replaces the static price panel
 * with the live calculator itself, pre-set to that service's entity type
 * (picker hidden — the visitor is already on this service's page).
 *
 * Piloted on Private Limited (Phase 2), then rolled out to the rest of the
 * six entity-formation services (Phase 4) once confirmed. Not for services
 * outside CompanyRegistrationCalculator's six entity types — those still use
 * ServicePricingBlock.
 */
import { CompanyRegistrationCalculator, type Entity } from "@/components/calculators/CompanyRegistrationCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServicePricing, pricingOffers } from "@/lib/pricing";
import { inr } from "@/lib/calc-fees";

export function CalculatorPricingSlot({
  serviceId,
  lockEntity,
}: {
  serviceId: string;
  lockEntity: Entity;
}) {
  // ServicePricingBlock used to emit this Offer schema next to its static
  // panel. The panel is gone here, but the schema shouldn't silently drop —
  // keep it, sourced the same way, next to the calculator that replaced it.
  const pricing = getServicePricing(serviceId);
  const offers = pricingOffers(serviceId);

  return (
    <section id="calculator" className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
      {pricing && offers && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: pricing.label,
            description: `${pricing.label} by Company Avenue Advisory — professional fee ${inr(pricing.price)}, ${pricing.feeNote}.`,
            brand: { "@type": "Brand", name: "Company Avenue Advisory" },
            offers,
          }}
        />
      )}
      <div className="container-custom">
        <div className="max-w-3xl mb-8">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-3">
            <span className="w-6 h-px bg-accent" />
            Transparent Pricing
          </span>
          <h2 className="heading-lg text-dark mb-3 text-balance">
            Work out your exact registration cost
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            {pricing && `Starting from ${inr(pricing.price)} — `}
            fill in your details below for the full breakdown, add GST, MSME or a trademark at
            our bundled rates, then lock it in with a free consultation.
          </p>
        </div>
        <CompanyRegistrationCalculator lockEntity={lockEntity} />
      </div>
    </section>
  );
}
