import { ApiHandler } from 'sst/node/api';
import { db } from '@core/db/index';
import { users } from '@core/db/schema';
import { createAPIResponse } from '@core/utils';

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
