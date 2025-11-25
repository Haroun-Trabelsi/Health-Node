export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta?: {
    total: number;
    page?: number;
    pageSize?: number;
  };
}

export const buildSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message
});

export const buildErrorResponse = (message: string): ApiResponse<null> => ({
  success: false,
  error: message
});

