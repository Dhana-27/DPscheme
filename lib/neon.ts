import { neon } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';

// For serverless functions (e.g., API routes, Server Actions)
export const sql = neon(process.env.NEON_DATABASE_URL!);

// For long-lived connections (e.g., local development, scripts)
// This might not be strictly necessary for a Vercel deployment using serverless functions,
// but it's good to have for local testing or if you switch to a non-serverless environment.
let pool: Pool | null = null;
export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.NEON_DATABASE_URL!,
    });
  }
  return pool;
}
