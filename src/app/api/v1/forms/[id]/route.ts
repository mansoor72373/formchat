import { parseBody, parseParams } from '@/lib/api/parse';
import { noContent, ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { idParamSchema, updateFormSchema } from '@/schemas/form.schema';
import { deleteForm, getForm, updateForm } from '@/services/form.service';

export const dynamic = 'force-dynamic';

type P = { id: string };

export const GET = privateRoute<P>(async ({ params, userId }) =>
  ok(await getForm(userId, parseParams(params, idParamSchema).id)),
);

export const PATCH = privateRoute<P>(async ({ req, params, userId }) => {
  const { id } = parseParams(params, idParamSchema);
  return ok(await updateForm(userId, id, await parseBody(req, updateFormSchema)));
});

export const DELETE = privateRoute<P>(async ({ params, userId }) => {
  await deleteForm(userId, parseParams(params, idParamSchema).id);
  return noContent();
});
