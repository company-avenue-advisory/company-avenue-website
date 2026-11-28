import Link from "next/link";
import { SEARCH_QA } from "@/lib/search-qa";

/** Quick answers for the search phrases a page is meant to rank for. Renders nothing if the path has none. */
export function SearchQA({ path }: { path: string }) {
  const items = SEARCH_QA[path];
  if (!items?.length) return null;
  return (
    <section className="py-12 bg-background">
      <div className="container-custom max-w-3xl">
        <h2 className="font-heading font-bold text-dark text-xl md:text-2xl mb-6">Quick Answers</h2>
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.q} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-dark text-sm md:text-base mb-2">{it.q}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {it.a}
                {it.link && (
                  <>
                    {" "}
                    <Link href={it.link.href} className="text-primary font-semibold hover:underline">
                      {it.link.label} →
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
