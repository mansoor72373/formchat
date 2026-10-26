import type { z } from 'zod';
import type {
  formDto,
  formSummaryDto,
  paginationMetaDto,
  publicFormDto,
  responseDto,
  statsDto,
  userDto,
} from '@/schemas/dto.schema';
import type { createFormSchema, formSettingsSchema, questionSchema } from '@/schemas/form.schema';

export type Question = z.infer<typeof questionSchema>;
export type QuestionType = Question['type'];
export type FormSettings = z.infer<typeof formSettingsSchema>;
export type FormInput = z.input<typeof createFormSchema>;
export type FormStatus = 'draft' | 'published';

export type UserDTO = z.infer<typeof userDto>;
export type FormDTO = z.infer<typeof formDto>;
export type FormSummaryDTO = z.infer<typeof formSummaryDto>;
export type PublicFormDTO = z.infer<typeof publicFormDto>;
export type ResponseDTO = z.infer<typeof responseDto>;
export type StatsDTO = z.infer<typeof statsDto>;
export type PaginationMeta = z.infer<typeof paginationMetaDto>;

export type Answers = Record<string, string>;
