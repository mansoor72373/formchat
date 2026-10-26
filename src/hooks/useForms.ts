'use client';

import useSWR, { mutate } from 'swr';
import { apiRequest } from '@/lib/api/client';
import { formsApi } from '@/lib/api/endpoints';
import type { FormDTO, FormSummaryDTO, StatsDTO } from '@/types/form';

const fetcher = <T>(path: string) => apiRequest<T>(path).then((r) => r.data);

export const useForms = () => useSWR<FormSummaryDTO[]>('/forms', fetcher);
export const useStats = () => useSWR<StatsDTO>('/forms/stats', fetcher);
export const useForm = (id: string) => useSWR<FormDTO>(`/forms/${id}`, fetcher);

export const useResponses = (id: string, page: number) =>
  useSWR(`/forms/${id}/responses?page=${page}`, () => formsApi.responses(id, page));

/** Revalidate every cached /forms* request (list, stats, single form, responses). */
export const refreshForms = () =>
  mutate((key) => typeof key === 'string' && key.startsWith('/forms'));
