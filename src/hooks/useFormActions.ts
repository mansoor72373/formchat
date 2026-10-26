'use client';

import { useState } from 'react';
import { ApiClientError } from '@/lib/api/client';
import { formsApi } from '@/lib/api/endpoints';
import type { FormStatus } from '@/types/form';
import { refreshForms } from './useForms';

/** Publish / unpublish / delete with shared loading + error state. */
export function useFormActions(formId: string) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      await refreshForms();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return {
    busy,
    error,
    setStatus: (status: FormStatus) => run(() => formsApi.setStatus(formId, status)),
    remove: () => run(() => formsApi.remove(formId)),
  };
}
