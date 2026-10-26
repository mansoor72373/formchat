import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

const tones = {
  neutral: 'bg-paper text-ink-soft ring-paper-line',
  success: 'bg-brand-50 text-brand-800 ring-brand-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
} as const;

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
