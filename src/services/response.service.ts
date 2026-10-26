import { and, count, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { forms, responses } from '@/db/schema';
import { Errors } from '@/lib/api/errors';
import { validateAnswers } from '@/lib/validation/answers';
import type { Answers, PaginationMeta, ResponseDTO } from '@/types/form';
import { toResponseDTO } from './mappers';

export async function submitResponse(slug: string, answers: Answers) {
  const [form] = await db
    .select()
    .from(forms)
    .where(and(eq(forms.slug, slug), eq(forms.status, 'published')));
  if (!form) throw Errors.notFound('Form');

  const errors = validateAnswers(form.questions, answers);
  if (Object.keys(errors).length > 0) {
    throw Errors.validation(
      Object.entries(errors).map(([path, message]) => ({ path: `answers.${path}`, message })),
    );
  }

  // Store only answers for known questions: never trust extra keys from the client.
  const clean: Answers = {};
  for (const q of form.questions) clean[q.id] = (answers[q.id] ?? '').trim();

  const [row] = await db.insert(responses).values({ formId: form.id, answers: clean }).returning();
  return toResponseDTO(row!);
}

export async function listResponses(
  userId: string,
  formId: string,
  page: number,
  pageSize: number,
): Promise<{ items: ResponseDTO[]; meta: PaginationMeta }> {
  const [form] = await db
    .select({ id: forms.id })
    .from(forms)
    .where(and(eq(forms.id, formId), eq(forms.userId, userId)));
  if (!form) throw Errors.notFound('Form');

  const [{ total = 0 } = {}] = await db
    .select({ total: count() })
    .from(responses)
    .where(eq(responses.formId, formId));

  const rows = await db
    .select()
    .from(responses)
    .where(eq(responses.formId, formId))
    .orderBy(desc(responses.submittedAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    items: rows.map(toResponseDTO),
    meta: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
  };
}
