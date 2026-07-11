import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-heading font-bold text-primary/10 mb-4">404</p>
        <h1 className="heading-md text-dark mb-4">Page Not Found</h1>
        <p className="text-muted text-base mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
        <div className="mt-10">
          <p className="mb-3 text-sm font-heading font-semibold text-dark">Popular services</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Private Limited", href: "/services/private-limited-company" },
              { label: "GST Registration", href: "/services/gst-registration" },
              { label: "Trademark", href: "/services/trademark-registration" },
              { label: "Income Tax Filing", href: "/services/income-tax-return" },
              { label: "All Services", href: "/services" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-muted hover:border-primary/30 hover:text-primary"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
