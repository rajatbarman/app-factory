import { db, dbSchema } from '../db';
import { eq, and } from 'drizzle-orm';
import { TOKEN_TYPES } from '../constants';

export default async function deleteRefreshTokensQuery({
  userId,
}: {
  userId: string;
}) {
  return db
    .delete(dbSchema.tokens)
    .where(
      and(
        eq(dbSchema.tokens.userId, Number(userId)),
        eq(dbSchema.tokens.type, String(TOKEN_TYPES.REFRESH_TOKEN)),
      ),
    );
}
