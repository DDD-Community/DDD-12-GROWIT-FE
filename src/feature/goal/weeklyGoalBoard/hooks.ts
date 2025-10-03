import { useEffect, useState } from 'react';
import { getAIGoalRecommendation, putWeelyGoalContent } from './api';

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
      getAndPutWeeklyGoalRecommendationByAI(goalId, planId);
    }
  }, [isRecommendationChecked]);

  const getAndPutWeeklyGoalRecommendationByAI = async (goalId: string, planId: string) => {
    setIsLoading(true);
    try {
      const data = await getAIGoalRecommendation(goalId, planId);
      setIsSuccess(true);
      setRecommendedGoal(data);
      setIsGoalRecommendationChecked(true);
      await updateWeeklyGoalContent(goalId, planId, data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWeeklyGoalContent = async (goalId: string, planId: string, content: string) => {
    try {
      await putWeelyGoalContent(goalId, planId, content);
    } catch (error) {
      console.error(error);
    }
  };

  return { isLoading, isSuccess, recommendedGoal, isGoalRecommendationChecked, getAndPutWeeklyGoalRecommendationByAI };
};
