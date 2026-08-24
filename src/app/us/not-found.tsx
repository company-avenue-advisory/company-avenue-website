/* The US segment gets its own not-found so the India 404 — which offers GST,
   trademark and ROC services — is neither rendered nor serialised into this
   route's payload. In practice middleware answers stray paths on the US host
   before Next gets here; this covers the rest. */
export default function UsNotFound() {
  return (
    <section className="bg-us-bg py-28">
      <div className="mx-auto max-w-md px-5 text-center">
        <p className="font-heading text-[5rem] font-extrabold leading-none tracking-[-0.05em] text-us-fg/10">
          404
        </p>
        <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-[-0.03em] text-us-fg">
          Page not found
        </h1>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-us-muted">
          This address is not part of the Avenue Advisory US site.
        </p>
        {/* A hard <a>, not next/link: on the US host "/" is a middleware
            rewrite to /us, and a full document load is the only navigation
            guaranteed to re-run that rewrite. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-us-lime px-7 py-3.5 font-heading text-[0.95rem] font-bold text-us-ink transition-transform hover:scale-[1.03]"
        >
          Go to the US home page
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
