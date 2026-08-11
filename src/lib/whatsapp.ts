/* ─────────────────────────────────────────────────────────────
   WhatsApp notifications — fires the instant a lead lands, so the
   boss knows before the lead goes cold.

   Two providers, switched with WHATSAPP_PROVIDER:

   • "callmebot" (default) — 100% free, no Meta account, no billing.
     Each recipient sends "I allow callmebot to send me messages" on
     WhatsApp to +34 623 80 11 90 and gets a personal API key back.
     (That number has changed before — verify it at callmebot.com if the
     bot stops replying.)
     Put that key + their number in env. Personal-use service, rate
     limited to roughly one message per few seconds — plenty for leads.

   • "meta" — the official WhatsApp Cloud API. Same env-driven
     recipients; set the token + phone number id and it takes over.
     Business-initiated messages outside a 24h window need an approved
     template, so set WHATSAPP_META_TEMPLATE once you have one.

   Every send is best-effort: a failure is logged and swallowed so a
   WhatsApp outage can never lose a lead or break the admin console.
───────────────────────────────────────────────────────────── */

import { normalisePhone } from "@/lib/leads";

type Provider = "callmebot" | "meta" | "none";

export type Recipient = {
  id: string;
  label: string;
  phone: string;
  /** CallMeBot only — each recipient authorises the bot separately. */
  apiKey?: string;
};

const SEND_TIMEOUT_MS = 8000;

function provider(): Provider {
  const p = (process.env.WHATSAPP_PROVIDER ?? "callmebot").toLowerCase();
  return p === "meta" || p === "none" ? p : "callmebot";
}

function recipient(id: string, label: string, phoneVar: string, keyVar: string): Recipient | null {
  const phone = normalisePhone(process.env[phoneVar] ?? "");
  if (!phone) return null;
  return { id, label, phone, apiKey: process.env[keyVar] ?? "" };
}

/** Who gets pinged when a brand-new lead arrives. */
export function leadAlertRecipients(): Recipient[] {
  return [
    recipient("boss", "Boss", "WHATSAPP_BOSS_PHONE", "WHATSAPP_BOSS_APIKEY"),
    // Optional: set these only if you also want employees pinged on every lead.
    ...(process.env.WHATSAPP_NOTIFY_EMPLOYEES === "true"
      ? [employeeRecipient("emp1"), employeeRecipient("emp2")]
      : []),
  ].filter((r): r is Recipient => r !== null);
}

/** The WhatsApp identity of an employee account, for assignment pings. */
export function employeeRecipient(userId: string): Recipient | null {
  if (userId === "emp1") {
    return recipient("emp1", "Employee 1", "WHATSAPP_EMP1_PHONE", "WHATSAPP_EMP1_APIKEY");
  }
  if (userId === "emp2") {
    return recipient("emp2", "Employee 2", "WHATSAPP_EMP2_PHONE", "WHATSAPP_EMP2_APIKEY");
  }
  return null;
}

export function isWhatsAppConfigured(): boolean {
  return provider() !== "none" && leadAlertRecipients().length > 0;
}

/* ── Providers ────────────────────────────────────────────── */

async function sendViaCallMeBot(to: Recipient, text: string): Promise<void> {
  if (!to.apiKey) {
    throw new Error(`no CallMeBot API key configured for "${to.id}"`);
  }
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=%2B${to.phone}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(to.apiKey)}`;

  const res = await fetch(url, {
    method: "GET",
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
  const body = await res.text();
  // CallMeBot answers 200 with an HTML error page when the key is wrong,
  // so the status code alone is not proof of delivery.
  if (!res.ok || /error|APIKey|not authorized/i.test(body.slice(0, 400))) {
    throw new Error(`CallMeBot rejected the send: ${body.slice(0, 200)}`);
  }
}

async function sendViaMeta(to: Recipient, text: string): Promise<void> {
  const token = process.env.WHATSAPP_META_TOKEN ?? "";
  const phoneId = process.env.WHATSAPP_META_PHONE_ID ?? "";
  const template = process.env.WHATSAPP_META_TEMPLATE ?? "";
  const lang = process.env.WHATSAPP_META_TEMPLATE_LANG ?? "en";
  if (!token || !phoneId) throw new Error("WHATSAPP_META_TOKEN / _PHONE_ID missing");

  // A template is required for business-initiated sends outside the 24h
  // customer-service window; plain text works inside it (and for test numbers).
  const payload = template
    ? {
        messaging_product: "whatsapp",
        to: to.phone,
        type: "template",
        template: {
          name: template,
          language: { code: lang },
          components: [{ type: "body", parameters: [{ type: "text", text }] }],
        },
      }
    : {
        messaging_product: "whatsapp",
        to: to.phone,
        type: "text",
        text: { preview_url: false, body: text },
      };

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`Meta Cloud API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}

/** Single send. Resolves to true only when the provider accepted it. */
export async function sendWhatsApp(to: Recipient, text: string): Promise<boolean> {
  const p = provider();
  if (p === "none") return false;
  try {
    if (p === "meta") await sendViaMeta(to, text);
    else await sendViaCallMeBot(to, text);
    console.log(`[whatsapp] sent to ${to.id} (${to.label})`);
    return true;
  } catch (err) {
    console.error(`[whatsapp] send to ${to.id} failed:`, err);
    return false;
  }
}

/* ── Messages ─────────────────────────────────────────────── */

type LeadLike = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

function newLeadMessage(lead: LeadLike, panelUrl: string): string {
  return [
    "🔔 New consultation lead",
    "",
    `👤 ${lead.name}`,
    `📞 ${lead.phone}`,
    `✉️ ${lead.email}`,
    `🧾 ${lead.service}`,
    "",
    `"${lead.message.slice(0, 300)}"`,
    "",
    `Call now: wa.me/${normalisePhone(lead.phone)}`,
    `Assign it: ${panelUrl}`,
  ].join("\n");
}

function assignmentMessage(lead: LeadLike, empLabel: string, panelUrl: string): string {
  return [
    `📋 New lead assigned to you, ${empLabel}`,
    "",
    `👤 ${lead.name}`,
    `📞 ${lead.phone}`,
    `🧾 ${lead.service}`,
    "",
    `Chat: wa.me/${normalisePhone(lead.phone)}`,
    `Your tasks: ${panelUrl}`,
  ].join("\n");
}

function siteUrl(path: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  ).replace(/\/$/, "");
  return base ? `${base}${path}` : `companyavenueadvisory.com${path}`;
}

/** Fire-and-forget alert to the boss (and optionally the team). */
export async function notifyNewLead(lead: LeadLike): Promise<void> {
  const recipients = leadAlertRecipients();
  if (recipients.length === 0) {
    console.warn("[whatsapp] no recipients configured — skipping new-lead alert");
    return;
  }
  const text = newLeadMessage(lead, siteUrl("/admin/leads"));
  await Promise.allSettled(recipients.map((r) => sendWhatsApp(r, text)));
}

/** Fire-and-forget ping to the employee a lead was just handed to. */
export async function notifyAssignment(
  lead: LeadLike,
  employeeId: string,
  employeeName: string
): Promise<void> {
  const to = employeeRecipient(employeeId);
  if (!to) return; // employee has no WhatsApp number configured — that's fine
  await sendWhatsApp(to, assignmentMessage(lead, employeeName, siteUrl("/admin/my-leads")));
}
