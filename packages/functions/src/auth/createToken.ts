import { ApiHandler, useQueryParams, useHeader } from 'sst/node/api';
import { createAPIResponse } from '@core/utils';
import dayjs from 'dayjs';
import {
  deleteRefreshTokensQuery,
  getRefreshTokenQuery,
  verifyAccessTokenJWT,
  signAccessTokenJWT,
  insertRefreshTokenQuery,
  updateRefreshTokenQuery,
  getSession,
  isRefreshTokenExpired,
} from '@core/auth';
import { z } from 'zod';
import generateRandomToken from '@core/utils/generateRandomToken';

const requestBodySchema = z.object({
  refresh_token: z.string().trim(),
});

export const handler = ApiHandler(async (event) => {
  const params = useQueryParams();
  const authorizationValue = useHeader('authorization');
  if (!authorizationValue) {
    return createAPIResponse({
      error: true,
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
  const session = getSession({ authorizationValue });
  let jwtPayload = null;
  let refreshToken;

  /* Check if mandatory params were passed */
  try {
    const parsed = requestBodySchema.parse(params);
    refreshToken = parsed.refresh_token;
  } catch (e) {
    return createAPIResponse({
      error: true,
      message: 'Pass in the necessary tokens',
      statusCode: 400,
    });
  }

  /* Check if access token passed was valid but is expired */
  if (session.isAuthorized) {
    return createAPIResponse({
      error: true,
      message: 'Access token is valid, not issuing a new one',
    });
  }

  if (session.error !== 'TokenExpiredError') {
    return createAPIResponse({
      error: true,
      message: 'Pass in a valid access token',
    });
  }

  jwtPayload = verifyAccessTokenJWT({
    token: String(session.token),
    options: {
      ignoreExpiration: true,
    },
  });

  const [refreshTokenRow] = await getRefreshTokenQuery({
    refreshToken,
    userId: String(jwtPayload.sub),
  });
  if (!refreshTokenRow) {
    return createAPIResponse({
      error: true,
      message: 'Not a valid refresh token',
    });
  }

  if (isRefreshTokenExpired({ expiryTime: refreshTokenRow.expireAt })) {
    /* The passed refresh token is compromised or a really long time has passed,
    regardless Remove all tokens for this user */
    await deleteRefreshTokensQuery({ userId: String(jwtPayload.sub) });

    return createAPIResponse({
      error: true,
      message: 'Refresh token is expired, destroyed all sessions of this user.',
      statusCode: 401,
    });
  }

  /* If the program reached till here, return with a new access and refresh token */

  try {
    const newRefreshToken = generateRandomToken();
    const newAccessToken = signAccessTokenJWT({
      userId: String(jwtPayload.sub),
      email: jwtPayload.email,
    });
    /* Expire the previous token */
    await updateRefreshTokenQuery({
      tokenId: String(refreshTokenRow.id),
      updates: {
        expireAt: new Date(
          dayjs().utc().subtract(1, 'second').format('DD/MM/YYYY HH:mm:ss'),
        ),
      },
    });
    /* Insert the new token */
    await insertRefreshTokenQuery({
      userId: String(jwtPayload.sub),
      refreshToken: newRefreshToken,
    });
    return createAPIResponse({
      error: false,
      message: 'Tokens were generated successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (e: any) {
    console.log(e);
    return createAPIResponse({
      error: true,
      message: String(e),
    });
  }
});
