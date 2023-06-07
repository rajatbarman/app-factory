import { db, dbSchema } from '../db';
import { eq, and, desc } from 'drizzle-orm';
import { TOKEN_TYPES } from '../constants';

export default async function getRefreshTokenQuery({
  userId,
  refreshToken,
}: {
  userId: string;
  refreshToken: string;
}) {
  return db
    .select()
    .from(dbSchema.tokens)
    .where(
      and(
        eq(dbSchema.tokens.userId, Number(userId)),
        eq(dbSchema.tokens.token, refreshToken),
        eq(dbSchema.tokens.type, String(TOKEN_TYPES.REFRESH_TOKEN)),
      ),
    )
    .orderBy(desc(dbSchema.tokens.createdAt))
    .limit(1);
}
