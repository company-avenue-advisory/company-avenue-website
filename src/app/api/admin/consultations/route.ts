import { NextResponse } from "next/server";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

// Protected by Basic Auth in middleware.ts — no unauthenticated request
// reaches this handler.
export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  try {
    const db = await getDb();
    const docs = await db
      .collection("consultations")
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const consultations = docs.map((d) => ({
      id: String(d._id),
      name: d.name ?? "",
      email: d.email ?? "",
      phone: d.phone ?? "",
      service: d.service ?? "",
      message: d.message ?? "",
      status: d.status ?? "new",
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
    }));

    return NextResponse.json({ consultations });
  } catch (err) {
    console.error("[admin/consultations]", err);
    return NextResponse.json({ error: "Could not load submissions." }, { status: 502 });
  }
}
