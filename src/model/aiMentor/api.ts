import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

export interface AIMentorAdvice {
  isChecked: boolean;
  message: string;
  kpt: {
    keep: string;
    problem: string;
    tryNext: string;
  };
}

export interface AIMentorAdviceResponse extends CommonResponse<AIMentorAdvice> {}

export async function getAIMentorAdvice() {
  const response = await apiClient.get<AIMentorAdviceResponse>('/advice/mentor');
  return response.data.data;
}
