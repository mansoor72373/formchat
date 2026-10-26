import { DEFAULT_FORM_SETTINGS, FORM_STATUSES, LIMITS, QUESTION_TYPES } from '@/config/constants';
import { z } from '@/lib/openapi/zod';

export const questionSchema = z
  .object({
    id: z.string().min(1).max(40),
    type: z.enum(QUESTION_TYPES),
    label: z.string().trim().min(1, 'Question text is required').max(300),
    required: z.boolean(),
    options: z
      .array(z.string().trim().min(1, 'Option cannot be empty').max(100))
      .max(LIMITS.maxOptions)
      .optional(),
  })
  .superRefine((q, ctx) => {
    if (q.type === 'multiple_choice' && (q.options?.length ?? 0) < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['options'],
        message: 'Add at least two options',
      });
    }
  });

export const formSettingsSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex colour, e.g. #157b6c'),
  botName: z.string().trim().min(1).max(40),
  welcomeMessage: z.string().trim().min(1, 'Welcome message is required').max(300),
  completionMessage: z.string().trim().min(1, 'Completion message is required').max(300),
});

const questionsSchema = z.array(questionSchema).max(LIMITS.maxQuestions);

export const createFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().max(500).default(''),
  questions: questionsSchema.default([]),
  settings: formSettingsSchema.default({ ...DEFAULT_FORM_SETTINGS }),
});

export const updateFormSchema = createFormSchema.partial();

export const formStatusSchema = z.object({ status: z.enum(FORM_STATUSES) });

export const idParamSchema = z.object({ id: z.string().uuid() });
export const slugParamSchema = z.object({ slug: z.string().min(1).max(40) });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
