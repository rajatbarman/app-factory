import { ApiHandler, useQueryParams } from 'sst/node/api';
import createAPIResponse from '@core/utils/createAPIResponse';
import generateRandomToken from '@core/utils/generateRandomToken';
import getOTPQuery from '@core/auth/getOTPQuery';
import isOTPExpired from '@core/auth/isOTPExpired';
import signAccessTokenJWT from '@core/auth/signAccessTokenJWT';
import insertUserQuery from '@core/users/insertUserQuery';
import getUserQuery from '@core/users/getUserQuery';
import { z } from 'zod';
import insertRefreshTokenQuery from '@core/auth/insertRefreshTokenQuery';

const requestBodySchema = z.object({
  email: z.string().email().trim(),
  otp: z.string().trim().length(6),
});

export const handler = ApiHandler(async (event) => {
  const params = useQueryParams();
  let resp = null;

  try {
    const { email, otp } = requestBodySchema.parse(params);
    const [otpRow] = await getOTPQuery({ email });
    if (
      otpRow &&
      otpRow.otp === otp &&
      !isOTPExpired({ otpCreationDate: otpRow.createdAt })
    ) {
      let userId;
      const [existingUser] = await getUserQuery({ email });
      if (!existingUser.id) {
        const [returned] = await insertUserQuery({ email });
        userId = returned.id;
      } else {
        userId = existingUser.id;
      }

      const refreshToken = generateRandomToken();
      const accessToken = signAccessTokenJWT({
        userId: String(userId),
        email,
      });
      await insertRefreshTokenQuery({
        userId: String(userId),
        refreshToken,
      });
      resp = {
        error: false,
        message: 'Verification successful',
        data: {
          accessToken,
          refreshToken,
        },
      };
    } else {
      resp = {
        error: true,
        message: 'Invalid OTP, try logging in again',
      };
    }
  } catch (e) {
    console.log(e);
    resp = {
      error: true,
      message: String(e),
    };
  }

  return createAPIResponse(resp);
});
