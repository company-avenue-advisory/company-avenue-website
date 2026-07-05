import https from "node:https";

/* ─────────────────────────────────────────────────────────────
   Server-only client for data.gov.in (Open Government Data Platform)
   — powers the Company Name Search tool using MCA's Company Master
   Data resource. Never import this from a "use client" file.

   NOTE: api.data.gov.in's server rejects Node's default TLS 1.3
   handshake (undici/fetch hangs until connect-timeout) but accepts
   TLS 1.2 — same behavior curl gets by default. We bypass fetch and
   use node:https directly, pinned to TLS 1.2, to work around it.
───────────────────────────────────────────────────────────── */
const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY ?? "";
const RESOURCE_ID = "ec58dab7-d891-4abb-936e-d5d274a6ce9b"; // Company Master Data — Ministry of Corporate Affairs
const HOST = "api.data.gov.in";
const PATH_BASE = `/resource/${RESOURCE_ID}`;

export function isDataGovConfigured() {
  return !!DATA_GOV_API_KEY;
}

function getJson(path: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      { host: HOST, path, minVersion: "TLSv1.2", maxVersion: "TLSv1.2", timeout: 15000 },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`data.gov.in error: ${res.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch {
            reject(new Error("data.gov.in: invalid JSON response"));
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("data.gov.in request timed out")));
    req.on("error", reject);
  });
}

export interface CompanyRecord {
  corporate_identification_number: string;
  date_of_registration: string;
  company_name: string;
  company_status: string;
  company_class: string;
  company_category: string;
  registered_state: string;
  registrar_of_companies: string;
  registered_office_address: string;
}

export interface NameLookupResult {
  records: CompanyRecord[];
  datasetUpdatedDate: string | null;
}

// The public API only supports exact-match filtering on company_name
// (it's an ES "keyword" field — no wildcard/fuzzy/partial support, confirmed
// by testing). This looks up one exact name and returns matching records.
//
// IMPORTANT: this dataset is a periodic snapshot, not live data — as of
// writing it was last refreshed 2024-12-13. Any company registered after
// that date will not appear here even though it is real and active. Every
// caller must surface `datasetUpdatedDate` to the user so a "no match" is
// never read as "definitely available".
export async function lookupExactCompanyName(name: string): Promise<NameLookupResult> {
  if (!DATA_GOV_API_KEY) throw new Error("DATA_GOV_API_KEY not configured");

  const params = new URLSearchParams({
    "api-key": DATA_GOV_API_KEY,
    format: "json",
    limit: "10",
    "filters[company_name]": name,
  });

  const json = await getJson(`${PATH_BASE}?${params.toString()}`);
  const records: CompanyRecord[] = (json.records as CompanyRecord[]) ?? [];

  // The dataset has near-duplicate snapshot rows per CIN — dedupe.
  const seen = new Set<string>();
  const deduped = records.filter((r) => {
    if (seen.has(r.corporate_identification_number)) return false;
    seen.add(r.corporate_identification_number);
    return true;
  });

  return { records: deduped, datasetUpdatedDate: (json.updated_date as string) ?? null };
}
