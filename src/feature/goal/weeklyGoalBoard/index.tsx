import { GoalRecommendationRequest } from './GoalRecommendationRequest';
import { AddPlanModal } from '@/feature/plan/addPlanModal';

interface WeeklyGoalBoardProps {
  goalId: string;
  planId: string;
  selectedWeekIndex: number;
  selectedPlanContent: string;
  onSuccessAddPlan: () => void;
}
export const WeeklyGoalBoard = ({
  goalId,
  planId,
  selectedWeekIndex,
  selectedPlanContent,
  onSuccessAddPlan,
}: WeeklyGoalBoardProps) => {
  const gotGoalRecommendation = true;

  // 이번주 AI 목표 추천을 받았을 경우
  if (gotGoalRecommendation) {
    return <GoalRecommendationRequest goalId={goalId} planId={planId} />;
  } else {
    return (
      <AddPlanModal
        goalId={goalId}
        planId={planId}
        onSuccessAddPlan={onSuccessAddPlan}
        selectedPlanIndex={selectedWeekIndex}
        selectedPlanContent={selectedPlanContent}
      />
    );
  }
};
