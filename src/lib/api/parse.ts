import type { NextRequest } from 'next/server';
import type { z, ZodTypeAny } from 'zod';
import { Errors } from './errors';

export async function parseBody<S extends ZodTypeAny>(
  req: NextRequest,
  schema: S,
): Promise<z.output<S>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw Errors.badRequest('Request body must be valid JSON');
  }
  return schema.parse(raw);
}

export function parseQuery<S extends ZodTypeAny>(req: NextRequest, schema: S): z.output<S> {
  return schema.parse(Object.fromEntries(req.nextUrl.searchParams));
}

export function parseParams<S extends ZodTypeAny>(params: unknown, schema: S): z.output<S> {
  return schema.parse(params);
}
