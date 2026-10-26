import { EmptyState } from '@/components/ui/EmptyState';
import type { Question, QuestionType } from '@/types/form';
import { AddQuestionMenu } from './AddQuestionMenu';
import { QuestionCard } from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
  errors: Record<string, string>;
  onAdd: (type: QuestionType) => void;
  onChange: (id: string, patch: Partial<Question>) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
}

export function QuestionList({
  questions,
  errors,
  onAdd,
  onChange,
  onMove,
  onRemove,
}: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.length === 0 ? (
        <EmptyState
          title="No questions yet"
          description="Choose a question type below to get started."
        />
      ) : (
        questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            total={questions.length}
            errors={errors}
            onChange={(patch) => onChange(q.id, patch)}
            onMove={(dir) => onMove(q.id, dir)}
            onRemove={() => onRemove(q.id)}
          />
        ))
      )}
      <AddQuestionMenu onAdd={onAdd} />
    </div>
  );
}
