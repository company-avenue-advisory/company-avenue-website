import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

/* ─────────────────────────────────────────────────────────────────────────────
   Newsletter subscribe endpoint.

   The footer has invited visitors to "Stay ahead of compliance deadlines" for
   as long as this build has existed, but the form had no submit handler and no
   endpoint — the email went nowhere. WS-3.2 lists `newsletter_signup` as a
   tracked event, which is impossible while the form is inert, so the endpoint
   exists now.

   DPDP note for WS-6: this stores an email address and nothing else. The
   consent text shown next to the field, the retention period and the
   unsubscribe route are all listed as outstanding in DPDP-DATA-INVENTORY.md —
   do not extend the fields captured here until the Principal's position is
   issued.
───────────────────────────────────────────────────────────────────────────── */

const schema = z.object({
  email: z.string().email().max(200),
  /** Where on the site they subscribed — for attribution, not identification. */
  source: z.string().max(120).optional(),
});

export async function POST(req: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "Subscriptions are not configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const email = parsed.data.email.trim().toLowerCase();

  try {
    const db = await getDb();
    // Upsert on the lowercased address: re-subscribing is idempotent and never
    // creates a duplicate record to have to reconcile later.
    await db.collection("newsletter_subscribers").updateOne(
      { email },
      {
        $set: {
          email,
          source: parsed.data.source ?? null,
          status: "subscribed",
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("[newsletter] upsert failed", err);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
