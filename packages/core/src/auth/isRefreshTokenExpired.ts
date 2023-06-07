import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function isRefreshTokenExpired({expiryTime} : {expiryTime:Date}) {
  // Compare dates with utc timezon as a common base
  let _expiryTime = dayjs(expiryTime).utc(true)
  let currentDate = dayjs().utc()

  if (_expiryTime.diff(currentDate, 'seconds') <= 1) {
    return true;
  }

  return false;
}
