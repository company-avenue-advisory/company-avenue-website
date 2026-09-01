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

/**
 * Why a Sandbox call failed, so a route can answer honestly instead of
 * collapsing every failure into one 502.
 *
 *  · "subscription" — our account is expired, suspended or out of credits.
 *    NOT a transient blip and NOT the user's fault: retrying never helps and
 *    the fix is commercial, so it must be loud in the logs.
 *  · "auth"         — key/secret rejected. Also ours to fix, not the user's.
 *  · "upstream"     — GSTN/MCA behind Sandbox timed out or errored. Genuinely
 *    transient; "try again shortly" is honest advice here.
 */
export type SandboxFailure = "subscription" | "auth" | "upstream";

export class SandboxError extends Error {
  constructor(
    readonly kind: SandboxFailure,
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "SandboxError";
  }

  /** True where the fix is on our side — no point telling the user to retry. */
  get isOurProblem() {
    return this.kind === "subscription" || this.kind === "auth";
  }
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
    // Sandbox answers an expired/suspended plan with 401 and a message body —
    // indistinguishable from bad credentials by status alone, so read the body.
    const body = await res.json().catch(() => null);
    const detail = typeof body?.message === "string" ? body.message : "";
    const kind: SandboxFailure = /subscription|expire|credit|quota|plan/i.test(detail)
      ? "subscription"
      : res.status === 401 || res.status === 403
        ? "auth"
        : "upstream";
    throw new SandboxError(
      kind,
      `Sandbox authenticate failed: ${res.status}${detail ? ` — ${detail}` : ""}`,
      res.status
    );
  }

  const data = await res.json();
  const token = data?.data?.access_token as string | undefined;
  if (!token) throw new SandboxError("upstream", "Sandbox authenticate: no access_token in response");

  // Refresh 30 minutes early to be safe.
  cachedToken = { token, expiresAt: Date.now() + 23.5 * 60 * 60 * 1000 };
  return token;
}

export async function sandboxPost<T = unknown>(path: string, body: unknown): Promise<T> {
  if (!isSandboxConfigured()) {
    throw new SandboxError("auth", "SANDBOX_API_KEY / SANDBOX_API_SECRET not configured");
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

  // A gateway failure can answer with HTML, not JSON — parsing it unguarded
  // threw a SyntaxError that masked the real status code.
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = json?.message ?? `Sandbox API error: ${res.status}`;
    const kind: SandboxFailure =
      res.status === 401 || res.status === 403
        ? /subscription|expire|credit|quota|plan/i.test(String(message))
          ? "subscription"
          : "auth"
        : "upstream";
    throw new SandboxError(kind, String(message), res.status);
  }

  return json as T;
}

/**
 * Turn a thrown Sandbox failure into the response a verification route should
 * send. Shared by /api/verify/gst, /company and /pan so all three behave the
 * same way — they previously each returned a bare 502 with a generic message,
 * which read to a user as "your GSTIN is wrong" rather than "our tool is down".
 *
 * 503 for anything unavailable rather than 502: the request never reached
 * GSTN/MCA at all, and 503 is what a monitor should page on.
 */
export function sandboxErrorResponse(err: unknown): { error: string; status: number } {
  if (err instanceof SandboxError) {
    if (err.isOurProblem) {
      // Deliberately does not blame the visitor or ask them to retry — no
      // number of retries fixes an expired subscription.
      return {
        error:
          "Live verification is temporarily unavailable while we renew access to the government data service. Please try again later, or send us the details and we will check them for you.",
        status: 503,
      };
    }
    return {
      error:
        "The government registry is not responding right now (this happens upstream, not on our end). Please try again in a few minutes.",
      status: 503,
    };
  }
  return {
    error: "Could not complete this verification right now. Please try again shortly.",
    status: 502,
  };
}
