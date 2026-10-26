'use client';

import type { CSSProperties } from 'react';
import { useChatFlow } from '@/hooks/useChatFlow';
import { cn } from '@/lib/utils/cn';
import { readableTextOn } from '@/lib/utils/color';
import type { Answers, PublicFormDTO } from '@/types/form';
import { ChatHeader } from './ChatHeader';
import { Composer } from './Composer';
import { MessageList } from './MessageList';
import { SubmissionFooter } from './SubmissionFooter';

export type ChatVariant = 'card' | 'embedded';

interface ChatWidgetProps {
  form: Pick<PublicFormDTO, 'title' | 'questions' | 'settings'>;
  onSubmit: (answers: Answers) => Promise<void>;
  variant?: ChatVariant;
  /** Focus the input automatically (off on landing page so it doesn't steal scroll). */
  autoFocus?: boolean;
  /** Show a restart link after completion (demo / preview). */
  allowRestart?: boolean;
  onClose?: () => void;
  className?: string;
}

export function ChatWidget({
  form,
  onSubmit,
  variant = 'card',
  autoFocus,
  allowRestart,
  onClose,
  className,
}: ChatWidgetProps) {
  const chat = useChatFlow({ questions: form.questions, settings: form.settings, onSubmit });
  const { primaryColor, botName } = form.settings;

  const theme = {
    '--chat-brand': primaryColor,
    '--chat-brand-text': readableTextOn(primaryColor),
  } as CSSProperties;

  return (
    <section
      style={theme}
      aria-label={`Chat: ${form.title}`}
      className={cn(
        'flex flex-col overflow-hidden bg-paper-raised',
        variant === 'card' &&
          'h-[34rem] max-h-[85dvh] rounded-[1.5rem] border border-paper-line shadow-2xl shadow-ink/10',
        variant === 'embedded' && 'h-dvh',
        className,
      )}
    >
      <ChatHeader name={botName} title={form.title} progress={chat.progress} onClose={onClose} />
      <MessageList messages={chat.messages} typing={chat.typing} />
      {chat.current && chat.status === 'idle' && (
        <Composer
          question={chat.current}
          error={chat.error}
          autoFocus={autoFocus}
          onSend={chat.send}
          onClearError={chat.clearError}
        />
      )}
      <SubmissionFooter
        status={chat.status}
        error={chat.error}
        empty={form.questions.length === 0}
        onRetry={chat.retry}
        onRestart={allowRestart ? chat.restart : undefined}
      />
    </section>
  );
}
