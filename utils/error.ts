import * as Sentry from '@sentry/nextjs';

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleApiError = (error: unknown, defaultMessage = 'Unexpected error') => {
  const apiError = error instanceof ApiError ? error : new ApiError(defaultMessage);
  Sentry.captureException(error);
  return apiError;
};

