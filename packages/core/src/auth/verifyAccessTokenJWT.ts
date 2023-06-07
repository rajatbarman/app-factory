import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";

export default function verifyAccessTokenJWT({
  token,
  options,
} : {
  token: string;
  options?: VerifyOptions;
}) {
  return jwt.verify(
    token,
    String(process.env.JWT_SIGNATURE),
    options
  ) as JwtPayload
}
