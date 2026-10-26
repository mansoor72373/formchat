'use client';

import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { useFormBuilder } from '@/hooks/useFormBuilder';
import { useSaveForm } from '@/hooks/useSaveForm';
import type { FormDTO } from '@/types/form';
import { BuilderTabs, type BuilderTab } from './BuilderTabs';
import { BuilderToolbar } from './BuilderToolbar';
import { DesignSettings } from './DesignSettings';
import { DetailsFields } from './DetailsFields';
import { FormPreview } from './FormPreview';
import { QuestionList } from './QuestionList';
import { SharePanel } from './SharePanel';

/** Orchestrates the builder; every visual concern lives in a child component. */
export function FormBuilder({ initialForm }: { initialForm?: FormDTO }) {
  const builder = useFormBuilder(initialForm);
  const persistence = useSaveForm(initialForm);
  const [tab, setTab] = useState<BuilderTab>('build');
  const { state } = builder;
  const { form, fieldErrors } = persistence;

  return (
    <div className="space-y-5 sm:space-y-6">
      <BuilderToolbar
        status={form?.status}
        saving={persistence.saving}
        justSaved={persistence.savedAt !== null}
        onSave={() => persistence.save(state)}
        onTogglePublish={() => persistence.setPublished(state, form?.status !== 'published')}
      />
      {persistence.error && <Alert>{persistence.error}</Alert>}

      <BuilderTabs active={tab} onChange={setTab} />

      <Card className="min-h-[24rem] p-4 sm:p-7">
        {tab === 'build' && (
          <div className="space-y-8">
            <DetailsFields
              title={state.title}
              description={state.description}
              errors={fieldErrors}
              onChange={builder.setField}
            />
            <QuestionList
              questions={state.questions}
              errors={fieldErrors}
              onAdd={builder.addQuestion}
              onChange={builder.updateQuestion}
              onMove={builder.moveQuestion}
              onRemove={builder.removeQuestion}
            />
          </div>
        )}
        {tab === 'design' && (
          <DesignSettings
            settings={state.settings}
            errors={fieldErrors}
            onChange={builder.setSettings}
          />
        )}
        {tab === 'preview' && <FormPreview state={state} />}
        {tab === 'share' && <SharePanel form={form} />}
      </Card>
    </div>
  );
}
