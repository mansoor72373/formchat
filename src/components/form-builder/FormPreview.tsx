'use client';

import { ChatWidget } from '@/components/chatbot/ChatWidget';
import type { BuilderState } from '@/hooks/useFormBuilder';

/** Runs the real chatbot against the unsaved draft. Submissions are discarded. */
export function FormPreview({ state }: { state: BuilderState }) {
  // Re-mount the chat whenever the draft changes so the preview is always current.
  const key = JSON.stringify(state);

  return (
    <div className="mx-auto max-w-md space-y-3">
      <p className="text-center text-sm text-ink-muted">
        This is exactly what visitors will see. Nothing you answer here is saved.
      </p>
      <ChatWidget
        key={key}
        form={{
          title: state.title || 'Untitled form',
          questions: state.questions,
          settings: state.settings,
        }}
        onSubmit={() => new Promise((resolve) => setTimeout(resolve, 400))}
        allowRestart
      />
    </div>
  );
}
