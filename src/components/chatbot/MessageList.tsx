'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/hooks/useChatFlow';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  typing: boolean;
}

export function MessageList({ messages, typing }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the chat container only (scrollIntoView would also scroll the host page).
    const el = endRef.current?.parentElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages.length, typing]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite">
      {messages.map((m) => (
        <ChatBubble key={m.id} message={m} />
      ))}
      {typing && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
