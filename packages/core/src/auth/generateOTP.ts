import otpGenerator from 'otp-generator';

export default function generateOTP() {
  return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
}
