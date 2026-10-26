import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from '@/config/constants';
import { Errors } from '@/lib/api/errors';
import { getUserById } from '@/services/auth.service';
import { signSession, verifySession } from './token';

export async function getSessionUserId() {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}

export async function startSession(userId: string) {
  cookies().set(SESSION_COOKIE, await signSession(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function endSession() {
  cookies().delete(SESSION_COOKIE);
}

/** For API routes: throws 401. */
export async function requireUserId() {
  const id = await getSessionUserId();
  if (!id) throw Errors.unauthorized();
  return id;
}

/** For server components/layouts: redirects to /login. */
export async function requirePageUser() {
  const id = await getSessionUserId();
  const user = id ? await getUserById(id) : null;
  if (!user) redirect('/login');
  return user;
}
