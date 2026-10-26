import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FormBuilder } from '@/components/form-builder/FormBuilder';
import { AppError } from '@/lib/api/errors';
import { requirePageUser } from '@/lib/auth/session';
import { idParamSchema } from '@/schemas/form.schema';
import { getForm } from '@/services/form.service';

export const metadata: Metadata = { title: 'Edit form' };

export default async function EditFormPage({ params }: { params: { id: string } }) {
  const user = await requirePageUser();
  const parsed = idParamSchema.safeParse(params);
  if (!parsed.success) notFound();

  try {
    const form = await getForm(user.id, parsed.data.id);
    return <FormBuilder initialForm={form} />;
  } catch (err) {
    if (err instanceof AppError && err.status === 404) notFound();
    throw err;
  }
}
