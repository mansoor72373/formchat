import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import type { ApiErrorBody, ApiSuccess } from '@/types/api';
import { AppError } from './errors';

export function ok<T, M = undefined>(data: T, meta?: M, status = 200) {
  const body: ApiSuccess<T, M> = { success: true, data, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status });
}

export const created = <T>(data: T) => ok(data, undefined, 201);
export const noContent = () => new NextResponse(null, { status: 204 });

type Detail = { path: string; message: string };

function fail(status: number, code: string, message: string, details?: Detail[]) {
  const body: ApiErrorBody = { success: false, error: { code, message, details } };
  return NextResponse.json(body, { status });
}

/** Next.js signals "this route is dynamic" by throwing; that must never become a 500 response. */
const isNextControlFlow = (err: unknown) =>
  typeof err === 'object' &&
  err !== null &&
  'digest' in err &&
  typeof (err as { digest: unknown }).digest === 'string' &&
  ['DYNAMIC_SERVER_USAGE', 'NEXT_REDIRECT', 'NEXT_NOT_FOUND'].some((d) =>
    (err as { digest: string }).digest.startsWith(d),
  );

export function errorResponse(err: unknown) {
  if (isNextControlFlow(err)) throw err;
  if (err instanceof ZodError) {
    const details = err.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
    return fail(422, 'VALIDATION_ERROR', 'Validation failed', details);
  }
  if (err instanceof AppError) return fail(err.status, err.code, err.message, err.details);

  console.error('[api] unhandled error', err);
  return fail(500, 'INTERNAL_ERROR', 'Something went wrong on our side.');
}
