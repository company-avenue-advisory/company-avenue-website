/* ─────────────────────────────────────────────────────────────
   Role-based auth for the admin console.

   Replaces the old HTTP Basic Auth. Three accounts are defined
   entirely by env vars — one admin (sees every lead, assigns work)
   and two employees (see only what the admin assigned to them).

   The session is a signed cookie: base64url(payload).base64url(hmac).
   Signing uses Web Crypto only, so this file is safe to import from
   BOTH the Edge middleware and Node route handlers. Never import
   anything Node-only (mongodb, fs, …) here.
───────────────────────────────────────────────────────────── */

export type Role = "admin" | "employee";

/** Stable internal id — this is what gets stored on a lead as `assignedTo`.
 *  Usernames/display names can change in env without orphaning leads. */
export type UserId = "admin" | "emp1" | "emp2";

export type AppUser = {
  id: UserId;
  username: string;
  role: Role;
  name: string;
};

export type Session = AppUser & { exp: number };

export const SESSION_COOKIE = "ca_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

/* ── Account registry ─────────────────────────────────────── */

type Account = AppUser & { password: string };

function accounts(): Account[] {
  const list: Account[] = [
    {
      id: "admin",
      username: process.env.ADMIN_USER ?? "",
      password: process.env.ADMIN_PASSWORD ?? "",
      role: "admin",
      name: process.env.ADMIN_NAME ?? "Admin",
    },
    {
      id: "emp1",
      username: process.env.EMP1_USER ?? "emp1",
      password: process.env.EMP1_PASSWORD ?? "",
      role: "employee",
      name: process.env.EMP1_NAME ?? "Employee 1",
    },
    {
      id: "emp2",
      username: process.env.EMP2_USER ?? "emp2",
      password: process.env.EMP2_PASSWORD ?? "",
      role: "employee",
      name: process.env.EMP2_NAME ?? "Employee 2",
    },
  ];
  // An account with no password configured simply does not exist.
  return list.filter((a) => a.username && a.password);
}

/** The employees an admin can assign leads to (safe to send to the client —
 *  no passwords). */
export function listEmployees(): AppUser[] {
  return accounts()
    .filter((a) => a.role === "employee")
    .map(({ id, username, role, name }) => ({ id, username, role, name }));
}

export function employeeName(id: string | null | undefined): string {
  if (!id) return "Unassigned";
  return listEmployees().find((e) => e.id === id)?.name ?? id;
}

export function isAuthConfigured(): boolean {
  return accounts().some((a) => a.role === "admin");
}

/* ── Signing ──────────────────────────────────────────────── */

/** Derived from the configured passwords when ADMIN_SESSION_SECRET is unset,
 *  so the console works with zero extra config and rotating a password
 *  invalidates every existing session. */
function secret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  return [
    "ca-avenue-session-v1",
    process.env.ADMIN_USER ?? "",
    process.env.ADMIN_PASSWORD ?? "",
    process.env.EMP1_PASSWORD ?? "",
    process.env.EMP2_PASSWORD ?? "",
  ].join("|");
}

const enc = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64urlEncode(new Uint8Array(sig));
}

/** Length-independent comparison — avoids leaking the signature byte by byte. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ── Login / session ──────────────────────────────────────── */

/** Verifies credentials. Returns the user, or null on any mismatch. */
export function verifyCredentials(username: string, password: string): AppUser | null {
  // Compare against every account (not a short-circuit lookup) so a wrong
  // username and a wrong password cost the same.
  let found: Account | null = null;
  for (const a of accounts()) {
    if (safeEqual(a.username, username) && safeEqual(a.password, password)) {
      found = a;
    }
  }
  if (!found) return null;
  const { id, username: u, role, name } = found;
  return { id, username: u, role, name };
}

export async function createSessionToken(user: AppUser): Promise<string> {
  const payload: Session = { ...user, exp: Date.now() + SESSION_TTL_MS };
  const body = b64urlEncode(enc.encode(JSON.stringify(payload)));
  return `${body}.${await sign(body)}`;
}

/** Verifies signature + expiry. Returns null for anything it does not trust. */
export async function readSessionToken(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(await sign(body), sig)) return null;

  try {
    const session = JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as Session;
    if (!session?.exp || session.exp < Date.now()) return null;
    if (session.role !== "admin" && session.role !== "employee") return null;
    return session;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};

/** Where a user lands after login, and where they get bounced to if they
 *  wander into the other role's pages. */
export function homeFor(role: Role): string {
  return role === "admin" ? "/admin/leads" : "/admin/my-leads";
}
