import { NextRequest, NextResponse } from "next/server";
import { sandboxPost, isSandboxConfigured } from "@/lib/sandbox";

const DIN_PATTERN = /^[0-9]{8}$/;

const REASON = "Verifying company/director details for Company Avenue Advisory client due-diligence.";

export async function POST(req: NextRequest) {
  if (!isSandboxConfigured()) {
    return NextResponse.json({ error: "Company verification is not configured yet." }, { status: 503 });
  }

  const { type, id } = await req.json();
  const value = String(id ?? "").toUpperCase().trim();

  if (type === "cin") {
    if (value.length < 7 || value.length > 21) {
      return NextResponse.json({ error: "Enter a valid CIN or LLPIN." }, { status: 400 });
    }
    try {
      const result = await sandboxPost<{
        data: {
          company_master_data: Record<string, unknown>;
          "directors/signatory_details": unknown[];
        };
      }>("/mca/company/master-data/search", {
        "@entity": "in.co.sandbox.kyc.mca.master_data.request",
        id: value,
        consent: "Y",
        reason: REASON,
      });

      const d = result.data.company_master_data;
      return NextResponse.json({
        kind: "company",
        cin: d.cin,
        name: d.company_name,
        status: d["company_status(for_efiling)"],
        category: d.company_category,
        classOfCompany: d.class_of_company,
        incorporationDate: d.date_of_incorporation,
        address: d.registered_address,
        rocCode: d.roc_code,
        paidUpCapital: d["paid_up_capital(rs)"],
        authorisedCapital: d["authorised_capital(rs)"],
        directors: result.data["directors/signatory_details"] ?? [],
      });
    } catch (err) {
      console.error("[Company verify]", err);
      return NextResponse.json({ error: "Could not verify this CIN right now. Please try again." }, { status: 502 });
    }
  }

  if (type === "din") {
    if (!DIN_PATTERN.test(value)) {
      return NextResponse.json({ error: "Enter a valid 8-digit DIN." }, { status: 400 });
    }
    try {
      const result = await sandboxPost<{
        data: {
          director_data: { din: string; name: string };
          company_data: { company_name: string; designation: string; begin_date: string; end_date: string; "cin/fcrn": string }[];
          llp_data: { llp_name: string; designation: string; begin_date: string; end_date: string; "llpin/fllpin": string }[];
        };
      }>("/mca/director/master-data/search", {
        "@entity": "in.co.sandbox.kyc.mca.master_data.request",
        id: value,
        consent: "Y",
        reason: REASON,
      });

      const d = result.data;
      return NextResponse.json({
        kind: "director",
        din: d.director_data.din,
        name: d.director_data.name,
        companies: d.company_data ?? [],
        llps: d.llp_data ?? [],
      });
    } catch (err) {
      console.error("[Director verify]", err);
      return NextResponse.json({ error: "Could not verify this DIN right now. Please try again." }, { status: 502 });
    }
  }

  return NextResponse.json({ error: "Invalid lookup type." }, { status: 400 });
}
