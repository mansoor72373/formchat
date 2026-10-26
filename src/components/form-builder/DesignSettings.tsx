import { Field } from '@/components/ui/Field';
import { Input, Textarea } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';
import type { FormSettings } from '@/types/form';

const PRESETS = ['#157b6c', '#2563eb', '#7c3aed', '#db2777', '#ea580c', '#1f2937'];

interface DesignSettingsProps {
  settings: FormSettings;
  errors: Record<string, string>;
  onChange: (patch: Partial<FormSettings>) => void;
}

export function DesignSettings({ settings, errors, onChange }: DesignSettingsProps) {
  return (
    <div className="space-y-5">
      <Field label="Widget colour" htmlFor="primary-color" error={errors['settings.primaryColor']}>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Use colour ${color}`}
              onClick={() => onChange({ primaryColor: color })}
              style={{ backgroundColor: color }}
              className={cn(
                'h-8 w-8 rounded-full ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                settings.primaryColor.toLowerCase() === color && 'ring-2 ring-ink',
              )}
            />
          ))}
          <Input
            id="primary-color"
            className="w-28 font-mono"
            value={settings.primaryColor}
            onChange={(e) => onChange({ primaryColor: e.target.value })}
          />
        </div>
      </Field>

      <Field label="Chatbot name" htmlFor="bot-name" error={errors['settings.botName']}>
        <Input
          id="bot-name"
          value={settings.botName}
          maxLength={40}
          onChange={(e) => onChange({ botName: e.target.value })}
        />
      </Field>

      <Field label="Welcome message" htmlFor="welcome" error={errors['settings.welcomeMessage']}>
        <Textarea
          id="welcome"
          rows={2}
          value={settings.welcomeMessage}
          onChange={(e) => onChange({ welcomeMessage: e.target.value })}
        />
      </Field>

      <Field
        label="Completion message"
        htmlFor="completion"
        error={errors['settings.completionMessage']}
      >
        <Textarea
          id="completion"
          rows={2}
          value={settings.completionMessage}
          onChange={(e) => onChange({ completionMessage: e.target.value })}
        />
      </Field>
    </div>
  );
}
