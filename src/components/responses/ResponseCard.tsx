import { Card } from '@/components/ui/Card';
import { formatDateTime } from '@/lib/utils/format';
import type { Question, ResponseDTO } from '@/types/form';

interface ResponseCardProps {
  response: ResponseDTO;
  questions: Question[];
}

export function ResponseCard({ response, questions }: ResponseCardProps) {
  return (
    <Card className="overflow-hidden">
      <p className="border-b border-paper-line bg-paper px-5 py-3 text-sm font-medium text-ink-soft">
        Submitted <time dateTime={response.submittedAt}>{formatDateTime(response.submittedAt)}</time>
      </p>
      <dl className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
        {questions.map((q) => (
          <div key={q.id} className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{q.label}</dt>
            <dd className="mt-1 break-words text-sm leading-6 text-ink">
              {response.answers[q.id] || <span className="text-ink-muted">Skipped</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
