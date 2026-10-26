import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

const tones = {
  error: 'border-red-200 bg-red-50 text-red-800',
  success: 'border-brand-200 bg-brand-50 text-brand-800',
} as const;

export function Alert({
  tone = 'error',
  children,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('rounded-lg border px-3 py-2 text-sm', tones[tone])}
    >
      {children}
    </div>
  );
}
