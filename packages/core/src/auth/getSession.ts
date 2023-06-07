import { z } from "zod";
import { verifyAccessTokenJWT } from '@core/auth'

const requestBodySchema = z.object({
  token: z.string().trim(),
});

export default function getSession({ authorizationValue } : {authorizationValue: string}) {
  const [unusedStr, _token] = authorizationValue.split('Bearer ')
  let ret = null;
  let token = null;

  try {
    token = requestBodySchema.parse({ token: _token }).token;
    const data = verifyAccessTokenJWT({ token: String(token) });
    ret = {
      isAuthorized: true,
      token,
      data: {
        userId: data.sub,
        email: data.email
      }
    }
  } catch (e: any) {
    console.log(e);
    ret = {
      error: e.name,
      token,
      isAuthorized: false,
      message: String(e),
    };
  }

  return ret;
}
