import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Reuse the pool across hot reloads in development.
const globalForDb = globalThis as unknown as { pgPool?: Pool };

const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    // Managed Postgres (Supabase, Neon) usually needs SSL: set PGSSL=true
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pgPool = pool;

export const db = drizzle(pool, { schema });
export { schema };
