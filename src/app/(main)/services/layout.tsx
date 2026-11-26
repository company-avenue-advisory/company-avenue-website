import { SERVICES } from "@/lib/constants";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const ITEMS = SERVICES.map((s) => ({ href: `/services/${s.id}`, label: s.title }));

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedLinks title="More services" items={ITEMS} />
    </>
  );
}
