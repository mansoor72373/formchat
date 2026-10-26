'use client';

import { useCallback } from 'react';
import { publicApi } from '@/lib/api/endpoints';
import type { Answers, PublicFormDTO } from '@/types/form';
import { ChatWidget, type ChatVariant } from './ChatWidget';

interface PublicChatProps {
  form: PublicFormDTO;
  variant: ChatVariant;
}

/** Live chatbot bound to the real submission endpoint. Used by /f/[slug] and /embed/[slug]. */
export function PublicChat({ form, variant }: PublicChatProps) {
  const submit = useCallback(
    async (answers: Answers) => {
      await publicApi.submit(form.slug, answers);
    },
    [form.slug],
  );

  // Inside the widget iframe, ask the host page (widget.js) to close the panel.
  const onClose =
    variant === 'embedded' && typeof window !== 'undefined' && window.parent !== window
      ? () => window.parent.postMessage({ type: 'formchat:close' }, '*')
      : undefined;

  return <ChatWidget form={form} variant={variant} onSubmit={submit} onClose={onClose} autoFocus />;
}
