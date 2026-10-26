import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResponsesView } from '@/components/responses/ResponsesView';
import { idParamSchema } from '@/schemas/form.schema';

export const metadata: Metadata = { title: 'Responses' };

export default function ResponsesPage({ params }: { params: { id: string } }) {
  const parsed = idParamSchema.safeParse(params);
  if (!parsed.success) notFound();
  return <ResponsesView formId={parsed.data.id} />;
}
