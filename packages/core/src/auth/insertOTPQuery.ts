import { db, dbSchema } from '../db/connection';
import generateOTP from './generateOTP';

export default async function insertOTPQuery({ email }: { email: string }) {
  const otp = generateOTP();

  await db.insert(dbSchema.usersOTP).values({ email, otp });

  return otp;
}
