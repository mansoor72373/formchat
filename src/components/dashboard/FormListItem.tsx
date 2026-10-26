'use client';

import { BarChart3, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button, buttonStyles } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { CopyButton } from '@/components/ui/CopyButton';
import { useFormActions } from '@/hooks/useFormActions';
import { useOrigin } from '@/hooks/useOrigin';
import { formatDate, pluralize } from '@/lib/utils/format';
import { publicFormPath } from '@/lib/utils/urls';
import type { FormSummaryDTO } from '@/types/form';
import { FormStatusBadge } from './FormStatusBadge';

export function FormListItem({ form }: { form: FormSummaryDTO }) {
  const origin = useOrigin();
  const actions = useFormActions(form.id);
  const [confirming, setConfirming] = useState(false);
  const published = form.status === 'published';

  return (
    <Card className="p-5 transition-shadow hover:shadow-md hover:shadow-ink/[0.04] sm:p-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={`/dashboard/forms/${form.id}`}
              className="truncate text-base font-semibold text-ink transition-colors hover:text-brand-700"
            >
              {form.title}
            </Link>
            <FormStatusBadge status={form.status} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {pluralize(form.questionCount, 'question')} <span aria-hidden="true">·</span>{' '}
            {pluralize(form.responseCount, 'response')} <span aria-hidden="true">·</span> Updated{' '}
            {formatDate(form.updatedAt)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/dashboard/forms/${form.id}/responses`}
            className={buttonStyles('secondary', 'sm')}
          >
            <BarChart3 className="h-4 w-4" /> Responses
          </Link>
          <Link href={`/dashboard/forms/${form.id}`} className={buttonStyles('secondary', 'sm')}>
            <Pencil className="h-4 w-4" /> Edit
          </Link>
          <Button
            variant="secondary"
            size="sm"
            loading={actions.busy}
            onClick={() => actions.setStatus(published ? 'draft' : 'published')}
          >
            {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {published ? 'Unpublish' : 'Publish'}
          </Button>
          {published && origin && (
            <CopyButton value={`${origin}${publicFormPath(form.slug)}`} label="Copy link" />
          )}
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${form.title}`}
            onClick={() => setConfirming(true)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>

      {actions.error && (
        <div className="mt-3">
          <Alert>{actions.error}</Alert>
        </div>
      )}

      <ConfirmDialog
        open={confirming}
        title="Delete this form?"
        description="The form, its public link and all of its responses will be permanently deleted."
        confirmLabel="Delete form"
        loading={actions.busy}
        onCancel={() => setConfirming(false)}
        onConfirm={async () => {
          await actions.remove();
          setConfirming(false);
        }}
      />
    </Card>
  );
}
