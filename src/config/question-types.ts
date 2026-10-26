import { ListChecks, Mail, ToggleLeft, Type, type LucideIcon } from 'lucide-react';
import type { QuestionType } from '@/types/form';

export const QUESTION_TYPE_META: Record<
  QuestionType,
  { label: string; description: string; icon: LucideIcon }
> = {
  text: { label: 'Short text', description: 'Free-form answer', icon: Type },
  email: { label: 'Email', description: 'Validated email address', icon: Mail },
  multiple_choice: { label: 'Multiple choice', description: 'Pick one option', icon: ListChecks },
  yes_no: { label: 'Yes / No', description: 'Two answer buttons', icon: ToggleLeft },
};
