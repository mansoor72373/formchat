import { cn } from '@/lib/utils/cn';

export const BUILDER_TABS = [
  { id: 'build', label: 'Questions' },
  { id: 'design', label: 'Design' },
  { id: 'preview', label: 'Preview' },
  { id: 'share', label: 'Share & embed' },
] as const;

export type BuilderTab = (typeof BUILDER_TABS)[number]['id'];

interface BuilderTabsProps {
  active: BuilderTab;
  onChange: (tab: BuilderTab) => void;
}

export function BuilderTabs({ active, onChange }: BuilderTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Form editor sections"
      className="flex gap-1 overflow-x-auto rounded-2xl border border-paper-line bg-paper-raised p-1.5 shadow-sm shadow-ink/[0.03]"
    >
      {BUILDER_TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'min-h-10 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600',
            active === tab.id
              ? 'bg-brand-50 text-brand-800 shadow-sm'
              : 'text-ink-muted hover:bg-paper hover:text-ink',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
