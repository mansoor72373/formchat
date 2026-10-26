import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/config/constants';
import { verifySession } from '@/lib/auth/token';

export async function middleware(req: NextRequest) {
  const userId = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (!userId && !isAuthPage) return NextResponse.redirect(new URL('/login', req.url));
  if (userId && isAuthPage) return NextResponse.redirect(new URL('/dashboard', req.url));
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/login', '/register'] };
