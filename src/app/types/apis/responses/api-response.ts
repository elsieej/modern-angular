export interface ApiResponse<TData> {
  data: TData;
  statusCode: number;
  message: string;
  errors: string;
}

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';
