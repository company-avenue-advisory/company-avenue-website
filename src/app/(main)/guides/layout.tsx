import { GUIDES } from "@/lib/guides";
import { RelatedLinks } from "@/components/sections/RelatedLinks";

const ITEMS = GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.title }));

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedLinks title="More guides" items={ITEMS} />
    </>
  );
}
