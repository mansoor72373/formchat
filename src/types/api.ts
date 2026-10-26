export interface ApiSuccess<T, M = undefined> {
  success: true;
  data: T;
  meta?: M;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: { path: string; message: string }[];
  };
}
