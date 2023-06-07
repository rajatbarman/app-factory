import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { OTP_EXPIRY_IN_MINUTES } from '../constants';

dayjs.extend(utc);

export default function isOTPExpired({
  otpCreationDate,
}: {
  otpCreationDate: Date | null;
}) {
  // Compare dates with utc timezon as a common base
  let _otpCreationDate = dayjs(otpCreationDate).utc(true);
  let currentDate = dayjs().utc();

  if (currentDate.diff(_otpCreationDate, 'minute') > OTP_EXPIRY_IN_MINUTES) {
    return true;
  }

  return false;
}
