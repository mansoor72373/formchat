import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { QUESTION_TYPE_META } from '@/config/question-types';
import type { Question } from '@/types/form';
import { OptionsEditor } from './OptionsEditor';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  errors: Record<string, string>;
  onChange: (patch: Partial<Question>) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}

export function QuestionCard({
  question,
  index,
  total,
  errors,
  onChange,
  onMove,
  onRemove,
}: QuestionCardProps) {
  const { label, icon: Icon } = QUESTION_TYPE_META[question.type];
  const key = (field: string) => errors[`questions.${index}.${field}`];
  const inputId = `question-${question.id}`;

  return (
    <Card className="p-4 shadow-none sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-ink-soft">
          <Icon className="h-4 w-4" />
          {index + 1}. {label}
        </span>
        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Move question up"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Move question down"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Delete question"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>

      <label htmlFor={inputId} className="sr-only">
        Question text
      </label>
      <Input
        id={inputId}
        value={question.label}
        invalid={!!key('label')}
        placeholder="Type your question…"
        onChange={(e) => onChange({ label: e.target.value })}
      />
      {key('label') && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {key('label')}
        </p>
      )}

      {question.type === 'multiple_choice' && (
        <div className="mt-4">
          <OptionsEditor
            options={question.options ?? []}
            error={key('options')}
            onChange={(options) => onChange({ options })}
          />
        </div>
      )}

      <div className="mt-4">
        <Switch
          label="Required"
          checked={question.required}
          onChange={(required) => onChange({ required })}
        />
      </div>
    </Card>
  );
}
