import { apiClient } from '@/shared/lib/apiClient';
import { Analysis } from './type';

interface GoalRetrospectResponse {
  data: {
    id: string;
    goalId: string;
    todoCompletedRate: number;
    analysis: Analysis;
    content: string;
  };
}

export const getGoalRetrosepctById = async (id: string) => {
  try {
    const response = await apiClient.get<GoalRetrospectResponse>(`/goal-retrospects/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
