export interface CommonResponse<T = unknown> {
  data: T;
}

export interface CommonError {
  message: string;
}
