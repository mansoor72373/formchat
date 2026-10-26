import { Field } from '@/components/ui/Field';
import { Input, Textarea } from '@/components/ui/Input';

interface DetailsFieldsProps {
  title: string;
  description: string;
  errors: Record<string, string>;
  onChange: (field: 'title' | 'description', value: string) => void;
}

export function DetailsFields({ title, description, errors, onChange }: DetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <Field label="Form title" htmlFor="form-title" error={errors.title}>
        <Input
          id="form-title"
          value={title}
          invalid={!!errors.title}
          placeholder="e.g. Customer feedback"
          onChange={(e) => onChange('title', e.target.value)}
        />
      </Field>
      <Field
        label="Description"
        htmlFor="form-description"
        hint="Optional. Only you see this in the dashboard."
        error={errors.description}
      >
        <Textarea
          id="form-description"
          rows={2}
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </Field>
    </div>
  );
}
