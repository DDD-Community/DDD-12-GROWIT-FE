import { useEffect, useState } from 'react';
import { getAIGoalRecommendation } from './api';

interface UseWeeklyGoalRecommendationByAIProps {
  goalId: string;
  planId: string;
  isRecommendationChecked: boolean;
}
export const useWeeklyGoalRecommendationByAI = ({
  goalId,
  planId,
  isRecommendationChecked,
}: UseWeeklyGoalRecommendationByAIProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGoalRecommendationChecked, setIsGoalRecommendationChecked] = useState(isRecommendationChecked);
  const [recommendedGoal, setRecommendedGoal] = useState<string>('');

  useEffect(() => {
    if (isRecommendationChecked) {
      getWeeklyGoalRecommendationByAI(goalId, planId);
    }
  }, [isRecommendationChecked]);

  const getWeeklyGoalRecommendationByAI = async (goalId: string, planId: string) => {
    setIsLoading(true);
    try {
      const data = await getAIGoalRecommendation(goalId, planId);
      setIsSuccess(true);
      setRecommendedGoal(data);
      setIsGoalRecommendationChecked(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, recommendedGoal, isGoalRecommendationChecked, getWeeklyGoalRecommendationByAI };
};
