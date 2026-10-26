import { X } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  title: string;
  progress: { step: number; total: number };
  onClose?: () => void;
}

export function ChatHeader({ name, title, progress, onClose }: ChatHeaderProps) {
  const pct = progress.total ? (progress.step / progress.total) * 100 : 0;
  return (
    <header className="relative flex items-center gap-3 bg-[var(--chat-brand)] px-4 py-4 text-[var(--chat-brand-text)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold ring-1 ring-white/20">
        {name.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight">{name}</p>
        <p className="truncate text-xs opacity-80">{title}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-2 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
        <div
          className="h-full bg-white/80 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}
