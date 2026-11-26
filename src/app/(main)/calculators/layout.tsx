import { CALCULATORS, calculatorLabel } from "@/lib/calculators";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const ITEMS = CALCULATORS.map((c) => ({ href: `/calculators/${c}`, label: calculatorLabel(c) }));

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedLinks title="More calculators" items={ITEMS} />
    </>
  );
}
