import Button from '@/shared/components/input/Button';
import { AIMentor } from '@/feature/home/type';
import { AIMentorNames } from '@/feature/home/const';
import { useState } from 'react';

interface BeforeRecommendationProps {
  aiMentor: AIMentor;
  planId: string;
  goalId: string;
  getAndPutWeeklyGoalRecommendationByAI: (goalId: string, planId: string) => void;
  refetchGoal: () => void;
}
export const GoalRecommendationRequest = ({
  aiMentor,
  planId,
  goalId,
  getAndPutWeeklyGoalRecommendationByAI,
  refetchGoal,
}: BeforeRecommendationProps) => {
  const aiMentorName = AIMentorNames[aiMentor];
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await getAndPutWeeklyGoalRecommendationByAI(goalId, planId);
      refetchGoal();
    } catch (error) {
      console.error('Failed to get AI recommendation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 rounded-lg p-[1px]">
          <div className="w-full h-full bg-normal-assistive rounded-lg border border-gray-500"></div>
        </div>
        <div className="relative z-10 w-full h-[80px] flex flex-col items-center justify-center p-4 rounded-lg">
          <div className="text-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600 mx-auto mb-3"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 7.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

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
        <Button size="sm" variant="primary" layout="normal" text="확인하기" onClick={handleClick} />
      </div>
    </div>
  );
};
