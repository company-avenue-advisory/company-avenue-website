import { SCHEMES } from "@/lib/schemes";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const ITEMS = SCHEMES.map((s) => ({
  href: `/startup-schemes/${s.slug}`,
  label: s.abbr && !s.name.includes(s.abbr) ? `${s.name} (${s.abbr})` : s.name,
}));

export default function SchemesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedLinks title="More government schemes" items={ITEMS} />
    </>
  );
}
