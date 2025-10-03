import { apiClient } from '@/shared/lib/apiClient';
import { GoalRecommendationResponse } from '@/feature/goal/weeklyGoalBoard/type';
import { CommonResponse } from '@/shared/type/response';

export const getAIGoalRecommendation = async (goalId: string, planId: string) => {
  try {
    const { data } = await apiClient.get<GoalRecommendationResponse>(`goals/${goalId}/plans/${planId}/recommendation `);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putWeelyGoalContent = async (goalId: string, planId: string, content: string) => {
  try {
    const { data } = await apiClient.put<CommonResponse<string>>(
      `goals/me/updatePlan?goalId=${goalId}&planId=${planId}`,
      {
        content,
      }
    );
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
