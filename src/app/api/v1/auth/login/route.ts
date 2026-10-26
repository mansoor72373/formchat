import { parseBody } from '@/lib/api/parse';
import { rateLimit } from '@/lib/api/rate-limit';
import { ok } from '@/lib/api/response';
import { publicRoute } from '@/lib/api/route';
import { startSession } from '@/lib/auth/session';
import { loginSchema } from '@/schemas/auth.schema';
import { authenticate } from '@/services/auth.service';

export const POST = publicRoute(async ({ req }) => {
  rateLimit(req, 'login', 10, 60_000);
  const user = await authenticate(await parseBody(req, loginSchema));
  await startSession(user.id);
  return ok(user);
});
