import { ApiHandler, useBody, useJsonBody } from 'sst/node/api';
import { db } from '@core/db';
import { users } from '@core/db/schema';
import { createAPIResponse } from '@core/utils';

export const handler = ApiHandler(async (event) => {
  const body = useJsonBody();
  const user = {
    fullName: body.name || null,
    email: body.email || null,
  };
  let resp = null;
  try {
    const [returned] = await db
      .insert(users)
      .values(user)
      .returning({ id: users.id });
    resp = {
      error: false,
      message: 'User inserted successfully',
      data: {
        userId: Number(returned.id),
      },
    };
  } catch (e: any) {
    resp = {
      error: true,
      message: String(e.message),
    };
    console.log('Error while inserting this user', e);
  }

  return createAPIResponse(resp);
});