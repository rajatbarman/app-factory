import { ApiHandler, useQueryParams } from "sst/node/api";
import { createAPIResponse, generateRandomToken } from "@core/utils";
import {
  getOTPQuery,
  isOTPExpired,
  signAccessTokenJWT,
} from "@core/auth";
import { insertUserQuery, getUserQuery } from "@core/users";
import { z } from "zod";
import { insertRefreshTokenQuery } from '@core/auth';

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
        userId = (await insertUserQuery({ email })).insertId;
      } else {
        userId = existingUser.id;
      }

      const refreshToken = generateRandomToken();
      const accessToken = signAccessTokenJWT({
        userId,
        email
      });
      await insertRefreshTokenQuery({
        userId,
        refreshToken,
      });
      resp = {
        error: false,
        message: "Verification successful",
        data: {
          accessToken,
          refreshToken
        },
      };
    } else {
      resp = {
        error: true,
        message: "Invalid OTP, try logging in again",
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
