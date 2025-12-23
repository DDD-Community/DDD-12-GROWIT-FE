import { apiClient } from '@/shared/lib/apiClient';
import { GrorongAdviceResponse } from './type';

export async function getGrorongAdvice() {
  const response = await apiClient.get<GrorongAdviceResponse>('/advice/grorong ');
  return response.data.data;
}
