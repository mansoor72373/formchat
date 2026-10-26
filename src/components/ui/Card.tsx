import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-paper-line bg-paper-raised shadow-sm shadow-ink/[0.03]',
        className,
      )}
      {...props}
    />
  );
}
