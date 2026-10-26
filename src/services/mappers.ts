import type { forms, responses, users } from '@/db/schema';
import type { FormDTO, PublicFormDTO, ResponseDTO, UserDTO } from '@/types/form';

export const toUserDTO = (u: typeof users.$inferSelect): UserDTO => ({
  id: u.id,
  name: u.name,
  email: u.email,
});

export const toFormDTO = (f: typeof forms.$inferSelect): FormDTO => ({
  id: f.id,
  title: f.title,
  description: f.description,
  slug: f.slug,
  status: f.status,
  questions: f.questions,
  settings: f.settings,
  createdAt: f.createdAt.toISOString(),
  updatedAt: f.updatedAt.toISOString(),
});

export const toPublicFormDTO = (f: typeof forms.$inferSelect): PublicFormDTO => ({
  slug: f.slug,
  title: f.title,
  description: f.description,
  questions: f.questions,
  settings: f.settings,
});

export const toResponseDTO = (r: typeof responses.$inferSelect): ResponseDTO => ({
  id: r.id,
  formId: r.formId,
  answers: r.answers,
  submittedAt: r.submittedAt.toISOString(),
});
