import { Button } from '@/components/ui/Button';

interface SubmissionFooterProps {
  status: 'idle' | 'submitting' | 'done' | 'error';
  error: string | null;
  empty: boolean;
  onRetry: () => void;
  onRestart?: () => void;
}

export function SubmissionFooter({
  status,
  error,
  empty,
  onRetry,
  onRestart,
}: SubmissionFooterProps) {
  if (empty) {
    return (
      <p className="border-t border-paper-line px-4 py-3 text-center text-sm text-ink-muted">
        This form has no questions yet.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-2 border-t border-paper-line px-4 py-3">
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
        <Button
          size="sm"
          onClick={onRetry}
          className="w-full bg-[var(--chat-brand)] text-[var(--chat-brand-text)] hover:opacity-90"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="flex items-center justify-between border-t border-paper-line px-4 py-3 text-xs text-ink-muted">
        <span>Response sent</span>
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="font-medium text-[var(--chat-brand)] hover:underline"
          >
            Start over
          </button>
        )}
      </div>
    );
  }

  return null;
}
