"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

/**
 * Footer newsletter form.
 *
 * Replaces a decorative <form> that had no onSubmit and no action — the email
 * was discarded on submit. Now posts to /api/newsletter and fires the WS-3.2
 * `newsletter_signup` event on a genuinely successful response, never on the
 * button click.
 */
export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error ?? "Could not subscribe. Please try again.");
        setState("idle");
        return;
      }

      trackEvent("newsletter_signup", {
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      });
      setState("done");
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-white/70">
        <CheckCircle2 size={16} className="text-accent shrink-0" />
        You&apos;re subscribed. We&apos;ll email you before the deadlines that matter.
      </p>
    );
  }

  return (
    <div className="w-full md:w-auto">
      <form onSubmit={onSubmit} className="flex w-full md:w-auto gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/50 transition-colors"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="px-5 py-3 bg-accent hover:bg-accent-dark disabled:opacity-60 text-white rounded-xl text-sm font-heading font-semibold transition-colors inline-flex items-center gap-2"
        >
          {state === "sending" && <Loader2 size={14} className="animate-spin" />}
          {state === "sending" ? "Subscribing" : "Subscribe"}
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
      {/* DPDP (WS-6): a plain-language statement of what the address is used
          for, at the point of collection. The Principal's formal notice text
          replaces this wording once issued. */}
      <p className="mt-2 text-xs text-white/30">
        Compliance deadline reminders only. Unsubscribe any time.{" "}
        <a href="/privacy" className="underline hover:text-white/50">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
