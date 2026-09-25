import { NextRequest, NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";
import { pushDealWonToGA4 } from "@/lib/ga4";

/* ─────────────────────────────────────────────────────────────
   Zoho webhook target — fired by a Deals workflow rule when a
   deal's Stage changes to Closed Won. Looks the deal back up via
   the Zoho API (rather than trusting the webhook body) so it
   always has the fields it needs regardless of how the workflow
   action is configured, then reports it to GA4 as an offline
   conversion tied to the visitor's original GA_Client_ID.

   Best-effort, same as the lead push: this must never make Zoho's
   workflow retry storm or error out the CRM side. Always 200s.

   Config (Vercel env vars):
     ZOHO_WEBHOOK_SECRET   shared secret, checked against ?secret=
                            on the configured webhook URL

   Zoho CRM Deals module needs a GA_Client_ID custom field (same
   API name as on Leads) that carries over on Lead conversion —
   see the Leads → Deals field mapping in Setup.
───────────────────────────────────────────────────────────── */

const DEALS_URL = "https://www.zohoapis.in/crm/v6/Deals";
const REQUEST_TIMEOUT_MS = 8000;

function envValue(name: string): string {
  return (process.env[name] ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

async function fetchDeal(dealId: string, accessToken: string) {
  const url = `${DEALS_URL}/${dealId}?fields=Deal_Name,Amount,Stage,GA_Client_ID`;
  const res = await fetch(url, {
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.data?.[0]) {
    throw new Error(`Zoho deal fetch failed: ${JSON.stringify(body ?? { status: res.status })}`);
  }
  return body.data[0];
}

export async function POST(req: NextRequest) {
  const configuredSecret = envValue("ZOHO_WEBHOOK_SECRET");
  const givenSecret = new URL(req.url).searchParams.get("secret") ?? "";
  if (!configuredSecret || givenSecret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Accept the deal id from either a JSON body or a query param — Zoho's
  // webhook action can be configured either way, and we only ever need the
  // id since every other field is re-fetched from the API below.
  const body = await req.json().catch(() => ({}) as Record<string, unknown>);
  const dealId = String(body?.id ?? body?.deal_id ?? new URL(req.url).searchParams.get("id") ?? "");

  if (!dealId) {
    console.warn("[ga4] deal-won webhook fired with no deal id");
    return NextResponse.json({ ok: false, reason: "missing deal id" });
  }

  try {
    const accessToken = await getZohoAccessToken();
    const deal = await fetchDeal(dealId, accessToken);

    if (deal.Stage !== "Closed Won") {
      // Workflow rule should already scope this, but don't trust a stale
      // webhook fire or a manual test to have the right stage.
      console.log("[ga4] deal-won webhook fired for non-Closed-Won deal, skipping:", dealId, deal.Stage);
      return NextResponse.json({ ok: false, reason: "not Closed Won" });
    }

    const pushed = await pushDealWonToGA4({
      gaClientId: deal.GA_Client_ID,
      dealId,
      dealName: deal.Deal_Name,
      amount: deal.Amount,
    });

    return NextResponse.json({ ok: pushed });
  } catch (err) {
    console.error("[ga4] deal-won webhook handling failed:", err);
    // Still 200 — a Zoho workflow webhook retries on non-2xx, and repeated
    // retries won't fix a misconfiguration, they'll just spam the logs.
    return NextResponse.json({ ok: false, reason: "internal error" });
  }
}
