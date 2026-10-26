import type { ApiErrorBody, ApiSuccess } from '@/types/api';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details: { path: string; message: string }[] = [],
  ) {
    super(message);
    this.name = 'ApiClientError';
  }

  /** Map of `questions.0.label` -> message, handy for showing errors next to fields. */
  get fieldErrors() {
    return Object.fromEntries(this.details.map((d) => [d.path, d.message]));
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  json?: unknown;
}

export async function apiRequest<T, M = undefined>(
  path: string,
  { json, headers, ...init }: RequestOptions = {},
): Promise<ApiSuccess<T, M>> {
  const res = await fetch(`/api/v1${path}`, {
    ...init,
    headers: { ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: json !== undefined ? JSON.stringify(json) : undefined,
    credentials: 'same-origin',
  });

  if (res.status === 204) return { success: true, data: undefined as T };

  const body = (await res.json().catch(() => null)) as ApiSuccess<T, M> | ApiErrorBody | null;
  if (!res.ok || !body || !body.success) {
    const err = body && !body.success ? body.error : null;
    throw new ApiClientError(
      err?.message ?? 'Something went wrong. Please try again.',
      res.status,
      err?.code ?? 'UNKNOWN',
      err?.details,
    );
  }
  return body;
}
