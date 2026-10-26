'use client';

import { useOrigin } from '@/hooks/useOrigin';
import { CopyButton } from '@/components/ui/CopyButton';
import { embedSnippet } from '@/lib/utils/urls';

export function EmbedSnippet({ slug }: { slug: string }) {
  const origin = useOrigin();
  const snippet = origin ? embedSnippet(origin, slug) : '';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink">Website embed code</p>
        <CopyButton value={snippet} label="Copy code" />
      </div>
      <pre className="overflow-x-auto rounded-lg bg-ink p-3 text-xs leading-relaxed text-brand-100">
        <code>{snippet}</code>
      </pre>
      <p className="text-sm text-ink-muted">
        Paste this just before the closing &lt;/body&gt; tag of any page.
      </p>
    </div>
  );
}
