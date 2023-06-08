import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// create the connection
export const db = drizzle(pool);
export * as dbSchema from './schema';
