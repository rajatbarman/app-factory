import { db, dbSchema } from '../db/connection';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TOKEN_TYPES } from '../constants';

dayjs.extend(utc);

export default async function insertRefreshTokenQuery({
  userId,
  refreshToken,
}: {
  userId: string;
  refreshToken: string;
}) {
  return db.insert(dbSchema.tokens).values({
    userId: Number(userId),
    token: refreshToken,
    expireAt: new Date(
      dayjs().utc().add(3, 'years').format('DD/MM/YYYY HH:mm:ss'),
    ),
    type: String(TOKEN_TYPES.REFRESH_TOKEN),
  });
}
