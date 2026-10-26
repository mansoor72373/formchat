interface ChoiceButtonsProps {
  options: string[];
  onSelect: (value: string) => void;
}

export function ChoiceButtons({ options, onSelect }: ChoiceButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className="rounded-full border border-[var(--chat-brand)] px-4 py-2 text-sm font-medium text-[var(--chat-brand)] transition-colors hover:bg-[var(--chat-brand)] hover:text-[var(--chat-brand-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--chat-brand)]"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
