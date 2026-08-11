import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import { COMPANY } from "@/lib/constants";
import { notifyNewLead } from "@/lib/whatsapp";
import { newTaskList } from "@/lib/leads";

// Same shape the form validates against on the client.
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(10).max(20),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
});

const resendApiKey = process.env.RESEND_API_KEY ?? "";
const NOTIFY_FROM = process.env.CONSULTATION_FROM_EMAIL ?? "onboarding@resend.dev";
const NOTIFY_TO = process.env.CONSULTATION_TO_EMAIL ?? COMPANY.email;

export async function POST(req: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "The form is not configured yet. Please try again shortly." },
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
      { error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const submission = {
    ...data,
    status: "new" as const,
    // Lead-management fields the admin console reads. Seeded here so a brand
    // new lead already has its follow-up checklist waiting.
    assignedTo: null as string | null,
    assignedAt: null as Date | null,
    completedAt: null as Date | null,
    tasks: newTaskList(),
    notes: [] as { text: string; by: string; at: Date }[],
    createdAt: new Date(),
    userAgent: req.headers.get("user-agent") ?? null,
  };

  // 1) Persist to MongoDB — this is the source of truth.
  try {
    const db = await getDb();
    await db.collection("consultations").insertOne(submission);
  } catch (err) {
    console.error("[consultation] DB insert failed", err);
    return NextResponse.json(
      { error: "Could not submit right now. Please try again or WhatsApp us." },
      { status: 502 }
    );
  }

  // 2) Instant WhatsApp alert to the boss — this is what stops a lead going
  //    cold. Best-effort like email: the lead is already stored above, so a
  //    WhatsApp failure must never surface to the visitor.
  await notifyNewLead(data);

  // 3) Best-effort email notification. Never fail the request if email
  //    is down — the lead is already safely stored above.
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: `Avenue Advisory <${NOTIFY_FROM}>`,
        to: NOTIFY_TO,
        replyTo: data.email,
        subject: `New consultation: ${data.name} — ${data.service}`,
        text: [
          `New consultation request from the website.`,
          ``,
          `Name:    ${data.name}`,
          `Email:   ${data.email}`,
          `Phone:   ${data.phone}`,
          `Service: ${data.service}`,
          ``,
          `Message:`,
          data.message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[consultation] email notify failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
