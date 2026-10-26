import { Errors } from '@/lib/api/errors';
import { parseParams } from '@/lib/api/parse';
import { ok } from '@/lib/api/response';
import { corsPreflight, publicRoute } from '@/lib/api/route';
import { slugParamSchema } from '@/schemas/form.schema';
import { getPublishedFormBySlug } from '@/services/form.service';

// CORS enabled: the embed script on third-party sites reads the widget colour from here.
export const GET = publicRoute<{ slug: string }>(
  async ({ params }) => {
    const form = await getPublishedFormBySlug(parseParams(params, slugParamSchema).slug);
    if (!form) throw Errors.notFound('Form');
    return ok(form);
  },
  { cors: true },
);

export const OPTIONS = corsPreflight;
