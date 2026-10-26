import { and, desc, eq, sql } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import type { z } from 'zod';
import { db } from '@/db';
import { forms, responses } from '@/db/schema';
import { AppError, Errors } from '@/lib/api/errors';
import type { createFormSchema, updateFormSchema } from '@/schemas/form.schema';
import type { FormDTO, FormStatus, FormSummaryDTO, PublicFormDTO, StatsDTO } from '@/types/form';
import { toFormDTO, toPublicFormDTO } from './mappers';

// Unambiguous characters only (no 0/o/1/l) so links are easy to read and type.
const newSlug = customAlphabet('abcdefghjkmnpqrstuvwxyz23456789', 10);

async function findOwned(userId: string, id: string) {
  const [row] = await db
    .select()
    .from(forms)
    .where(and(eq(forms.id, id), eq(forms.userId, userId)));
  if (!row) throw Errors.notFound('Form');
  return row;
}

export async function listForms(userId: string): Promise<FormSummaryDTO[]> {
  const rows = await db
    .select({
      id: forms.id,
      title: forms.title,
      slug: forms.slug,
      status: forms.status,
      questionCount: sql<number>`jsonb_array_length(${forms.questions})::int`,
      responseCount: sql<number>`count(${responses.id})::int`,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
    })
    .from(forms)
    .leftJoin(responses, eq(responses.formId, forms.id))
    .where(eq(forms.userId, userId))
    .groupBy(forms.id)
    .orderBy(desc(forms.updatedAt));

  return rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function getStats(userId: string): Promise<StatsDTO> {
  const [row] = await db
    .select({
      totalForms: sql<number>`count(distinct ${forms.id})::int`,
      publishedForms: sql<number>`count(distinct ${forms.id}) filter (where ${forms.status} = 'published')::int`,
      totalResponses: sql<number>`count(${responses.id})::int`,
    })
    .from(forms)
    .leftJoin(responses, eq(responses.formId, forms.id))
    .where(eq(forms.userId, userId));
  return row ?? { totalForms: 0, publishedForms: 0, totalResponses: 0 };
}

export async function getForm(userId: string, id: string): Promise<FormDTO> {
  return toFormDTO(await findOwned(userId, id));
}

export async function createForm(userId: string, input: z.output<typeof createFormSchema>) {
  const [row] = await db
    .insert(forms)
    .values({ ...input, userId, slug: newSlug() })
    .returning();
  return toFormDTO(row!);
}

export async function updateForm(
  userId: string,
  id: string,
  input: z.output<typeof updateFormSchema>,
) {
  await findOwned(userId, id);
  const [row] = await db
    .update(forms)
    .set({ ...input, updatedAt: new Date() })
    .where(and(eq(forms.id, id), eq(forms.userId, userId)))
    .returning();
  return toFormDTO(row!);
}

export async function setFormStatus(userId: string, id: string, status: FormStatus) {
  const form = await findOwned(userId, id);
  if (status === 'published' && form.questions.length === 0) {
    throw new AppError(422, 'FORM_EMPTY', 'Add at least one question before publishing');
  }
  const [row] = await db
    .update(forms)
    .set({ status, updatedAt: new Date() })
    .where(eq(forms.id, id))
    .returning();
  return toFormDTO(row!);
}

export async function deleteForm(userId: string, id: string) {
  await findOwned(userId, id);
  await db.delete(forms).where(eq(forms.id, id));
}

/** Only published forms are visible to the public. */
export async function getPublishedFormBySlug(slug: string): Promise<PublicFormDTO | null> {
  const [row] = await db
    .select()
    .from(forms)
    .where(and(eq(forms.slug, slug), eq(forms.status, 'published')));
  return row ? toPublicFormDTO(row) : null;
}
