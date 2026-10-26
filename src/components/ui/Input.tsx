import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

const base =
  'w-full rounded-xl border bg-paper-raised px-3 text-base text-ink shadow-sm shadow-ink/[0.02] placeholder:text-ink-muted ' +
  'transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:opacity-60 sm:text-sm';

interface FieldState {
  invalid?: boolean;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FieldState
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(base, 'h-11', invalid ? 'border-red-500' : 'border-paper-line', className)}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & FieldState
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(base, 'py-2.5', invalid ? 'border-red-500' : 'border-paper-line', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
