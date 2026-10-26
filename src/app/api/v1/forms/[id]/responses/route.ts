import { parseParams, parseQuery } from '@/lib/api/parse';
import { ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { idParamSchema, paginationSchema } from '@/schemas/form.schema';
import { listResponses } from '@/services/response.service';

export const dynamic = 'force-dynamic';

export const GET = privateRoute<{ id: string }>(async ({ req, params, userId }) => {
  const { id } = parseParams(params, idParamSchema);
  const { page, pageSize } = parseQuery(req, paginationSchema);
  const { items, meta } = await listResponses(userId, id, page, pageSize);
  return ok(items, meta);
});
