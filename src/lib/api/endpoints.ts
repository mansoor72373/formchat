import type {
  Answers,
  FormDTO,
  FormInput,
  FormStatus,
  PaginationMeta,
  ResponseDTO,
  UserDTO,
} from '@/types/form';
import { apiRequest } from './client';

export const authApi = {
  register: (input: { name: string; email: string; password: string }) =>
    apiRequest<UserDTO>('/auth/register', { method: 'POST', json: input }).then((r) => r.data),
  login: (input: { email: string; password: string }) =>
    apiRequest<UserDTO>('/auth/login', { method: 'POST', json: input }).then((r) => r.data),
  logout: () => apiRequest<void>('/auth/logout', { method: 'POST' }),
};

export const formsApi = {
  create: (input: FormInput) =>
    apiRequest<FormDTO>('/forms', { method: 'POST', json: input }).then((r) => r.data),
  update: (id: string, input: Partial<FormInput>) =>
    apiRequest<FormDTO>(`/forms/${id}`, { method: 'PATCH', json: input }).then((r) => r.data),
  setStatus: (id: string, status: FormStatus) =>
    apiRequest<FormDTO>(`/forms/${id}/status`, { method: 'PATCH', json: { status } }).then(
      (r) => r.data,
    ),
  remove: (id: string) => apiRequest<void>(`/forms/${id}`, { method: 'DELETE' }),
  responses: (id: string, page: number) =>
    apiRequest<ResponseDTO[], PaginationMeta>(`/forms/${id}/responses?page=${page}`),
};

export const publicApi = {
  submit: (slug: string, answers: Answers) =>
    apiRequest<{ id: string; submittedAt: string }>(`/public/forms/${slug}/responses`, {
      method: 'POST',
      json: { answers },
    }),
};
