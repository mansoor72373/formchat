import { cn } from '@/lib/utils/cn';
import type { ChatMessage } from '@/hooks/useChatFlow';

export function ChatBubble({ message }: { message: Pick<ChatMessage, 'from' | 'text'> }) {
  const isUser = message.from === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-[var(--chat-brand)] text-[var(--chat-brand-text)]'
            : 'rounded-bl-sm bg-paper text-ink',
        )}
      >
        {message.text}
      </p>
    </div>
  );
}
