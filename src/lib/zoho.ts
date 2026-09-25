/* ─────────────────────────────────────────────────────────────
   Zoho CRM lead push — best-effort side channel alongside the
   existing Mongo save. A Zoho outage or misconfiguration must
   never block a form submission: every failure here is caught
   and logged, never thrown.

   Config (Vercel env vars):
     ZOHO_CLIENT_ID
     ZOHO_CLIENT_SECRET
     ZOHO_REFRESH_TOKEN   obtained once via /api/zoho/callback

   Data center is India (.in) — every URL below is zoho.in / zohoapis.in,
   not the .com defaults most Zoho docs show.
───────────────────────────────────────────────────────────── */

const TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";
const LEADS_URL = "https://www.zohoapis.in/crm/v6/Leads";
const REQUEST_TIMEOUT_MS = 8000;

/** Values are typed by hand into the Vercel dashboard, which happily stores
 *  stray quotes and whitespace. Strip both rather than fail silently. */
function envValue(name: string): string {
  return (process.env[name] ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

export function isZohoConfigured(): boolean {
  return !!(
    envValue("ZOHO_CLIENT_ID") &&
    envValue("ZOHO_CLIENT_SECRET") &&
    envValue("ZOHO_REFRESH_TOKEN")
  );
}

export async function getZohoAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: envValue("ZOHO_CLIENT_ID"),
    client_secret: envValue("ZOHO_CLIENT_SECRET"),
    refresh_token: envValue("ZOHO_REFRESH_TOKEN"),
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    body: params,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.access_token) {
    throw new Error(`token refresh failed: ${JSON.stringify(data ?? { status: res.status })}`);
  }
  return data.access_token;
}

/* The site's own service picklist (lib/calc-lead.ts CONTACT_SERVICES) uses
   different wording than the Zoho "Service Required" picklist values, which
   are fixed by the CRM layout and must match exactly or the field is
   rejected. This maps one to the other; anything unmapped falls through to
   "Other Compliance" rather than sending a value Zoho will refuse. */
const SERVICE_TO_ZOHO: Record<string, string> = {
  "Company Registration": "Company Registration/Incorporation",
  "GST Registration / Filing": "GST Registration & Filing",
  "Income Tax Return": "Tax Audit",
  "Trademark Registration": "Trademark/IP",
  "Accounting & Bookkeeping": "Accounting & Bookkeeping",
  "Payroll Management": "Other Compliance",
  "MSME / Startup India": "Other Compliance",
  "ROC Compliance": "ROC/ESOP Compliance",
  "IEC Registration": "Other Compliance",
  Other: "Other Compliance",
};

export function mapServiceToZoho(service: string | undefined): string | undefined {
  if (!service) return undefined;
  return SERVICE_TO_ZOHO[service] ?? "Other Compliance";
}

export type ZohoLead = {
  firstName?: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceRequired?: string; // must match a Leads "Service Required" picklist value — use mapServiceToZoho()
  leadSource?: string; // must match a Leads "Lead Source" picklist value
  urgency?: string; // must match a Leads "Urgency" picklist value
  city?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  gaClientId?: string;
};

/** Pure payload shaping — no network — so it has a runnable check without
 *  hitting Zoho. See zoho.test.mjs. */
export function buildZohoLeadPayload(lead: ZohoLead) {
  return {
    data: [
      {
        Last_Name: lead.lastName || "Website Lead",
        First_Name: lead.firstName || undefined,
        Email: lead.email || undefined,
        Phone: lead.phone || undefined,
        Company: lead.company || "Not Provided",
        Service_Required: lead.serviceRequired || undefined,
        Lead_Source: lead.leadSource || "Website",
        Urgency: lead.urgency || undefined,
        City: lead.city || undefined,
        UTM_Source: lead.utmSource || undefined,
        UTM_Medium: lead.utmMedium || undefined,
        UTM_Campaign: lead.utmCampaign || undefined,
        Google_Click_ID: lead.gclid || undefined,
        GA_Client_ID: lead.gaClientId || undefined,
      },
    ],
  };
}

export async function pushLeadToZoho(lead: ZohoLead): Promise<boolean> {
  if (!isZohoConfigured()) {
    console.warn("[zoho] not configured — skipping lead push");
    return false;
  }

  try {
    const accessToken = await getZohoAccessToken();
    const res = await fetch(LEADS_URL, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildZohoLeadPayload(lead)),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || body?.data?.[0]?.status !== "success") {
      throw new Error(JSON.stringify(body ?? { status: res.status }));
    }
    console.log("[zoho] lead pushed:", body.data[0].details?.id);
    return true;
  } catch (err) {
    console.error("[zoho] lead push failed:", err);
    return false;
  }
}
