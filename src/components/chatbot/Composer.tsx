'use client';

import type { Question } from '@/types/form';
import { ChoiceButtons } from './ChoiceButtons';
import { TextAnswerInput } from './TextAnswerInput';

interface ComposerProps {
  question: Question;
  error: string | null;
  autoFocus?: boolean;
  onSend: (value: string) => void;
  onClearError: () => void;
}

/** Picks the right answer control for the current question type. */
export function Composer({ question, error, autoFocus, onSend, onClearError }: ComposerProps) {
  const isChoice = question.type === 'multiple_choice' || question.type === 'yes_no';
  const options = question.type === 'yes_no' ? ['Yes', 'No'] : (question.options ?? []);

  return (
    <div className="space-y-2 border-t border-paper-line bg-paper-raised px-4 py-3">
      {isChoice ? (
        <ChoiceButtons options={options} onSelect={onSend} />
      ) : (
        <TextAnswerInput
          key={question.id}
          type={question.type === 'email' ? 'email' : 'text'}
          autoFocus={autoFocus}
          invalid={!!error}
          onSubmit={onSend}
          onChange={onClearError}
        />
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
      {!question.required && (
        <button
          type="button"
          onClick={() => onSend('')}
          className="text-xs text-ink-muted underline-offset-2 hover:underline"
        >
          Skip this question
        </button>
      )}
    </div>
  );
}
