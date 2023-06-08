import { db, dbSchema } from '../db/connection';
import { eq, desc } from 'drizzle-orm';

export default async function getOTPQuery({ email }: { email: string }) {
  return db
    .select()
    .from(dbSchema.usersOTP)
    .where(eq(dbSchema.usersOTP.email, email))
    .orderBy(desc(dbSchema.usersOTP.createdAt))
    .limit(1);
}
