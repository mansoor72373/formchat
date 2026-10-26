import { parseBody, parseParams } from '@/lib/api/parse';
import { ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { formStatusSchema, idParamSchema } from '@/schemas/form.schema';
import { setFormStatus } from '@/services/form.service';

export const PATCH = privateRoute<{ id: string }>(async ({ req, params, userId }) => {
  const { id } = parseParams(params, idParamSchema);
  const { status } = await parseBody(req, formStatusSchema);
  return ok(await setFormStatus(userId, id, status));
});
