import type { Metadata } from "next";
import { UsHeader, UsFooter } from "@/components/us/UsChrome";
import { US_SITE_URL } from "@/lib/us-content";

/* ─────────────────────────────────────────────────────────────────────────────
   The US property: us.companyavenueadvisory.com, served by a middleware
   rewrite of / → /us on that host.

   It sits OUTSIDE the (main) route group on purpose, so it inherits the shared
   shell (fonts, stylesheet, analytics) from the root layout but none of the
   India chrome, Organization schema or en_IN metadata defaults.

   metadataBase is overridden here so canonicals and OG URLs resolve against
   the subdomain rather than the main domain.
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(US_SITE_URL),
};

export default function UsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="bg-us-panel">
      {/* Theme init. Must run before the page paints, so it is inline and
          synchronous rather than an effect — a class applied after hydration
          would flash the wrong theme. The root layout additionally holds
          `body { visibility: hidden }` until DOMContentLoaded, so even a slow
          parse cannot show an unthemed frame.

          Only this route emits it: the India tree has no `dark:` classes and
          must never pick up a theme class. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('us-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t}catch(e){}})()`,
        }}
      />
      <UsHeader />
      <main>{children}</main>
      <UsFooter />
    </div>
  );
}
