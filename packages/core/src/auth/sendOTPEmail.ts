import sendEmail from '../emails/sendEmail';
import { OTP_EMAIL_SUBJECT } from '../constants';
import { renderOtpEmail } from '@frontend-emails/emails/otp-email';

/* TODO: Figure out a way to not have react and all bundled from frontend-emails */

export default async function sendOTPEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  return sendEmail({
    email,
    subject: OTP_EMAIL_SUBJECT,
    content: renderOtpEmail({ otp: Number(otp) }),
  });
}
