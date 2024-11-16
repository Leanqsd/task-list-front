export interface ApiResponseModel<T> {
    data: T;
    message: string;
    success: boolean;
  }
  