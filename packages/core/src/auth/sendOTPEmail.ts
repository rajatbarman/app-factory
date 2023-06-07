import { sendEmail } from '../emails';
import { OTP_EMAIL_SUBJECT } from '../constants';
import { renderOtpEmail } from '@frontend-emails/emails/otp-email';

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
