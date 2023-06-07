import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const pgConn = postgres(String(process.env.DATABASE_URL), {
  ssl: true,
});

// create the connection
const db = drizzle(pgConn);

try {
  await migrate(db, { migrationsFolder: 'migrations' });
  console.log('Success');
} catch (e) {
  console.log('Error:', e);
}
