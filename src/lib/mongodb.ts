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

type Cache = { client: MongoClient; promise: Promise<MongoClient> };
type GlobalWithMongo = typeof globalThis & { _mongo?: Cache };

// Cache the client promise across invocations / hot reloads.
let cached = (global as GlobalWithMongo)._mongo;

function clearCache(client: MongoClient) {
  // Only clear if nothing has replaced it meanwhile, so a slow failing connect
  // can't wipe out a newer healthy one.
  if (cached?.client === client) {
    cached = undefined;
    (global as GlobalWithMongo)._mongo = undefined;
  }
  void client.close().catch(() => {}); // don't leak the dead socket
}

function connect(): Cache {
  const client = new MongoClient(MONGODB_URI, {
    // Fail fast instead of hanging a request for the 30s defaults. Atlas M0
    // occasionally stalls the TLS handshake; a quick failure the caller can
    // retry beats a page that spins for half a minute.
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    retryReads: true,
    retryWrites: true,
  });

  const promise = client.connect().catch((err) => {
    // A rejected promise must never stay in the cache: every later request
    // would await this same rejection and 502 forever, even after the network
    // recovers, until the process restarts.
    clearCache(client);
    throw err;
  });

  const entry: Cache = { client, promise };
  cached = entry;
  (global as GlobalWithMongo)._mongo = entry;
  return entry;
}

export async function getDb(): Promise<Db> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  const entry = cached ?? connect();

  try {
    await entry.promise;
    return entry.client.db(MONGODB_DB);
  } catch (err) {
    // One retry with a fresh client — Atlas free-tier handshake timeouts are
    // tagged retryable and usually succeed immediately on a second attempt.
    console.warn("[mongodb] connect failed, retrying once:", err);
    const retry = connect();
    await retry.promise;
    return retry.client.db(MONGODB_DB);
  }
}
