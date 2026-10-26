import {
  formDto,
  formSummaryDto,
  paginationMetaDto,
  responseDto,
  statsDto,
} from '@/schemas/dto.schema';
import {
  createFormSchema,
  formStatusSchema,
  idParamSchema,
  paginationSchema,
  updateFormSchema,
} from '@/schemas/form.schema';
import { z } from '../zod';
import { commonErrors, envelope, errorResponse, json, registry, secured } from '../registry';

const body = <T extends z.ZodTypeAny>(schema: T) => ({
  content: { 'application/json': { schema } },
});

registry.registerPath({
  method: 'get',
  path: '/forms',
  tags: ['Forms'],
  summary: 'List your forms',
  security: secured,
  responses: { 200: json(envelope(z.array(formSummaryDto)), 'Forms'), 401: commonErrors[401] },
});

registry.registerPath({
  method: 'post',
  path: '/forms',
  tags: ['Forms'],
  summary: 'Create a form (starts as a draft)',
  security: secured,
  request: { body: body(createFormSchema) },
  responses: {
    201: json(envelope(formDto), 'Form created'),
    401: commonErrors[401],
    422: commonErrors[422],
  },
});

registry.registerPath({
  method: 'get',
  path: '/forms/stats',
  tags: ['Forms'],
  summary: 'Dashboard totals',
  security: secured,
  responses: { 200: json(envelope(statsDto), 'Totals'), 401: commonErrors[401] },
});

registry.registerPath({
  method: 'get',
  path: '/forms/{id}',
  tags: ['Forms'],
  summary: 'Get a form',
  security: secured,
  request: { params: idParamSchema },
  responses: {
    200: json(envelope(formDto), 'Form'),
    401: commonErrors[401],
    404: commonErrors[404],
  },
});

registry.registerPath({
  method: 'patch',
  path: '/forms/{id}',
  tags: ['Forms'],
  summary: 'Update a form (partial)',
  security: secured,
  request: { params: idParamSchema, body: body(updateFormSchema) },
  responses: {
    200: json(envelope(formDto), 'Updated form'),
    401: commonErrors[401],
    404: commonErrors[404],
    422: commonErrors[422],
  },
});

registry.registerPath({
  method: 'delete',
  path: '/forms/{id}',
  tags: ['Forms'],
  summary: 'Delete a form and its responses',
  security: secured,
  request: { params: idParamSchema },
  responses: { 204: { description: 'Deleted' }, 401: commonErrors[401], 404: commonErrors[404] },
});

registry.registerPath({
  method: 'patch',
  path: '/forms/{id}/status',
  tags: ['Forms'],
  summary: 'Publish or unpublish a form',
  description: 'A form needs at least one question before it can be published.',
  security: secured,
  request: { params: idParamSchema, body: body(formStatusSchema) },
  responses: {
    200: json(envelope(formDto), 'Form with new status'),
    401: commonErrors[401],
    404: commonErrors[404],
    422: errorResponse('Form has no questions'),
  },
});

registry.registerPath({
  method: 'get',
  path: '/forms/{id}/responses',
  tags: ['Responses'],
  summary: 'List submissions for a form (newest first)',
  security: secured,
  request: { params: idParamSchema, query: paginationSchema },
  responses: {
    200: json(envelope(z.array(responseDto), paginationMetaDto), 'Submissions'),
    401: commonErrors[401],
    404: commonErrors[404],
  },
});
