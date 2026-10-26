import { notFound } from 'next/navigation';
import { PublicChat } from '@/components/chatbot/PublicChat';
import { getPublishedFormBySlug } from '@/services/form.service';

export const dynamic = 'force-dynamic';

/** Rendered inside the iframe created by /widget.js */
export default async function EmbedPage({ params }: { params: { slug: string } }) {
  const form = await getPublishedFormBySlug(params.slug);
  if (!form) notFound();
  return <PublicChat form={form} variant="embedded" />;
}
