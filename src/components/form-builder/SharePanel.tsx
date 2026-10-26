'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Alert } from '@/components/ui/Alert';
import { buttonStyles } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input } from '@/components/ui/Input';
import { useOrigin } from '@/hooks/useOrigin';
import { publicFormPath } from '@/lib/utils/urls';
import type { FormDTO } from '@/types/form';
import { EmbedSnippet } from './EmbedSnippet';

export function SharePanel({ form }: { form: FormDTO | undefined }) {
  const origin = useOrigin();

  if (!form)
    return <Alert tone="success">Save your form to get a public link and embed code.</Alert>;

  const url = `${origin}${publicFormPath(form.slug)}`;

  return (
    <div className="space-y-6">
      {form.status !== 'published' && (
        <Alert tone="error">
          This form is a draft. The link and embed code only work after you publish it.
        </Alert>
      )}
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">Public link</p>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={url}
            aria-label="Public form URL"
            onFocus={(e) => e.currentTarget.select()}
          />
          <CopyButton value={url} />
          <Link
            href={publicFormPath(form.slug)}
            target="_blank"
            className={buttonStyles('secondary', 'sm')}
            aria-label="Open public form"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <EmbedSnippet slug={form.slug} />
    </div>
  );
}
