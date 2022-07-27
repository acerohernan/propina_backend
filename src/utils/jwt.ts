import jwt from 'jsonwebtoken';
import CONFIG from '../../config';

const { privateKey, publicKey } = CONFIG;

export function signJwt(
  object: Record<string, any>,
  options?: jwt.SignOptions | undefined
) {
  const signinKey = Buffer.from(privateKey ?? '', 'base64').toString('ascii');

  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(token: string) {
  const decodeKey = Buffer.from(publicKey ?? '', 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, decodeKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
