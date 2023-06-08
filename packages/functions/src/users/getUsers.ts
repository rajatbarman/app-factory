import { ApiHandler } from 'sst/node/api';
import { db } from '@core/db/connection';
import { users } from '@core/db/schema';
import createAPIResponse from '@core/utils/createAPIResponse';

export const handler = ApiHandler(async (event) => {
  const allUsers = await db.select().from(users);
  return createAPIResponse({
    error: false,
    message: 'Success',
    data: {
      users: allUsers,
    },
  });
});
