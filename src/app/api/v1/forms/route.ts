import { parseBody } from '@/lib/api/parse';
import { created, ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { createFormSchema } from '@/schemas/form.schema';
import { createForm, listForms } from '@/services/form.service';

export const dynamic = 'force-dynamic';

export const GET = privateRoute(async ({ userId }) => ok(await listForms(userId)));

export const POST = privateRoute(async ({ req, userId }) =>
  created(await createForm(userId, await parseBody(req, createFormSchema))),
);
