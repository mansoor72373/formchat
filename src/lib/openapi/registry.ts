import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { SESSION_COOKIE } from '@/config/constants';
import { z } from './zod';

export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'cookieAuth', {
  type: 'apiKey',
  in: 'cookie',
  name: SESSION_COOKIE,
  description: 'Session cookie set by POST /auth/login or /auth/register.',
});

export const secured = [{ cookieAuth: [] }];

const errorSchema = registry.register(
  'ApiError',
  z.object({
    success: z.literal(false),
    error: z.object({
      code: z.string(),
      message: z.string(),
      details: z.array(z.object({ path: z.string(), message: z.string() })).optional(),
    }),
  }),
);

export const json = <T extends z.ZodTypeAny>(schema: T, description: string) => ({
  description,
  content: { 'application/json': { schema } },
});

/** Success envelope: { success: true, data, meta? } */
export const envelope = <T extends z.ZodTypeAny>(data: T, meta?: z.ZodTypeAny) =>
  z.object({ success: z.literal(true), data, ...(meta ? { meta } : {}) });

export const errorResponse = (description: string) => json(errorSchema, description);

export const commonErrors = {
  401: errorResponse('Not authenticated'),
  404: errorResponse('Not found'),
  422: errorResponse('Validation failed'),
};
