import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __barelyAdultingPostgresPool?: Pool;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  if (!globalForDb.__barelyAdultingPostgresPool) {
    globalForDb.__barelyAdultingPostgresPool = new Pool({
      connectionString: databaseUrl,
    });
  }

  return globalForDb.__barelyAdultingPostgresPool;
}

let cachedDb: NodePgDatabase | null = null;

function getDb(): NodePgDatabase {
  if (!cachedDb) {
    cachedDb = drizzle(getPool());
  }

  return cachedDb;
}

export const db: NodePgDatabase = new Proxy({} as NodePgDatabase, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    return typeof value === "function" ? value.bind(realDb) : value;
  },
});
