export interface ErrorDetail {
  path: string;
  message: string;
}

export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: ErrorDetail[],
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const Errors = {
  unauthorized: (message = 'Authentication required') => new AppError(401, 'UNAUTHORIZED', message),
  notFound: (resource = 'Resource') => new AppError(404, 'NOT_FOUND', `${resource} not found`),
  conflict: (message: string) => new AppError(409, 'CONFLICT', message),
  validation: (details: ErrorDetail[], message = 'Validation failed') =>
    new AppError(422, 'VALIDATION_ERROR', message, details),
  badRequest: (message: string) => new AppError(400, 'BAD_REQUEST', message),
  tooManyRequests: () =>
    new AppError(429, 'RATE_LIMITED', 'Too many requests. Please try again shortly.'),
};
