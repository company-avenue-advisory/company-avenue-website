import { NextResponse } from "next/server";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { listEmployees } from "@/lib/auth";
import { toLead } from "@/lib/leads-db";

/* Role-scoped lead list.
     admin    → every lead + the employee roster (for the assign dropdown)
     employee → only the leads assigned to them
   Authentication is enforced in middleware; role scoping happens here. */

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  try {
    const db = await getDb();
    const filter = session.role === "admin" ? {} : { assignedTo: session.id };

    const docs = await db
      .collection("consultations")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray();

    return NextResponse.json({
      me: { id: session.id, name: session.name, role: session.role },
      employees: session.role === "admin" ? listEmployees() : [],
      leads: docs.map(toLead),
    });
  } catch (err) {
    console.error("[admin/leads] load failed:", err);
    return NextResponse.json(
      { error: "The database did not respond. Hit Refresh to try again." },
      { status: 502 }
    );
  }
}
