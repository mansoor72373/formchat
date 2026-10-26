import { z } from '@/lib/openapi/zod';

export const submitResponseSchema = z.object({
  answers: z.record(z.string(), z.string()),
});
