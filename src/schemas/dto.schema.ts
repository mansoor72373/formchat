import { FORM_STATUSES } from '@/config/constants';
import { z } from '@/lib/openapi/zod';
import { formSettingsSchema, questionSchema } from './form.schema';

// What the API returns. Used for TypeScript types AND the Swagger document.
export const userDto = z.object({ id: z.string().uuid(), name: z.string(), email: z.string() });

export const formSummaryDto = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(FORM_STATUSES),
  questionCount: z.number().int(),
  responseCount: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const formDto = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  status: z.enum(FORM_STATUSES),
  questions: z.array(questionSchema),
  settings: formSettingsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const publicFormDto = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  questions: z.array(questionSchema),
  settings: formSettingsSchema,
});

export const responseDto = z.object({
  id: z.string().uuid(),
  formId: z.string().uuid(),
  answers: z.record(z.string(), z.string()),
  submittedAt: z.string().datetime(),
});

export const statsDto = z.object({
  totalForms: z.number().int(),
  publishedForms: z.number().int(),
  totalResponses: z.number().int(),
});

export const paginationMetaDto = z.object({
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
});
