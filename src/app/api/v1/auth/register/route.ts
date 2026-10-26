import { parseBody } from '@/lib/api/parse';
import { rateLimit } from '@/lib/api/rate-limit';
import { created } from '@/lib/api/response';
import { publicRoute } from '@/lib/api/route';
import { startSession } from '@/lib/auth/session';
import { registerSchema } from '@/schemas/auth.schema';
import { registerUser } from '@/services/auth.service';

export const POST = publicRoute(async ({ req }) => {
  rateLimit(req, 'register', 10, 60_000);
  const user = await registerUser(await parseBody(req, registerSchema));
  await startSession(user.id);
  return created(user);
});
