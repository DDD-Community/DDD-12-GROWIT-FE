import { apiClient } from '@/shared/lib/apiClient';
import { GrorongAdviceResponse } from './type';

export async function getGrorongAdvice() {
  try {
    const response = await apiClient.get<GrorongAdviceResponse>('/advice/grorong');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch grorong advice:', error);
    throw new Error('그로롱 조언 조회에 실패했습니다.');
  }
}
