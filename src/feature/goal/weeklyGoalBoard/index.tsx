import { useAIMentorAdvice } from '@/model/aiMentor/context';
import { GoalRecommendationRequest } from './GoalRecommendationRequest';
// 무료 버전에서 쓰이는 기존 주간플랜 조회와 주간 목표 추가 모달을 띄워주는 컴포넌트 현재는 사용되지 않음
//import { AddPlanModal } from '@/feature/plan/addPlanModal';
import { AIRecommendation } from './AIRecommendation';
import { useGoalSelector } from '@/model/goal/context';
import { useWeeklyGoalRecommendationByAI } from './hooks';

interface WeeklyGoalBoardProps {
  goalId: string;
  planId: string;
  selectedWeekIndex: number;
  selectedPlanContent: string;
  onSuccessAddPlan: () => void;
}
export const WeeklyGoalBoard = ({ goalId, planId, selectedWeekIndex, selectedPlanContent }: WeeklyGoalBoardProps) => {
  const { currentGoal } = useGoalSelector();
  const { aiMentorAdvice } = useAIMentorAdvice();
  const aiMentor = currentGoal?.mentor;
  const { recommendedGoal, getWeeklyGoalRecommendationByAI, isGoalRecommendationChecked } =
    useWeeklyGoalRecommendationByAI({
      goalId,
      planId,
      isRecommendationChecked: aiMentorAdvice?.isChecked || false,
    });

  // 이번주 AI 목표 추천을 확인하지 않았을 경우
  if (!isGoalRecommendationChecked && aiMentor) {
    return (
      <GoalRecommendationRequest
        aiMentor={aiMentor}
        planId={planId}
        goalId={goalId}
        getWeeklyGoalRecommendationByAI={getWeeklyGoalRecommendationByAI}
      />
    );
  } else if (isGoalRecommendationChecked && aiMentor) {
    return (
      <AIRecommendation aiMentor={aiMentor} recommendedGoal={recommendedGoal} selectedWeekIndex={selectedWeekIndex} />
    );
  } else {
    return <></>;
  }
};
