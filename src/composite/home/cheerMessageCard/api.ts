import { apiClient } from '@/shared/lib/apiClient';
import { GrorongAdviceResponse, AIMentorAdviceResponse } from './type';

export async function getGrorongAdvice() {
  const response = await apiClient.get<GrorongAdviceResponse>('/advice/grorong ');
  return response.data.data;
}

export async function getAIMentorAdvice() {
  const response = await apiClient.get<AIMentorAdviceResponse>('/advice/mentor');
  return response.data.data;
}
