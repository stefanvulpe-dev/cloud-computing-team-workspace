export type ApiResponse<T> = {
  value?: T;
  isSuccess: boolean;
  message: string;
  validationErrors: Record<string, string[]>;
};
