import { Eye, EyeOff, Save } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonStyles } from '@/components/ui/Button';
import type { FormStatus } from '@/types/form';

interface BuilderToolbarProps {
  status: FormStatus | undefined;
  saving: boolean;
  justSaved: boolean;
  onSave: () => void;
  onTogglePublish: () => void;
}

export function BuilderToolbar({
  status,
  saving,
  justSaved,
  onSave,
  onTogglePublish,
}: BuilderToolbarProps) {
  const published = status === 'published';
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-paper-line bg-paper-raised p-3 shadow-sm shadow-ink/[0.03] sm:p-4">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className={buttonStyles('ghost', 'sm')}>
          ← Forms
        </Link>
        <Badge tone={published ? 'success' : 'neutral'}>{published ? 'Published' : 'Draft'}</Badge>
        {justSaved && !saving && (
          <span role="status" className="text-sm text-brand-700">
            Saved
          </span>
        )}
      </div>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <Button variant="secondary" className="flex-1 sm:flex-none" onClick={onSave} loading={saving}>
          <Save className="h-4 w-4" /> Save
        </Button>
        <Button className="flex-1 sm:flex-none" onClick={onTogglePublish} disabled={saving}>
          {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {published ? 'Unpublish' : 'Publish'}
        </Button>
      </div>
    </div>
  );
}
