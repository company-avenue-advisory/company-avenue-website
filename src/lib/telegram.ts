/* ─────────────────────────────────────────────────────────────
   Telegram notifications — fires the instant a lead lands, so the
   team knows before the lead goes cold.

   Chosen over WhatsApp because it is genuinely free, official, has
   no template approval, no business verification, and no per-message
   cost. Setup is: create a bot with @BotFather, send it /start, done.

   Config:
     TELEGRAM_BOT_TOKEN        the token @BotFather gives you
     TELEGRAM_BOSS_CHAT_ID     numeric chat id of the boss  (required)
     TELEGRAM_EMP1_CHAT_ID     optional — pinged on assignment
     TELEGRAM_EMP2_CHAT_ID     optional
     TELEGRAM_NOTIFY_EMPLOYEES "true" to alert employees on every lead

   Run `npm run telegram:chat-id` to discover a chat id.

   Every send is best-effort: failures are logged and swallowed so a
   Telegram outage can never lose a lead or break the admin console.
───────────────────────────────────────────────────────────── */

import { normalisePhone } from "@/lib/leads";

const SEND_TIMEOUT_MS = 8000;

export type Recipient = {
  id: string;
  label: string;
  chatId: string;
};

function token(): string {
  return process.env.TELEGRAM_BOT_TOKEN ?? "";
}

function recipient(id: string, label: string, envVar: string): Recipient | null {
  const chatId = (process.env[envVar] ?? "").trim();
  return chatId ? { id, label, chatId } : null;
}

/** The employee accounts' Telegram identities, for assignment pings. */
export function employeeRecipient(userId: string): Recipient | null {
  if (userId === "emp1") return recipient("emp1", "Employee 1", "TELEGRAM_EMP1_CHAT_ID");
  if (userId === "emp2") return recipient("emp2", "Employee 2", "TELEGRAM_EMP2_CHAT_ID");
  return null;
}

/** Who gets pinged when a brand-new lead arrives. */
export function leadAlertRecipients(): Recipient[] {
  const list = [recipient("boss", "Boss", "TELEGRAM_BOSS_CHAT_ID")];
  if (process.env.TELEGRAM_NOTIFY_EMPLOYEES === "true") {
    list.push(employeeRecipient("emp1"), employeeRecipient("emp2"));
  }
  return list.filter((r): r is Recipient => r !== null);
}

export function isTelegramConfigured(): boolean {
  return !!token() && leadAlertRecipients().length > 0;
}

/* ── Sending ──────────────────────────────────────────────── */

/** Telegram's HTML parse mode needs these three escaped, or a lead whose
 *  message contains "<" silently fails the whole send with a 400. */
function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type Button = { text: string; url: string };

async function send(to: Recipient, html: string, buttons: Button[] = []): Promise<boolean> {
  const bot = token();
  if (!bot) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN not set — skipping alert");
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: to.chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        ...(buttons.length
          ? { reply_markup: { inline_keyboard: [buttons.map((b) => ({ text: b.text, url: b.url }))] } }
          : {}),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    const body = await res.json().catch(() => null);
    // Telegram answers 200 with { ok: false, description } on logical errors,
    // so the status code alone is not proof of delivery.
    if (!res.ok || !body?.ok) {
      throw new Error(body?.description ?? `HTTP ${res.status}`);
    }
    console.log(`[telegram] sent to ${to.id} (${to.label})`);
    return true;
  } catch (err) {
    console.error(`[telegram] send to ${to.id} failed:`, err);
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

function siteUrl(path: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  ).replace(/\/$/, "");
  return base ? `${base}${path}` : `https://companyavenueadvisory.com${path}`;
}

function contactButtons(lead: LeadLike, consolePath: string): Button[] {
  const buttons: Button[] = [];
  const num = normalisePhone(lead.phone);
  // Telegram inline buttons only accept http(s)/tg links — a tel: URL is
  // rejected outright, so "call" is a wa.me link rather than a dialler.
  if (num) {
    buttons.push({
      text: "💬 Message lead",
      url: `https://wa.me/${num}?text=${encodeURIComponent(
        `Hello ${lead.name}, this is Company Avenue Advisory regarding your enquiry about ${lead.service}.`
      )}`,
    });
  }
  buttons.push({ text: "📋 Open console", url: siteUrl(consolePath) });
  return buttons;
}

/** Fire-and-forget alert to the boss (and optionally the team). */
export async function notifyNewLead(lead: LeadLike): Promise<void> {
  const recipients = leadAlertRecipients();
  if (recipients.length === 0) {
    console.warn("[telegram] no recipients configured — skipping new-lead alert");
    return;
  }

  const html = [
    "🔔 <b>New consultation lead</b>",
    "",
    `👤 <b>${esc(lead.name)}</b>`,
    `📞 <code>${esc(lead.phone)}</code>`,
    `✉️ ${esc(lead.email)}`,
    `🧾 ${esc(lead.service)}`,
    "",
    `<i>${esc(lead.message.slice(0, 600))}</i>`,
  ].join("\n");

  const buttons = contactButtons(lead, "/admin/leads");
  await Promise.allSettled(recipients.map((r) => send(r, html, buttons)));
}

/** Fire-and-forget ping to the employee a lead was just handed to. */
export async function notifyAssignment(
  lead: LeadLike,
  employeeId: string,
  employeeName: string
): Promise<void> {
  const to = employeeRecipient(employeeId);
  if (!to) return; // employee has no Telegram chat id configured — that's fine

  const html = [
    `📋 <b>New lead assigned to you</b> — ${esc(employeeName)}`,
    "",
    `👤 <b>${esc(lead.name)}</b>`,
    `📞 <code>${esc(lead.phone)}</code>`,
    `🧾 ${esc(lead.service)}`,
  ].join("\n");

  await send(to, html, contactButtons(lead, "/admin/my-leads"));
}
