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
  try {
    const response = await apiClient.get<AIMentorAdviceResponse>('/advice/mentor');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch ai mentor advice:', error);
    throw new Error('AI 멘토 조언 조회에 실패했습니다.');
  }
}
