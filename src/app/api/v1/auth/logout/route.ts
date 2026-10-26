import { noContent } from '@/lib/api/response';
import { publicRoute } from '@/lib/api/route';
import { endSession } from '@/lib/auth/session';

export const POST = publicRoute(async () => {
  endSession();
  return noContent();
});
