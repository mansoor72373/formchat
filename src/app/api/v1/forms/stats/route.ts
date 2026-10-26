import { ok } from '@/lib/api/response';
import { privateRoute } from '@/lib/api/route';
import { getStats } from '@/services/form.service';

export const dynamic = 'force-dynamic';

export const GET = privateRoute(async ({ userId }) => ok(await getStats(userId)));
