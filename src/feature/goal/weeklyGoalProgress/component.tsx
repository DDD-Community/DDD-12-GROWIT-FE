'use client';

import { Goal } from '@/shared/type/goal';
import { AddRetroSpectButton } from '@/feature/retrospects';

interface WeeklyGoalProgressProps {
  goal: Goal;
  selectedPlanContent: string;
  selectedPlanId: string;
  selectedWeekIndex: number;
}

export const WeeklyGoalProgress = ({
  goal,
  selectedPlanContent,
  selectedPlanId,
  selectedWeekIndex,
}: WeeklyGoalProgressProps) => {
  if (!goal) return null;

  return (
    <div className="flex gap-[12px] items-center max-sm:w-full max-sm:justify-between max-sm:py-[12px]">
      <div className="flex items-center gap-[20px]">
        <div className="max-sm:hidden flex items-center gap-[20px]">
          <span className="text-white text-[18px] font-[700]">{selectedWeekIndex}주차</span>
          <div className="bg-[#70737C52] h-[24px] w-[2px]"></div>
        </div>
        <span className="text-white text-[16px] font-[700]">'{selectedPlanContent}'</span>
      </div>
      <AddRetroSpectButton goal={goal} selectedPlanId={selectedPlanId} currentWeekIndex={selectedWeekIndex} />
    </div>
  );
};
