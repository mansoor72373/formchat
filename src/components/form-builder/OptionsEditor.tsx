import { Plus, X } from 'lucide-react';
import { LIMITS } from '@/config/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface OptionsEditorProps {
  options: string[];
  error?: string;
  onChange: (options: string[]) => void;
}

export function OptionsEditor({ options, error, onChange }: OptionsEditorProps) {
  const update = (i: number, value: string) =>
    onChange(options.map((o, idx) => (idx === i ? value : o)));

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-ink">Options</p>
      {options.map((option, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={option}
            aria-label={`Option ${i + 1}`}
            onChange={(e) => update(i, e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`Remove option ${i + 1}`}
            disabled={options.length <= 2}
            onClick={() => onChange(options.filter((_, idx) => idx !== i))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {options.length < LIMITS.maxOptions && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange([...options, `Option ${options.length + 1}`])}
        >
          <Plus className="h-4 w-4" /> Add option
        </Button>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
