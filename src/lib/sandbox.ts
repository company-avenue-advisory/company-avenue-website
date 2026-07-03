/* ─────────────────────────────────────────────────────────────
   Server-only client for Sandbox (sandbox.co.in / Quicko) — powers
   GST, PAN and MCA verification tools. Never import this from a
   "use client" file; the API key/secret must stay server-side.
───────────────────────────────────────────────────────────── */
const SANDBOX_API_KEY = process.env.SANDBOX_API_KEY ?? "";
const SANDBOX_API_SECRET = process.env.SANDBOX_API_SECRET ?? "";
const SANDBOX_BASE_URL = process.env.SANDBOX_BASE_URL ?? "https://api.sandbox.co.in";

export function isSandboxConfigured() {
  return !!(SANDBOX_API_KEY && SANDBOX_API_SECRET);
}

// The access token is valid for 24h; cache it in memory so we don't
// re-authenticate on every request within the same server instance.
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const res = await fetch(`${SANDBOX_BASE_URL}/authenticate`, {
    method: "POST",
    headers: {
      "x-api-key": SANDBOX_API_KEY,
      "x-api-secret": SANDBOX_API_SECRET,
      "x-api-version": "1.0",
    },
  });

  if (!res.ok) {
    throw new Error(`Sandbox authenticate failed: ${res.status}`);
  }

  const data = await res.json();
  const token = data?.data?.access_token as string | undefined;
  if (!token) throw new Error("Sandbox authenticate: no access_token in response");

  // Refresh 30 minutes early to be safe.
  cachedToken = { token, expiresAt: Date.now() + 23.5 * 60 * 60 * 1000 };
  return token;
}

export async function sandboxPost<T = unknown>(path: string, body: unknown): Promise<T> {
  if (!isSandboxConfigured()) {
    throw new Error("SANDBOX_API_KEY / SANDBOX_API_SECRET not configured");
  }

  const token = await getAccessToken();

  const res = await fetch(`${SANDBOX_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": token, // Sandbox tokens are NOT bearer tokens — no "Bearer " prefix.
      "x-api-key": SANDBOX_API_KEY,
      "x-api-version": "1.0",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    const message = json?.message ?? `Sandbox API error: ${res.status}`;
    throw new Error(message);
  }

  return json;
}
