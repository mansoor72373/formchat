'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ApiClientError } from '@/lib/api/client';
import { formsApi } from '@/lib/api/endpoints';
import type { FormDTO } from '@/types/form';
import type { BuilderState } from './useFormBuilder';
import { refreshForms } from './useForms';

/** Create-or-update + publish/unpublish for the builder. */
export function useSaveForm(initial: FormDTO | undefined) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);

  async function run(work: () => Promise<FormDTO>) {
    setSaving(true);
    setError(null);
    setFieldErrors({});
    try {
      const saved = await work();
      const isNew = !form;
      setForm(saved);
      setSavedAt(Date.now());
      await refreshForms();
      // First save of a new form: move to its edit URL so refresh/back behave.
      if (isNew) router.replace(`/dashboard/forms/${saved.id}`);
      return saved;
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors);
      } else setError('Something went wrong. Please try again.');
      return null;
    } finally {
      setSaving(false);
    }
  }

  const save = (state: BuilderState) =>
    run(() => (form ? formsApi.update(form.id, state) : formsApi.create(state)));

  const setPublished = (state: BuilderState, published: boolean) =>
    run(async () => {
      // Persist the latest edits first so what's live matches what the user sees.
      const saved = form ? await formsApi.update(form.id, state) : await formsApi.create(state);
      return formsApi.setStatus(saved.id, published ? 'published' : 'draft');
    });

  return { form, saving, error, fieldErrors, savedAt, save, setPublished };
}
