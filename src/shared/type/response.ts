export interface CommonResponse<T> {
  data: T;
}

export interface CommonError {
  message: string;
}
