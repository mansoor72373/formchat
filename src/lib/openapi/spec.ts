import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { siteConfig } from '@/config/site';
import './paths/auth';
import './paths/forms';
import './paths/public';
import { registry } from './registry';

export function buildOpenApiDocument() {
  return new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: '3.0.3',
    info: {
      title: `${siteConfig.name} API`,
      version: '1.0.0',
      description:
        'REST API for forms, publishing and responses. Successful responses use `{ success: true, data, meta? }`; errors use `{ success: false, error: { code, message, details? } }`.',
    },
    servers: [{ url: '/api/v1' }],
    tags: [{ name: 'Auth' }, { name: 'Forms' }, { name: 'Responses' }, { name: 'Public' }],
  });
}
