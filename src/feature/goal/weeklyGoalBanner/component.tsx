'use client';

import { Goal } from '@/shared/type/goal';
import { GoalPointerIcon } from './components/icon';
import { calculateCurrentWeek } from './utils';
import Image from 'next/image';

interface WeeklyGoalBannerProps {
  goal: Goal; // 필수
}

export const WeeklyGoalBanner = ({ goal }: WeeklyGoalBannerProps) => {
  const currentWeek = calculateCurrentWeek(goal.duration.startDate, goal.duration.endDate);
  const durationLabel = `${goal.duration.startDate} ~ ${goal.duration.endDate}`;
  const totalWeeks = Math.max(1, goal.plans?.length || 1);
  const progressPercent = Math.min(100, Math.max(0, (currentWeek / totalWeeks) * 100));

  return (
    <div className="flex flex-col w-full rounded-2xl bg-[#111317] px-[24px] py-[28px] gap-[24px] relative overflow-hidden border border-[#23262F]">
      <Image
        src="/image/growit-landing.png"
        alt="landing"
        fill
        className="object-cover object-[50%_25%] opacity-40 pointer-events-none z-0"
      />
      <div className="flex flex-col gap-[16px] relative z-[2]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-accent-fg-green text-black text-xs font-semibold">
            {currentWeek}주
          </span>
          <span className="inline-flex items-center h-6 px-2 rounded-full bg-[#2A2B31] opacity-60 text-white text-xs">
            {durationLabel}
          </span>
        </div>
        <div className="text-white text-lg font-semibold">{goal.name}</div>
      </div>

      <div className="mt-2 relative">
        <div className="h-[6px] w-full bg-[#2A2B31] rounded-full overflow-hidden">
          <div
            className="h-[6px] bg-gradient-to-r from-[#39D98A] via-[#0EA5E9] to-[#2A2B31]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between ">
          {Array.from({ length: totalWeeks }).map((_, index) => (
            <GoalPointerIcon key={index} isActivate={index + 1 <= currentWeek} />
          ))}
        </div>
      </div>
    </div>
  );
};
