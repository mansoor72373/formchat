'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { buttonStyles } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { PageHeader } from '@/components/layout/PageHeader';
import { useForm, useResponses } from '@/hooks/useForms';
import { pluralize } from '@/lib/utils/format';
import { ResponseCard } from './ResponseCard';

export function ResponsesView({ formId }: { formId: string }) {
  const [page, setPage] = useState(1);
  const form = useForm(formId);
  const responses = useResponses(formId, page);

  if (form.error || responses.error) return <Alert>We couldn’t load these responses.</Alert>;
  if (!form.data || !responses.data)
    return (
      <div className="flex justify-center py-16 text-brand-600">
        <Spinner className="h-6 w-6" />
      </div>
    );

  const { data: items, meta } = responses.data;
  const { questions, title, status } = form.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={`${pluralize(meta?.total ?? 0, 'response')}`}
        actions={
          <Link href={`/dashboard/forms/${formId}`} className={buttonStyles('secondary')}>
            Edit form
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No responses yet"
          description={
            status === 'published'
              ? 'Share the link or embed the widget to start collecting answers.'
              : 'Publish this form to start collecting answers.'
          }
        />
      ) : (
        <>
          <div className="space-y-3">
            {items.map((r) => (
              <ResponseCard key={r.id} response={r} questions={questions} />
            ))}
          </div>
          <Pagination page={page} totalPages={meta?.totalPages ?? 1} onChange={setPage} />
        </>
      )}
    </div>
  );
}
