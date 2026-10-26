import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { userDto } from '@/schemas/dto.schema';
import { commonErrors, envelope, errorResponse, json, registry, secured } from '../registry';

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: 'Create an account and start a session',
  request: { body: { content: { 'application/json': { schema: registerSchema } } } },
  responses: {
    201: json(envelope(userDto), 'Account created'),
    409: errorResponse('Email already registered'),
    422: commonErrors[422],
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'Log in and start a session',
  request: { body: { content: { 'application/json': { schema: loginSchema } } } },
  responses: {
    200: json(envelope(userDto), 'Logged in'),
    401: errorResponse('Incorrect email or password'),
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/logout',
  tags: ['Auth'],
  summary: 'End the current session',
  responses: { 204: { description: 'Logged out' } },
});

registry.registerPath({
  method: 'get',
  path: '/auth/me',
  tags: ['Auth'],
  summary: 'Get the current user',
  security: secured,
  responses: { 200: json(envelope(userDto), 'Current user'), 401: commonErrors[401] },
});
