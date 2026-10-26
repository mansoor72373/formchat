import { LIMITS } from '@/config/constants';
import type { Answers, Question } from '@/types/form';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the chatbot (instant feedback) and the API (authoritative check). */
export function validateAnswer(question: Question, raw: string | undefined): string | null {
  const value = (raw ?? '').trim();
  if (!value) return question.required ? 'This question is required.' : null;
  if (value.length > LIMITS.maxAnswerLength) return 'That answer is too long.';

  switch (question.type) {
    case 'email':
      return EMAIL_RE.test(value) ? null : 'Enter a valid email address.';
    case 'multiple_choice':
      return question.options?.includes(value) ? null : 'Choose one of the options.';
    case 'yes_no':
      return value === 'Yes' || value === 'No' ? null : 'Choose Yes or No.';
    default:
      return null;
  }
}

/** Returns a map of questionId -> error message (empty when valid). */
export function validateAnswers(questions: Question[], answers: Answers) {
  const errors: Record<string, string> = {};
  for (const q of questions) {
    const err = validateAnswer(q, answers[q.id]);
    if (err) errors[q.id] = err;
  }
  return errors;
}
