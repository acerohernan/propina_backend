import bcrypt from 'bcrypt';
import CONFIG from '../../config';

const { bcryptSalt } = CONFIG;

export async function hashString(string: string): Promise<string | null> {
  try {
    const salt = await bcrypt.genSalt(Number(bcryptSalt) ?? 10);
    const hash = await bcrypt.hashSync(string, salt);
    return hash;
  } catch (e: any) {
    return null;
  }
}

export async function compareHash(
  candidate: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(candidate, hash).catch(() => false);
}
