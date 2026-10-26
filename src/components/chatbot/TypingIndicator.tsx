export function TypingIndicator() {
  return (
    <div
      className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-paper px-4 py-3"
      aria-label="Typing"
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
