import Button from '@/shared/components/input/Button';
import { AIMentor } from '@/feature/home/type';
import { AIMentorNames } from '@/feature/home/const';

interface BeforeRecommendationProps {
  aiMentor: AIMentor;
  planId: string;
  goalId: string;
  getWeeklyGoalRecommendationByAI: (goalId: string, planId: string) => void;
}
export const GoalRecommendationRequest = ({
  aiMentor,
  planId,
  goalId,
  getWeeklyGoalRecommendationByAI,
}: BeforeRecommendationProps) => {
  const aiMentorName = AIMentorNames[aiMentor];
  return (
    <div className="relative">
      {/* 그라데이션 테두리 */}
      <div
        className="absolute inset-0 rounded-lg p-[1px]"
        style={{
          background: 'linear-gradient(135deg, rgba(128, 245, 14, 1), rgba(120, 193, 241, 1), rgba(204, 173, 253, 1))',
        }}
      >
        <div className="w-full h-full bg-normal-assistive rounded-lg"></div>
      </div>

      {/* 기존 레이아웃 */}
      <div className="relative z-10 grid grid-cols-[0.7fr_3fr_1fr] items-center justify-between w-full p-4 rounded-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex flex-1 flex-col min-w-0">
          <span className="text-label-alternative text-xs font-medium text-left">{aiMentorName}이 추천한</span>
          <p className="body-1-bold text-label-normal text-sm mt-1 truncate w-full text-left">
            이번주 목표가 도착했어요
          </p>
        </div>
        <Button
          size="sm"
          variant="primary"
          layout="normal"
          text="확인하기"
          onClick={() => getWeeklyGoalRecommendationByAI(goalId, planId)}
        />
      </div>
    </div>
  );
};
