'use client';

import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { DEFAULT_FORM_SETTINGS } from '@/config/constants';
import type { FormDTO, FormSettings, Question, QuestionType } from '@/types/form';

export interface BuilderState {
  title: string;
  description: string;
  questions: Question[];
  settings: FormSettings;
}

type Action =
  | { type: 'set_field'; field: 'title' | 'description'; value: string }
  | { type: 'set_settings'; patch: Partial<FormSettings> }
  | { type: 'add_question'; questionType: QuestionType }
  | { type: 'update_question'; id: string; patch: Partial<Question> }
  | { type: 'remove_question'; id: string }
  | { type: 'move_question'; id: string; direction: -1 | 1 }
  | { type: 'replace'; state: BuilderState };

export function createQuestion(type: QuestionType): Question {
  return {
    id: nanoid(8),
    type,
    label: '',
    required: true,
    options: type === 'multiple_choice' ? ['Option 1', 'Option 2'] : undefined,
  };
}

function reducer(state: BuilderState, action: Action): BuilderState {
  switch (action.type) {
    case 'set_field':
      return { ...state, [action.field]: action.value };
    case 'set_settings':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'add_question':
      return { ...state, questions: [...state.questions, createQuestion(action.questionType)] };
    case 'update_question':
      return {
        ...state,
        questions: state.questions.map((q) => (q.id === action.id ? { ...q, ...action.patch } : q)),
      };
    case 'remove_question':
      return { ...state, questions: state.questions.filter((q) => q.id !== action.id) };
    case 'move_question': {
      const from = state.questions.findIndex((q) => q.id === action.id);
      const to = from + action.direction;
      if (from < 0 || to < 0 || to >= state.questions.length) return state;
      const questions = [...state.questions];
      const [moved] = questions.splice(from, 1);
      questions.splice(to, 0, moved!);
      return { ...state, questions };
    }
    case 'replace':
      return action.state;
  }
}

export const stateFromForm = (form?: FormDTO): BuilderState => ({
  title: form?.title ?? '',
  description: form?.description ?? '',
  questions: form?.questions ?? [],
  settings: form?.settings ?? { ...DEFAULT_FORM_SETTINGS },
});

export function useFormBuilder(initial?: FormDTO) {
  const [state, dispatch] = useReducer(reducer, initial, stateFromForm);

  return {
    state,
    setField: (field: 'title' | 'description', value: string) =>
      dispatch({ type: 'set_field', field, value }),
    setSettings: (patch: Partial<FormSettings>) => dispatch({ type: 'set_settings', patch }),
    addQuestion: (questionType: QuestionType) => dispatch({ type: 'add_question', questionType }),
    updateQuestion: (id: string, patch: Partial<Question>) =>
      dispatch({ type: 'update_question', id, patch }),
    removeQuestion: (id: string) => dispatch({ type: 'remove_question', id }),
    moveQuestion: (id: string, direction: -1 | 1) =>
      dispatch({ type: 'move_question', id, direction }),
    replace: (next: BuilderState) => dispatch({ type: 'replace', state: next }),
  };
}
