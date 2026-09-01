/**
 * Carrying a calculator's result into /contact.
 *
 * THE PROBLEM THIS SOLVES — a visitor could configure a Private Limited in
 * Delhi at ₹1,00,000 capital with two directors, see ₹10,352, click "Lock this
 * in — book a free consultation", and land on a blank form. Whoever picked up
 * the lead knew no more than if they had clicked "Contact Us" from the homepage.
 *
 * Every calculator with a "book a free consultation" CTA builds its href with
 * `calcContactHref` below; /contact reads the params on load, pre-selects the
 * Service Required dropdown and pre-fills the message. The visitor can edit
 * every word of it before sending — nothing here is locked.
 *
 * Arriving at /contact WITHOUT these params must leave the form exactly as it
 * was. This is additive.
 */

/** Query keys /contact reads. Kept short — they end up in a shared URL. */
export const CALC_LEAD_PARAMS = {
  /** Value to pre-select in the "Service Required" dropdown */
  service: "service",
  /** Which calculator sent them, for the lead record */
  from: "from",
  /** Human-readable configuration summary, pre-filled into Message */
  summary: "summary",
} as const;

export type CalcLead = {
  /**
   * Must match one of the `services` options rendered by ContactPage, or the
   * select silently falls back to its placeholder. `isKnownService` guards this.
   */
  service: string;
  /** Calculator name, as a person would say it */
  from: string;
  /** Label → value pairs, rendered into the message in order */
  rows: { label: string; value: string }[];
  /** The headline number, e.g. "₹10,352 all-in" */
  total?: string;
};

/**
 * The exact option list ContactPage renders. Duplicated deliberately: this
 * module is imported by "use client" calculators, and pulling the whole contact
 * component in just to read an array would be worse. `isKnownService` is the
 * safety net — a typo here fails the guard rather than reaching a user.
 */
export const CONTACT_SERVICES = [
  "Company Registration",
  "GST Registration / Filing",
  "Income Tax Return",
  "Trademark Registration",
  "Accounting & Bookkeeping",
  "Payroll Management",
  "MSME / Startup India",
  "ROC Compliance",
  "IEC Registration",
  "Other",
] as const;

export function isKnownService(value: string): boolean {
  return (CONTACT_SERVICES as readonly string[]).includes(value);
}

/** The message body pre-filled into /contact's Message field. */
export function calcLeadMessage(lead: CalcLead): string {
  const lines = [
    `I used the ${lead.from} and would like to go ahead with this configuration:`,
    "",
    ...lead.rows.map((r) => `• ${r.label}: ${r.value}`),
  ];
  if (lead.total) {
    lines.push("", `Estimated cost: ${lead.total}`);
  }
  lines.push("", "Please confirm the final quote and the next steps.");
  return lines.join("\n");
}

/** "/contact?service=…&from=…&summary=…" */
export function calcContactHref(lead: CalcLead): string {
  const q = new URLSearchParams();
  // An unrecognised service would leave the dropdown on its placeholder and
  // look broken, so fall back to the catch-all option instead.
  q.set(CALC_LEAD_PARAMS.service, isKnownService(lead.service) ? lead.service : "Other");
  q.set(CALC_LEAD_PARAMS.from, lead.from);
  q.set(CALC_LEAD_PARAMS.summary, calcLeadMessage(lead));
  return `/contact?${q.toString()}`;
}
