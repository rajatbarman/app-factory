import crypto from 'crypto';

export default function generateRandomToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}
