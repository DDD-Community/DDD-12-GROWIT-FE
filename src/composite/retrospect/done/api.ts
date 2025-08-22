import { apiClient } from '@/shared/lib/apiClient';
import { CompletedGoal } from './type';

interface CompletedGoalsResponse {
  data: CompletedGoal[];
}

export const getCompletedRetrospects = async (year: number) => {
  try {
    const response = await apiClient.get<CompletedGoalsResponse>(`/goal-retrospects?year=${year}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching completed retrospects:', error);
    throw error;
  }
};
