import { Badge } from '@/components/ui/Badge';
import type { FormStatus } from '@/types/form';

export function FormStatusBadge({ status }: { status: FormStatus }) {
  return (
    <Badge tone={status === 'published' ? 'success' : 'neutral'}>
      {status === 'published' ? 'Published' : 'Draft'}
    </Badge>
  );
}
