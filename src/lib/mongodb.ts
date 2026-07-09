/* ─────────────────────────────────────────────────────────────
   Server-only MongoDB client. Uses a cached connection so that
   Vercel serverless functions (and Next.js hot-reload in dev) don't
   open a new connection on every request. Never import this from a
   "use client" file — the connection string must stay server-side.
───────────────────────────────────────────────────────────── */
import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const MONGODB_DB = process.env.MONGODB_DB ?? "avenue-advisory";

export function isMongoConfigured() {
  return !!MONGODB_URI;
}

// Cache the client promise across invocations / hot reloads.
let cached = (global as typeof globalThis & {
  _mongo?: { client: MongoClient; promise: Promise<MongoClient> };
})._mongo;

export async function getDb(): Promise<Db> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!cached) {
    const client = new MongoClient(MONGODB_URI);
    cached = { client, promise: client.connect() };
    (global as typeof globalThis & { _mongo?: typeof cached })._mongo = cached;
  }

  await cached.promise;
  return cached.client.db(MONGODB_DB);
}
