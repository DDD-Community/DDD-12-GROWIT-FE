import { apiClient } from '@/shared/lib/apiClient';
import { CompletedGoals } from './type';

interface CompletedGoalsResponse {
  data: CompletedGoals[];
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
