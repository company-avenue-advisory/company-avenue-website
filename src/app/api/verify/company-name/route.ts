import { NextRequest, NextResponse } from "next/server";
import { lookupExactCompanyName, isDataGovConfigured, type CompanyRecord } from "@/lib/datagovin";
import { sandboxPost, isSandboxConfigured } from "@/lib/sandbox";

const SUFFIXES = [" PRIVATE LIMITED", " LIMITED", " LLP", " OPC PRIVATE LIMITED"];

// Common descriptive words Indian founders actually combine with a base/brand
// name when registering (e.g. "ZTOWN" -> "ZTOWN TECHNOLOGIES PRIVATE LIMITED").
// The underlying API is exact-match only (no wildcard/substring search), so
// this is how we surface a "similar names" experience with real data instead
// of just checking the bare name.
const COMBO_WORDS = ["TECHNOLOGIES", "VENTURES", "SOLUTIONS", "ENTERPRISES", "INDUSTRIES", "INFRATECH", "EXPORTS", "CONSULTANTS"];
const COMBO_SUFFIXES = [" PRIVATE LIMITED", " LLP"];

interface MatchedCompany extends CompanyRecord {
  directors: { name: string; designation: string }[] | null;
}

interface CheckResult {
  name: string;
  records: CompanyRecord[];
}

async function checkAll(names: string[]): Promise<{ results: CheckResult[]; datasetUpdatedDate: string | null }> {
  let datasetUpdatedDate: string | null = null;
  const results = await Promise.all(
    names.map(async (name) => {
      const { records, datasetUpdatedDate: d } = await lookupExactCompanyName(name);
      if (d) datasetUpdatedDate = d;
      return { name, records };
    })
  );
  return { results, datasetUpdatedDate };
}

// Best-effort enrichment: pull director/signatory names for a matched CIN via
// Sandbox's live MCA connector. This connector has been unreliable (times out
// upstream) — if it fails, we simply return without directors rather than
// blocking the whole response on it.
async function enrichWithDirectors(cin: string): Promise<{ name: string; designation: string }[] | null> {
  if (!isSandboxConfigured()) return null;
  try {
    const result = await sandboxPost<{
      data: { "directors/signatory_details": { name: string; designation: string }[] };
    }>("/mca/company/master-data/search", {
      "@entity": "in.co.sandbox.kyc.mca.master_data.request",
      id: cin,
      consent: "Y",
      reason: "Enriching company name search result with director details for prospective founder.",
    });
    return result.data["directors/signatory_details"] ?? null;
  } catch {
    return null;
  }
}

async function toMatchedCompany(record: CompanyRecord): Promise<MatchedCompany> {
  const directors = await enrichWithDirectors(record.corporate_identification_number);
  return { ...record, directors };
}

export async function POST(req: NextRequest) {
  if (!isDataGovConfigured()) {
    return NextResponse.json({ error: "Company name search is not configured yet." }, { status: 503 });
  }

  const { name } = await req.json();
  const cleaned = String(name ?? "").trim().toUpperCase().replace(/\s+/g, " ");

  if (cleaned.length < 3) {
    return NextResponse.json({ error: "Enter at least 3 characters." }, { status: 400 });
  }

  // If the user already typed a full legal suffix, only check it as-is —
  // don't stack another suffix on top of it.
  const alreadySuffixed = SUFFIXES.some((s) => cleaned.endsWith(s.trim()));
  const primaryVariants = alreadySuffixed
    ? [cleaned]
    : Array.from(new Set([cleaned, ...SUFFIXES.map((s) => `${cleaned}${s}`)]));

  const comboVariants = alreadySuffixed
    ? []
    : COMBO_WORDS.flatMap((word) => COMBO_SUFFIXES.map((s) => `${cleaned} ${word}${s}`));

  try {
    const [primary, combos] = await Promise.all([
      checkAll(primaryVariants),
      comboVariants.length ? checkAll(comboVariants) : Promise.resolve({ results: [] as CheckResult[], datasetUpdatedDate: null }),
    ]);

    const datasetUpdatedDate = primary.datasetUpdatedDate ?? combos.datasetUpdatedDate;

    const primaryHits = primary.results.filter((r) => r.records.length > 0).flatMap((r) => r.records);
    const primaryMatches = await Promise.all(primaryHits.map(toMatchedCompany));

    const comboTakenRaw = combos.results.filter((r) => r.records.length > 0);
    const comboTaken = await Promise.all(
      comboTakenRaw.map(async (t) => ({ name: t.name, records: await Promise.all(t.records.map(toMatchedCompany)) }))
    );
    const comboAvailable = combos.results.filter((r) => r.records.length === 0).map((r) => r.name);

    return NextResponse.json({
      query: cleaned,
      checkedVariants: primaryVariants,
      available: primaryMatches.length === 0,
      matches: primaryMatches,
      datasetUpdatedDate,
      combinations: {
        taken: comboTaken,
        available: comboAvailable,
      },
    });
  } catch (err) {
    console.error("[Company name search]", err);
    return NextResponse.json({ error: "Could not complete the search right now. Please try again." }, { status: 502 });
  }
}
