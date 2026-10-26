import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicChat } from '@/components/chatbot/PublicChat';
import { getPublishedFormBySlug } from '@/services/form.service';

interface Props {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getPublishedFormBySlug(params.slug);
  return { title: form?.title ?? 'Form not found' };
}

export default async function PublicFormPage({ params }: Props) {
  const form = await getPublishedFormBySlug(params.slug);
  if (!form) notFound();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper p-0 sm:p-6">
      <div className="w-full max-w-lg">
        <PublicChat form={form} variant="card" />
      </div>
    </main>
  );
}
