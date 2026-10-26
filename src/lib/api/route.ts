import type { NextRequest } from 'next/server';
import { requireUserId } from '@/lib/auth/session';
import { errorResponse } from './response';

type Params = Record<string, string>;
type Args<P> = { req: NextRequest; params: P };
type Handler<P, X> = (args: Args<P> & X) => Promise<Response>;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function withCors(res: Response) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

/** Route that requires a logged-in user; the handler receives `userId`. */
export function privateRoute<P = Params>(handler: Handler<P, { userId: string }>) {
  return async (req: NextRequest, ctx: { params: P }) => {
    try {
      const userId = await requireUserId();
      return await handler({ req, params: ctx.params, userId });
    } catch (err) {
      return errorResponse(err);
    }
  };
}

/** Route open to anyone. Pass `{ cors: true }` for endpoints called from external sites. */
export function publicRoute<P = Params>(
  handler: Handler<P, object>,
  opts: { cors?: boolean } = {},
) {
  return async (req: NextRequest, ctx: { params: P }) => {
    let res: Response;
    try {
      res = await handler({ req, params: ctx.params });
    } catch (err) {
      res = errorResponse(err);
    }
    return opts.cors ? withCors(res) : res;
  };
}

export const corsPreflight = () => withCors(new Response(null, { status: 204 }));
