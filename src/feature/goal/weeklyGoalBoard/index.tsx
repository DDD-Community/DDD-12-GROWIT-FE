import { useAIMentorAdvice } from '@/model/aiMentor/context';
import { GoalRecommendationRequest } from './GoalRecommendationRequest';
import { AIRecommendation } from './AIRecommendation';
import { useGoalSelector } from '@/model/goal/context';
import { useWeeklyGoalRecommendationByAI } from './hooks';

interface WeeklyGoalBoardProps {
  goalId: string;
  planId: string;
  selectedWeekIndex: number;
  selectedPlanContent: string;
  onSuccessAddPlan: () => void;
  refetchGoal: () => void;
}
export const WeeklyGoalBoard = ({
  goalId,
  planId,
  selectedWeekIndex,
  selectedPlanContent,
  onSuccessAddPlan,
  refetchGoal,
}: WeeklyGoalBoardProps) => {
  const { currentGoal } = useGoalSelector();
  const { aiMentorAdvice } = useAIMentorAdvice();
  const { getAndPutWeeklyGoalRecommendationByAI } = useWeeklyGoalRecommendationByAI({
    goalId,
    planId,
    isRecommendationChecked: aiMentorAdvice?.isChecked || false,
  });

  const aiMentor = currentGoal?.mentor;
  const isPlanContentExist = selectedPlanContent !== '' && selectedPlanContent !== undefined;

  // 이번주 AI 목표 추천을 확인하지 않았을 경우
  if (aiMentor && !isPlanContentExist) {
    return (
      <GoalRecommendationRequest
        aiMentor={aiMentor}
        planId={planId}
        goalId={goalId}
        getAndPutWeeklyGoalRecommendationByAI={getAndPutWeeklyGoalRecommendationByAI}
        refetchGoal={refetchGoal}
      />
    );
  } else if (aiMentor && isPlanContentExist) {
    return (
      <AIRecommendation
        aiMentor={aiMentor}
        selectedWeekIndex={selectedWeekIndex}
        selectedPlanContent={selectedPlanContent}
        onSuccessAddPlan={onSuccessAddPlan}
        goalId={goalId}
        planId={planId}
      />
    );
  } else {
    return <></>;
  }
};
