import { publicFormDto, responseDto } from '@/schemas/dto.schema';
import { slugParamSchema } from '@/schemas/form.schema';
import { submitResponseSchema } from '@/schemas/response.schema';
import { commonErrors, envelope, json, registry } from '../registry';

registry.registerPath({
  method: 'get',
  path: '/public/forms/{slug}',
  tags: ['Public'],
  summary: 'Get a published form (used by the chatbot widget)',
  request: { params: slugParamSchema },
  responses: { 200: json(envelope(publicFormDto), 'Published form'), 404: commonErrors[404] },
});

registry.registerPath({
  method: 'post',
  path: '/public/forms/{slug}/responses',
  tags: ['Public'],
  summary: 'Submit answers to a published form',
  description: 'Answers are validated against the form’s questions. Keys are question ids.',
  request: {
    params: slugParamSchema,
    body: { content: { 'application/json': { schema: submitResponseSchema } } },
  },
  responses: {
    201: json(envelope(responseDto.pick({ id: true, submittedAt: true })), 'Response saved'),
    404: commonErrors[404],
    422: commonErrors[422],
  },
});
