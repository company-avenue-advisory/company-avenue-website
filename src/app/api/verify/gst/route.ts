import { NextRequest, NextResponse } from "next/server";
import { sandboxPost, isSandboxConfigured } from "@/lib/sandbox";

const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export async function POST(req: NextRequest) {
  if (!isSandboxConfigured()) {
    return NextResponse.json({ error: "GST verification is not configured yet." }, { status: 503 });
  }

  const { gstin } = await req.json();
  if (!gstin || typeof gstin !== "string" || !GSTIN_PATTERN.test(gstin.toUpperCase())) {
    return NextResponse.json({ error: "Enter a valid 15-character GSTIN." }, { status: 400 });
  }

  try {
    const result = await sandboxPost<{
      data: { data: Record<string, unknown> };
    }>("/gst/compliance/public/gstin/search", { gstin: gstin.toUpperCase() });

    const d = result.data?.data ?? {};

    if (!d.gstin || d.error_cd) {
      return NextResponse.json({ error: "No GST registration found for this GSTIN." }, { status: 404 });
    }

    const addr = (d.pradr as { addr?: Record<string, string> } | undefined)?.addr;

    return NextResponse.json({
      gstin: d.gstin,
      legalName: d.lgnm,
      tradeName: d.tradeNam,
      businessType: d.ctb,
      taxpayerType: d.dty,
      status: d.sts,
      registrationDate: d.rgdt,
      lastUpdated: d.lstupdt,
      address: addr
        ? [addr.bno, addr.bnm, addr.st, addr.loc, addr.dst, addr.stcd, addr.pncd].filter(Boolean).join(", ")
        : null,
    });
  } catch (err) {
    console.error("[GST verify]", err);
    return NextResponse.json({ error: "Could not verify this GSTIN right now. Please try again." }, { status: 502 });
  }
}
