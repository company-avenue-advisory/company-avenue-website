"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface RelatedItem {
  href: string;
  label: string;
}

/**
 * "More in this section" strip, rendered by each section layout below the
 * page. Each page links the next few pages in its section's list (wrapping
 * round), so every page has several incoming internal links — Semrush had
 * flagged 61 pages that only the section hub linked to.
 */
export function RelatedLinks({
  title,
  items,
  count = 4,
}: {
  title: string;
  items: RelatedItem[];
  count?: number;
}) {
  const pathname = (usePathname() ?? "").replace(/\/$/, "");
  const at = items.findIndex((i) => i.href === pathname);
  if (at === -1 || items.length < 2) return null;

  const picks: RelatedItem[] = [];
  for (let k = 1; k <= Math.min(count, items.length - 1); k++) {
    picks.push(items[(at + k) % items.length]);
  }

  return (
    <nav aria-label={title} className="border-t border-slate-100 bg-slate-50/60">
      <div className="container-custom py-10">
        <h2 className="font-heading font-semibold text-dark text-lg mb-4">{title}</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="block h-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-dark hover:border-primary/30 hover:text-primary transition-colors"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
