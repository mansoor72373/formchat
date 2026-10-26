import { parseBody, parseParams } from '@/lib/api/parse';
import { rateLimit } from '@/lib/api/rate-limit';
import { created } from '@/lib/api/response';
import { publicRoute } from '@/lib/api/route';
import { slugParamSchema } from '@/schemas/form.schema';
import { submitResponseSchema } from '@/schemas/response.schema';
import { submitResponse } from '@/services/response.service';

export const POST = publicRoute<{ slug: string }>(async ({ req, params }) => {
  rateLimit(req, 'submit', 20, 60_000);
  const { slug } = parseParams(params, slugParamSchema);
  const { answers } = await parseBody(req, submitResponseSchema);
  const { id, submittedAt } = await submitResponse(slug, answers);
  return created({ id, submittedAt });
});
