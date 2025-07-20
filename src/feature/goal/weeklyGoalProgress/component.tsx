'use client';

import { Goal } from '@/shared/type/goal';
import { Todo } from '@/shared/type/Todo';
import { AddRetroSpectButton } from '@/feature/retrospects';
import { useWeeklyGoalProgress } from './hooks';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { motion } from 'framer-motion';

interface WeeklyGoalProgressProps {
  goal: Goal;
  selectedPlanContent: string;
  selectedPlanId: string;
  selectedWeekIndex: number;
  todoList: Record<string, Todo[]> | null;
}

export const WeeklyGoalProgress = ({
  goal,
  selectedPlanContent,
  selectedPlanId,
  selectedWeekIndex,
  todoList,
}: WeeklyGoalProgressProps) => {
  const { percent } = useWeeklyGoalProgress({ todoList });
  return (
    <div className="flex items-center justify-between px-6 py-[17px] rounded-2xl bg-[#37383C47] max-sm:flex-col max-sm:gap-3">
      <div className="flex gap-[12px] items-center max-sm:w-full max-sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#C2C4C8E0] text-[14px] font-[500]">이번주 목표</span>
          <div className="bg-[#70737C52] h-[16px] w-[1px]"></div>
          <span className="text-white text-[16px] font-[700]">'{selectedPlanContent}'</span>
        </div>
        <AddRetroSpectButton goal={goal} selectedPlanId={selectedPlanId} currentWeekIndex={selectedWeekIndex} />
      </div>
      <div className="flex flex-col items-center gap-[12px] w-[50%] max-sm:w-full">
        <div className="flex w-full justify-between gap-2 items-center">
          <div className="px-3 rounded-full bg-accent-violet/20 ">
            <span className="text-accent-fg-violet text-xs font-light">주간 투두 완료율</span>
          </div>
          <span className="text-accent-fg-violet text-ml font-bold">{percent}%</span>
        </div>
        <FlexBox className="relative w-full rounded-full h-2 bg-fill-normal">
          <motion.div
            className={`absolute h-full top-0 left-0 rounded-full bg-accent-violet`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </FlexBox>
      </div>
    </div>
  );
};
