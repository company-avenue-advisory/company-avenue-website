import { NextRequest, NextResponse } from "next/server";
import { lookupExactCompanyName, isDataGovConfigured, type CompanyRecord } from "@/lib/datagovin";

const SUFFIXES = [" PRIVATE LIMITED", " LIMITED", " LLP", " OPC PRIVATE LIMITED"];

// Common descriptive words Indian founders actually combine with a base/brand
// name when registering (e.g. "ZTOWN" -> "ZTOWN TECHNOLOGIES PRIVATE LIMITED").
// The underlying API is exact-match only (no wildcard/substring search), so
// this is how we surface a "similar names" experience with real data instead
// of just checking the bare name.
const COMBO_WORDS = ["TECHNOLOGIES", "VENTURES", "SOLUTIONS", "ENTERPRISES", "INDUSTRIES", "INFRATECH", "EXPORTS", "CONSULTANTS"];
const COMBO_SUFFIXES = [" PRIVATE LIMITED", " LLP"];

interface CheckResult {
  name: string;
  records: CompanyRecord[];
}

async function checkAll(names: string[]): Promise<CheckResult[]> {
  return Promise.all(
    names.map(async (name) => ({ name, records: await lookupExactCompanyName(name) }))
  );
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
    const [primaryResults, comboResults] = await Promise.all([
      checkAll(primaryVariants),
      checkAll(comboVariants),
    ]);

    const primaryMatches = primaryResults.filter((r) => r.records.length > 0);

    const comboTaken = comboResults.filter((r) => r.records.length > 0);
    const comboAvailable = comboResults.filter((r) => r.records.length === 0).map((r) => r.name);

    return NextResponse.json({
      query: cleaned,
      checkedVariants: primaryVariants,
      available: primaryMatches.length === 0,
      matches: primaryMatches,
      combinations: {
        taken: comboTaken.map((t) => ({ name: t.name, records: t.records })),
        available: comboAvailable,
      },
    });
  } catch (err) {
    console.error("[Company name search]", err);
    return NextResponse.json({ error: "Could not complete the search right now. Please try again." }, { status: 502 });
  }
}
