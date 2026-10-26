'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Alert } from '@/components/ui/Alert';
import { buttonStyles } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { useForms } from '@/hooks/useForms';
import { FormListItem } from './FormListItem';

export function FormList() {
  const { data, error, isLoading } = useForms();

  if (isLoading)
    return (
      <div className="flex justify-center py-16 text-brand-600">
        <Spinner className="h-6 w-6" />
      </div>
    );
  if (error) return <Alert>We couldn’t load your forms. Refresh the page to try again.</Alert>;

  if (!data?.length) {
    return (
      <EmptyState
        title="Create your first form"
        description="Add a few questions, publish, and share the link or embed the chat widget on your site."
        action={
          <Link href="/dashboard/forms/new" className={buttonStyles()}>
            <Plus className="h-4 w-4" /> New form
          </Link>
        }
      />
    );
  }

  return (
    <ul className="space-y-4">
      {data.map((form) => (
        <li key={form.id}>
          <FormListItem form={form} />
        </li>
      ))}
    </ul>
  );
}
