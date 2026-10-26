'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateAnswer } from '@/lib/validation/answers';
import type { Answers, FormSettings, Question } from '@/types/form';

export interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
}

type Status = 'idle' | 'submitting' | 'done' | 'error';
const TYPING_MS = 550;

interface Options {
  questions: Question[];
  settings: FormSettings;
  onSubmit: (answers: Answers) => Promise<void>;
}

/**
 * Drives the conversation. Messages are *derived* from (step, answers) rather than
 * stored, so the transcript can never get out of sync with the state.
 */
export function useChatFlow({ questions, settings, onSubmit }: Options) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(true);

  const total = questions.length;
  const current: Question | undefined = questions[step];
  const finished = status === 'done';

  // Brief "typing…" pause before each bot message.
  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), TYPING_MS);
    return () => clearTimeout(t);
  }, [step, finished]);

  const messages = useMemo<ChatMessage[]>(() => {
    const list: ChatMessage[] = [{ id: 'welcome', from: 'bot', text: settings.welcomeMessage }];
    questions.slice(0, step).forEach((q) => {
      list.push({ id: `q-${q.id}`, from: 'bot', text: q.label });
      list.push({ id: `a-${q.id}`, from: 'user', text: answers[q.id] || 'Skipped' });
    });
    if (current && !typing) list.push({ id: `q-${current.id}`, from: 'bot', text: current.label });
    if (finished && !typing)
      list.push({ id: 'done', from: 'bot', text: settings.completionMessage });
    return list;
  }, [questions, step, answers, current, typing, finished, settings]);

  const send = useCallback(
    async (rawValue: string) => {
      if (!current || status === 'submitting') return;
      const validation = validateAnswer(current, rawValue);
      if (validation) return setError(validation);

      setError(null);
      const next = { ...answers, [current.id]: rawValue.trim() };
      setAnswers(next);
      setStep(step + 1);
      if (step + 1 < total) return;

      setStatus('submitting');
      try {
        await onSubmit(next);
        setStatus('done');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Could not send your answers.');
      }
    },
    [current, status, answers, step, total, onSubmit],
  );

  const retry = useCallback(async () => {
    setStatus('submitting');
    setError(null);
    try {
      await onSubmit(answers);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your answers.');
    }
  }, [answers, onSubmit]);

  const restart = useCallback(() => {
    setStep(0);
    setAnswers({});
    setStatus('idle');
    setError(null);
  }, []);

  return {
    messages,
    current: typing ? undefined : current,
    typing: typing || status === 'submitting',
    status,
    error,
    send,
    retry,
    restart,
    clearError: () => setError(null),
    progress: { step: Math.min(step, total), total },
  };
}
