'use client';

import { Goal } from '@/shared/type/goal';
import { calculateCurrentWeek } from '../utils';
import Image from 'next/image';

interface WeeklyGoalBannerMobileProps {
  goal: Goal;
}

// plans.length에 따른 색상 테마 정의
const getColorTheme = (plansLength: number) => {
  if (plansLength <= 4) {
    // 4주 이하: 초록색 테마 (이미지와 동일)
    return {
      primary: '#39D98A',
      secondary: '#0EA5E9',
      badge: 'bg-accent-fg-green',
      progress: 'from-[#39D98A] to-[#0EA5E9]',
    };
  } else if (plansLength <= 8) {
    // 5-8주: 파란색 테마
    return {
      primary: '#0EA5E9',
      secondary: '#F59E0B',
      badge: 'bg-blue-500',
      progress: 'from-[#0EA5E9] via-[#F59E0B] to-[#2A2B31]',
    };
  } else {
    // 9주 이상: 노란색 테마
    return {
      primary: '#F59E0B',
      secondary: '#0EA5E9',
      badge: 'bg-yellow-500',
      progress: 'from-[#F59E0B] via-[#0EA5E9] to-[#2A2B31]',
    };
  }
};

export const WeeklyGoalBannerMobile = ({ goal }: WeeklyGoalBannerMobileProps) => {
  console.log('goal', goal);
  const currentWeek = calculateCurrentWeek(goal.duration.startDate, goal.duration.endDate);
  const durationLabel = `${goal.duration.startDate} ~ ${goal.duration.endDate}`;
  const totalWeeks = Math.max(1, goal.plans?.length || 1);
  const progressPercent = Math.min(100, Math.max(0, (currentWeek / totalWeeks) * 100));

  const colorTheme = getColorTheme(goal.plans?.length || 0);

  return (
    <>
      <p className="text-label-neutral body-1-normal font-semibold border-b border-[#23262F] pb-2">
        나의 <span className="text-brand-neon body-1-bold">{totalWeeks}주</span> 목표
      </p>
      <div className="flex flex-col w-full rounded-2xl bg-elevated-assistive p-5 gap-5 relative overflow-hidden border border-[#23262F]">
        <div className="flex flex-col gap-1 relative z-[2]">
          <div className="text-white text-lg font-semibold">{goal.name}</div>
          <span className="rounded-full bg-[#2A2B31] opacity-60 text-white text-xs">{durationLabel}</span>
        </div>

        {/* 진행률 바 */}
        <div className="flex items-center gap-[12px]">
          <div className="h-[10px] w-full bg-[#2A2B31] rounded-full overflow-visible">
            <div
              className={`relative h-[8px] my-[1px] bg-gradient-to-r rounded-full ${colorTheme.progress}`}
              style={{ width: `${progressPercent}%` }}
            >
              <div className={`absolute top-[-4px] right-[-4px] w-[16px] h-[16px] rounded-full bg-white blur-md`} />
            </div>
          </div>

          <div className="flex items-center min-w-[38px]">
            <span className="text-white text-sm font-medium">{`${currentWeek} `}</span>
            <span className="text-label-neutral text-sm font-medium">/{totalWeeks}주</span>
          </div>
        </div>
      </div>
    </>
  );
};
