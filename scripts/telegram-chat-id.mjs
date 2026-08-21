#!/usr/bin/env node
/* Discovers Telegram chat IDs for whoever has messaged your bot.
 *
 *   1. Create a bot with @BotFather, put the token in .env.local
 *   2. Each person sends /start to the bot from their own Telegram
 *   3. npm run telegram:chat-id
 *
 * Prints every chat that has messaged the bot, with the exact env line to
 * paste. Telegram only keeps ~24h of updates, so run this soon after /start.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function env(key) {
  // Read .env.local directly — this runs outside Next, so nothing is loaded.
  if (process.env[key]) return process.env[key];
  try {
    for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || !t.includes("=")) continue;
      const i = t.indexOf("=");
      if (t.slice(0, i).trim() === key) return t.slice(i + 1).trim();
    }
  } catch {
    /* no .env.local — fall through */
  }
  return "";
}

const token = env("TELEGRAM_BOT_TOKEN");
if (!token) {
  console.error("✗ TELEGRAM_BOT_TOKEN is not set in .env.local");
  console.error("  Get one from @BotFather on Telegram, then add:");
  console.error("  TELEGRAM_BOT_TOKEN=123456:ABC-your-token-here");
  process.exit(1);
}

const api = `https://api.telegram.org/bot${token}`;

const me = await fetch(`${api}/getMe`).then((r) => r.json());
if (!me.ok) {
  console.error(`✗ Token rejected by Telegram: ${me.description}`);
  process.exit(1);
}
console.log(`✓ Bot: @${me.result.username} (${me.result.first_name})\n`);

const updates = await fetch(`${api}/getUpdates`).then((r) => r.json());
if (!updates.ok) {
  console.error(`✗ getUpdates failed: ${updates.description}`);
  process.exit(1);
}

const chats = new Map();
for (const u of updates.result) {
  const chat = u.message?.chat ?? u.channel_post?.chat;
  if (chat) chats.set(chat.id, chat);
}

if (chats.size === 0) {
  console.log("No messages yet. On Telegram, search for the bot username above,");
  console.log("open it, press START (or send any message), then re-run this.");
  process.exit(0);
}

console.log(`Found ${chats.size} chat${chats.size === 1 ? "" : "s"}:\n`);
for (const chat of chats.values()) {
  const who =
    chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(" ") ?? "(unknown)";
  console.log(`  ${who}${chat.username ? ` (@${chat.username})` : ""}`);
  console.log(`  chat id: ${chat.id}`);
  console.log(`  → TELEGRAM_BOSS_CHAT_ID=${chat.id}\n`);
}
console.log("Paste the right line into .env.local (or use EMP1/EMP2 for staff).");
