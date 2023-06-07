import { ApiHandler, useQueryParams } from "sst/node/api";
import { sendOTPEmail } from "@core/auth";
import { createAPIResponse } from "@core/utils";
import { isOTPExpired, insertOTPQuery, getOTPQuery } from "@core/auth";
import { z } from "zod";

const requestBodySchema = z.object({
  email: z.string().email().trim(),
});

export const handler = ApiHandler(async (event) => {
  const params = useQueryParams();
  let resp = null;

  try {
    let otp;
    const { email } = requestBodySchema.parse(params);
    /* Check if this email already had an OTP created and it's not expired */
    const [otpRow] = await getOTPQuery({ email });

    /* If no otp present in db or if the OTP is expired, then create a new OTP */
    if (
      !otpRow ||
      (otpRow && isOTPExpired({ otpCreationDate: otpRow.createdAt }))
    ) {
      otp = await insertOTPQuery({ email });
    } else {
      otp = otpRow.otp;
    }
    await sendOTPEmail({ email, otp });
    resp = {
      error: false,
      message: "Sent successfully",
    };
  } catch (e) {
    console.log(e);
    resp = {
      error: true,
      message: String(e),
    };
  }
  return createAPIResponse(resp);
});
