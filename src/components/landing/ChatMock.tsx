import type { CSSProperties } from 'react';
import { ChatBubble } from '@/components/chatbot/ChatBubble';

const LINES = [
  { from: 'bot', text: 'Hi! Got a minute to tell us how we’re doing?' },
  { from: 'bot', text: 'What’s your email address?' },
  { from: 'user', text: 'maya@studio.example' },
  { from: 'bot', text: 'How would you rate your experience?' },
  { from: 'user', text: 'Great' },
] as const;

/** Static, non-interactive transcript used as hero artwork. */
export function ChatMock() {
  const theme = { '--chat-brand': '#157b6c', '--chat-brand-text': '#ffffff' } as CSSProperties;
  return (
    <div
      style={theme}
      aria-hidden="true"
      className="w-full space-y-3 rounded-[1.75rem] border border-paper-line bg-paper-raised p-5 shadow-2xl shadow-ink/10 sm:p-7"
    >
      {LINES.map((line, i) => (
        <ChatBubble key={i} message={line} />
      ))}
      <div className="flex gap-2 pt-1">
        {['Yes', 'No'].map((t) => (
          <span
            key={t}
            className="rounded-full border border-brand-600 px-4 py-1.5 text-sm font-medium text-brand-600"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
