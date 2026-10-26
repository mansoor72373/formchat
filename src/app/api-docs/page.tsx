import type { Metadata } from 'next';
import { SwaggerUI } from '@/components/docs/SwaggerUI';

export const metadata: Metadata = { title: 'API documentation' };

export default function ApiDocsPage() {
  return <SwaggerUI specUrl="/api/v1/openapi" />;
}
