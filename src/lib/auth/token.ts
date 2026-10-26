import { jwtVerify, SignJWT } from 'jose';
import { SESSION_MAX_AGE_SECONDS } from '@/config/constants';

// Edge-safe: also used by middleware.
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? '');

export async function signSession(userId: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secret());
}

export async function verifySession(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
