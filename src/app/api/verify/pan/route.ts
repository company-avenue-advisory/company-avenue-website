import { NextRequest, NextResponse } from "next/server";
import { sandboxPost, isSandboxConfigured } from "@/lib/sandbox";

const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const DOB_PATTERN = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;

export async function POST(req: NextRequest) {
  if (!isSandboxConfigured()) {
    return NextResponse.json({ error: "PAN verification is not configured yet." }, { status: 503 });
  }

  const { pan, name, dob, consent } = await req.json();

  if (!pan || !PAN_PATTERN.test(String(pan).toUpperCase())) {
    return NextResponse.json({ error: "Enter a valid 10-character PAN." }, { status: 400 });
  }
  if (!name || String(name).trim().length < 2) {
    return NextResponse.json({ error: "Enter the name exactly as printed on the PAN card." }, { status: 400 });
  }
  if (!dob || !DOB_PATTERN.test(dob)) {
    return NextResponse.json({ error: "Enter date of birth as DD/MM/YYYY." }, { status: 400 });
  }
  if (consent !== "Y") {
    return NextResponse.json({ error: "Consent is required to run this verification." }, { status: 400 });
  }

  try {
    const result = await sandboxPost<{
      data: {
        pan: string;
        category: string;
        status: string;
        remarks: string | null;
        name_as_per_pan_match: boolean;
        date_of_birth_match: boolean;
        aadhaar_seeding_status: "y" | "n" | "na";
      };
    }>("/kyc/pan/verify", {
      "@entity": "in.co.sandbox.kyc.pan_verification.request",
      pan: String(pan).toUpperCase(),
      name_as_per_pan: name,
      date_of_birth: dob,
      consent: "Y",
      reason: "Verifying PAN details for Company Avenue Advisory onboarding/compliance service.",
    });

    const d = result.data;
    return NextResponse.json({
      pan: d.pan,
      category: d.category,
      status: d.status,
      nameMatch: d.name_as_per_pan_match,
      dobMatch: d.date_of_birth_match,
      aadhaarLinked: d.aadhaar_seeding_status === "y",
    });
  } catch (err) {
    console.error("[PAN verify]", err);
    return NextResponse.json({ error: "Could not verify this PAN right now. Please try again." }, { status: 502 });
  }
}
