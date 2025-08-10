import { apiClient } from '@/shared/lib/apiClient';

interface Goal {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
}

export interface CompletedRetrospects {
  id: string;
  isCompleted: boolean;
  goal: Goal;
}

export const getCompletedRetrospects = async (year: number) => {
  try {
    const response = await apiClient.get<CompletedRetrospects[]>(`/goal-retrospects?year=${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching completed retrospects:', error);
    throw error;
  }
};
