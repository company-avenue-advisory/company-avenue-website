"use client";

import { useState } from "react";
import { US_ROLES, US_SOFTWARE_OPTIONS } from "@/lib/us-content";

/* ─────────────────────────────────────────────────────────────────────────────
   Discovery-call form for the US landing page.

   Posts to the EXISTING /api/consultation endpoint rather than a new one, so a
   US lead lands in the same MongoDB collection, fires the same Telegram alert
   and reaches the same admin console with no backend work. That endpoint's
   schema is fixed (name, email, phone, service, message), so the US-specific
   fields are composed into those two strings:

     service → "US Pod — <role>"   (prefix makes US leads obvious in the console)
     message → firm, software in use, and the backlog description

   Keep the service string under 100 characters — the API rejects longer.

   Styling note: this renders on the ink close section, so it is a paper card
   with its own light palette rather than inheriting the section's dark scheme.
───────────────────────────────────────────────────────────────────────────── */

type Status = "idle" | "sending" | "sent" | "error";

const CARD =
  "rounded-[1.75rem] bg-us-panel-raised p-6 shadow-[0_32px_80px_-28px_rgba(0,0,0,0.55)] sm:p-8";

export function UsLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [software, setSoftware] = useState<string[]>([]);

  function toggleSoftware(name: string) {
    setSoftware((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const firm = String(form.get("firm") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const backlog = String(form.get("backlog") ?? "").trim();

    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("Please enter a valid work email.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Please enter a phone number we can reach you on.");
    if (backlog.length < 10) return setError("Tell us briefly what is on your desk — a sentence is plenty.");

    const message = [
      `Firm / business: ${firm || "not given"}`,
      `Role: ${role}`,
      `Software in use: ${software.length ? software.join(", ") : "not given"}`,
      "",
      "What is on their desk:",
      backlog,
    ].join("\n");

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          // Truncated defensively: the API caps `service` at 100 chars.
          service: `US Pod — ${role}`.slice(0, 100),
          message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Could not submit right now. Please email us instead.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Could not submit right now. Please email us instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`${CARD} text-center`}>
        <span
          aria-hidden
          className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-us-lime text-lg font-bold text-us-ink"
        >
          ✓
        </span>
        <p className="mt-5 font-heading text-xl font-extrabold tracking-[-0.02em] text-us-panel-fg">
          Request received.
        </p>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-us-panel-muted">
          We will come back within one business day with two or three call times and a
          short note on how we would scope your pod.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-us-panel-line bg-us-panel px-3.5 py-2.5 text-[0.9rem] text-us-panel-fg placeholder:text-us-panel-muted/45 transition-colors focus:border-us-panel-fg focus:bg-us-panel-raised focus:outline-none focus:ring-2 focus:ring-us-lime/45";
  const labelClass =
    "mb-1.5 block font-heading text-[0.66rem] font-bold uppercase tracking-[0.14em] text-us-panel-muted";

  return (
    <form onSubmit={onSubmit} className={CARD}>
      <p className="font-heading text-xl font-extrabold tracking-[-0.025em] text-us-panel-fg">
        Book a discovery call
      </p>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-us-panel-muted">
        Thirty minutes. We scope a pod and put the number in writing the same day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="us-name">Name</label>
          <input id="us-name" name="name" required autoComplete="name" className={inputClass} placeholder="Jane Whitfield" />
        </div>
        <div>
          <label className={labelClass} htmlFor="us-email">Work email</label>
          <input id="us-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jane@whitfieldcpa.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="us-firm">Firm or business</label>
          <input id="us-firm" name="firm" className={inputClass} placeholder="Whitfield CPA LLC" />
        </div>
        <div>
          <label className={labelClass} htmlFor="us-phone">Direct line</label>
          <input id="us-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="+1 415 555 0132" />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="us-role">You are a</label>
        <select id="us-role" name="role" required defaultValue={US_ROLES[0]} className={inputClass}>
          {US_ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>Software in use</legend>
        <div className="flex flex-wrap gap-2">
          {US_SOFTWARE_OPTIONS.map((s) => {
            const on = software.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSoftware(s)}
                aria-pressed={on}
                className={
                  "rounded-full border px-3.5 py-1.5 text-[0.85rem] transition-colors " +
                  (on
                    ? "border-us-panel-fg bg-us-panel-fg text-us-panel"
                    : "border-us-panel-line bg-us-panel-raised text-us-panel-muted hover:border-us-panel-fg/35 hover:text-us-panel-fg")
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <label className={labelClass} htmlFor="us-backlog">
          What is the messiest thing on your desk?
        </label>
        <textarea
          id="us-backlog"
          name="backlog"
          rows={3}
          required
          className={inputClass}
          placeholder="Eleven months behind on a restaurant group, three entities, prior bookkeeper left in March."
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-[0.85rem] text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-us-panel-fg px-8 py-4 font-heading text-[0.95rem] font-bold tracking-[-0.01em] text-us-panel transition-colors hover:bg-us-panel-fg/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Book the call"}
      </button>

      <p className="mt-3 text-center text-[0.75rem] leading-relaxed text-us-panel-muted/70">
        Used only to prepare for your call. No sequences, no list.
      </p>
    </form>
  );
}
