import { JWT_ACCESS_TOKEN_EXPIRY } from '../constants';
import jwt from 'jsonwebtoken';

export default function signJWT({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  return jwt.sign(
    {
      sub: Number(userId),
      email,
    },
    String(process.env.JWT_SIGNATURE),
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    },
  );
}
