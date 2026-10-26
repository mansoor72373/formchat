'use client';

import { Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { LIMITS } from '@/config/constants';

interface TextAnswerInputProps {
  type: 'text' | 'email';
  autoFocus?: boolean;
  invalid?: boolean;
  onSubmit: (value: string) => void;
  onChange?: () => void;
}

export function TextAnswerInput({
  type,
  autoFocus,
  invalid,
  onSubmit,
  onChange,
}: TextAnswerInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type={type === 'email' ? 'email' : 'text'}
        inputMode={type === 'email' ? 'email' : 'text'}
        autoComplete={type === 'email' ? 'email' : 'off'}
        autoFocus={autoFocus}
        value={value}
        maxLength={LIMITS.maxAnswerLength}
        aria-label="Your answer"
        aria-invalid={invalid || undefined}
        placeholder={type === 'email' ? 'you@example.com' : 'Type your answer…'}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.();
        }}
        // 16px font on mobile prevents iOS Safari from zooming into the input.
        className="focus:ring-[var(--chat-brand)]/30 h-11 min-w-0 flex-1 rounded-full border border-paper-line bg-paper-raised px-4 text-base text-ink placeholder:text-ink-muted focus:border-[var(--chat-brand)] focus:outline-none focus:ring-2 sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Send answer"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--chat-brand)] text-[var(--chat-brand-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--chat-brand)]"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
