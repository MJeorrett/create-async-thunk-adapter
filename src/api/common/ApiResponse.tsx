export interface ApiErrorResponse {
  isError: true,
  errorMessage: string,
}

export interface ApiSuccessResponse<T> {
  isError: false,
  content: T,
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;

export interface NoContentApiResponse {
  isError: boolean,
  errorMessage?: string,
}