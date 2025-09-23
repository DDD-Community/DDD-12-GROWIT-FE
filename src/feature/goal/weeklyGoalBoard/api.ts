import { apiClient } from '@/shared/lib/apiClient';
import { GoalRecommendationResponse } from '@/feature/goal/weeklyGoalBoard/type';

export const getGoalRecommendation = async (goalId: string, planId: string) => {
  try {
    const { data } = await apiClient.get<GoalRecommendationResponse>(`goals/${goalId}/plans/${planId}/recommendation `);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
