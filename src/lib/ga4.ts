/* ─────────────────────────────────────────────────────────────
   GA4 offline conversion push — reports a Zoho "Closed Won" deal
   back into GA4 as a server-side event, tied to the visitor's
   original client_id (captured on the lead as GA_Client_ID).
   This is what lets GA4 (and, if linked, Google Ads bidding) see
   actual revenue instead of just form-submission counts.

   Best-effort, same as zoho.ts: never throws, a GA4 outage or
   missing client_id must never break the caller.

   Config (Vercel env vars):
     GA4_MEASUREMENT_ID   e.g. G-P3LQECEJ5L (not secret)
     GA4_API_SECRET       Measurement Protocol API secret (secret)
───────────────────────────────────────────────────────────── */

const MP_URL = "https://www.google-analytics.com/mp/collect";
const REQUEST_TIMEOUT_MS = 8000;

function envValue(name: string): string {
  return (process.env[name] ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

export function isGa4Configured(): boolean {
  return !!(envValue("GA4_MEASUREMENT_ID") && envValue("GA4_API_SECRET"));
}

export type DealWonEvent = {
  gaClientId: string;
  dealId: string;
  dealName?: string;
  amount?: number;
  currency?: string; // defaults to INR
};

/** Pure payload shaping — no network — so it has a runnable check without
 *  hitting GA4. See ga4.test.mjs. */
export function buildDealWonPayload(deal: DealWonEvent) {
  return {
    client_id: deal.gaClientId,
    events: [
      {
        name: "deal_won",
        params: {
          transaction_id: deal.dealId,
          value: deal.amount ?? undefined,
          currency: deal.currency || "INR",
          deal_name: deal.dealName || undefined,
        },
      },
    ],
  };
}

export async function pushDealWonToGA4(deal: DealWonEvent): Promise<boolean> {
  if (!isGa4Configured()) {
    console.warn("[ga4] not configured — skipping offline conversion push");
    return false;
  }
  if (!deal.gaClientId) {
    console.warn("[ga4] no GA_Client_ID on deal — skipping (lead had no GA client id captured)");
    return false;
  }

  const url = `${MP_URL}?measurement_id=${encodeURIComponent(envValue("GA4_MEASUREMENT_ID"))}&api_secret=${encodeURIComponent(envValue("GA4_API_SECRET"))}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildDealWonPayload(deal)),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    // Measurement Protocol returns 204 with no body on success and doesn't
    // validate the payload server-side — a 2xx is all we can check for.
    if (!res.ok) {
      throw new Error(`GA4 MP request failed: ${res.status}`);
    }
    console.log("[ga4] deal_won pushed:", deal.dealId);
    return true;
  } catch (err) {
    console.error("[ga4] deal_won push failed:", err);
    return false;
  }
}
