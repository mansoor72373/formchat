import { Plus } from 'lucide-react';
import { QUESTION_TYPES } from '@/config/constants';
import { QUESTION_TYPE_META } from '@/config/question-types';
import type { QuestionType } from '@/types/form';

export function AddQuestionMenu({ onAdd }: { onAdd: (type: QuestionType) => void }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">Add a question</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {QUESTION_TYPES.map((type) => {
          const { label, icon: Icon } = QUESTION_TYPE_META[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => onAdd(type)}
              className="flex items-center gap-2 rounded-lg border border-dashed border-paper-line bg-paper-raised px-3 py-2.5 text-left text-sm text-ink-soft transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <Plus className="h-4 w-4 shrink-0 text-brand-600" />
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
