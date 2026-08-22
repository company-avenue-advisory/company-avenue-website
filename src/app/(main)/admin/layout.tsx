import type { Metadata } from "next";

// The admin pages are client components, so they cannot export metadata
// themselves. robots.ts already disallows /admin, but robots.txt only stops
// crawling — it does not stop indexing of a URL discovered elsewhere. This
// meta tag is what actually keeps the console out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
