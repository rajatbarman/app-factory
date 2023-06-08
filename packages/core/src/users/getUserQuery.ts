import { db, dbSchema } from '@core/db/connection';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const paramsSchema = z.object({
  email: z.string().email().optional(),
  id: z.number().optional(),
});

type Params = z.infer<typeof paramsSchema>;

export default async function getUserQuery({ email = '', id = 0 }: Params) {
  if (!email && !id) {
    throw 'Pass either user email or a user id';
  }
  paramsSchema.parse({ email, id });
  const whereExp = id
    ? eq(dbSchema.users.id, id)
    : eq(dbSchema.users.email, email);
  return db
    .select({ id: dbSchema.users.id, email: dbSchema.users.email })
    .from(dbSchema.users)
    .where(whereExp)
    .limit(1);
}
