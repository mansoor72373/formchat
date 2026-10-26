import { Errors } from '@/lib/api/errors';
import { ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { getUserById } from '@/services/auth.service';

export const dynamic = 'force-dynamic';

export const GET = privateRoute(async ({ userId }) => {
  const user = await getUserById(userId);
  if (!user) throw Errors.unauthorized();
  return ok(user);
});
