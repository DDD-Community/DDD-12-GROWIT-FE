'use client';

import { Goal } from '@/shared/type/goal';
import { calculateCurrentWeek } from '../utils';
import Image from 'next/image';
import { ToolTip } from '@/shared/components/display/ToolTip';

interface WeeklyGoalBannerProps {
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
      progress: 'from-[#39D98A] via-[#0EA5E9] to-[#2A2B31]',
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

export const WeeklyGoalBannerDesktop = ({ goal }: WeeklyGoalBannerProps) => {
  const currentWeek = calculateCurrentWeek(goal.duration.startDate, goal.duration.endDate);
  const durationLabel = `${goal.duration.startDate} ~ ${goal.duration.endDate}`;
  const totalWeeks = Math.max(1, goal.plans?.length || 1);
  const progressPercent = Math.min(100, Math.max(0, (currentWeek / totalWeeks) * 100));

  const colorTheme = getColorTheme(goal.plans?.length || 0);

  return (
    <div className="flex flex-col w-full rounded-2xl bg-[#111317] px-[24px] py-[28px] gap-[24px] relative overflow-hidden border border-[#23262F]">
      {/* 배경 이미지 - plans.length에 따라 다른 이미지 사용 */}
      <Image
        src={goal.plans && goal.plans.length > 8 ? '/image/growit-character.jpeg' : '/image/growit-landing.png'}
        alt="background"
        fill
        className="object-cover object-[40%_15%] opacity-30 pointer-events-none z-0"
      />

      <div className="flex flex-col gap-[16px] relative z-[2]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center justify-center h-6 px-2 rounded-full ${colorTheme.badge} text-black text-xs font-semibold`}
          >
            {totalWeeks}주
          </span>
          <span className="inline-flex items-center h-6 px-2 rounded-full bg-[#2A2B31] opacity-60 text-white text-xs">
            {durationLabel}
          </span>
        </div>
        <div className="text-white text-lg font-semibold">{goal.name}</div>
      </div>

      {/* 진행률 바 */}
      <div className="mt-2 relative">
        <div className="h-[6px] my-[12px] w-full bg-[#2A2B31] rounded-full overflow-hidden">
          <div
            className={`h-[6px] bg-gradient-to-r rounded-full ${colorTheme.progress}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 주차별 포인트 마커 */}
        <div className="absolute inset-0 flex items-center justify-between">
          {Array.from({ length: totalWeeks }).map((_, index) => {
            const weekNumber = index + 1;
            const isCurrentWeek = weekNumber === currentWeek;
            const isCompleted = weekNumber <= currentWeek;

            // 포인트 색상 결정 (이미지와 동일하게)
            let pointColor = '';
            if (weekNumber === totalWeeks) {
              // 마지막 주차는 메테오 아이콘
              pointColor = 'bg-green-500';
            } else if (isCompleted) {
              if (colorTheme.primary === '#39D98A') {
                pointColor = 'bg-green-500'; // 초록색
              } else if (colorTheme.primary === '#0EA5E9') {
                pointColor = 'bg-blue-500'; // 파란색
              } else {
                pointColor = 'bg-yellow-500'; // 노란색
              }
            } else {
              pointColor = 'bg-gray-400 border border-gray-500'; // 미완료: 회색
            }

            return (
              <div key={index} className="relative">
                {/* 주차별 포인트 스타일 */}
                {weekNumber === 1 ? (
                  // 첫 번째 포인트는 흰색 원형 (테두리만)
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-white" />
                ) : weekNumber === totalWeeks ? (
                  // 마지막 주차는 메테오 아이콘 (활성화 상태에 따라 색상 변경)
                  <div
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                      isCompleted
                        ? colorTheme.primary === '#39D98A'
                          ? 'bg-green-500'
                          : colorTheme.primary === '#0EA5E9'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        : 'bg-elevated-assistive'
                    }`}
                  >
                    {isCompleted ? (
                      <Image src="/meteor.svg" alt="meteor" width={20} height={20} className="text-white" />
                    ) : (
                      <Image src="/meteor-gray.svg" alt="meteor" width={20} height={20} className="text-white" />
                    )}
                  </div>
                ) : (
                  <div className={`w-3 h-3 rounded-full ${pointColor}`} />
                )}

                {isCurrentWeek && <ToolTip text={`${currentWeek}주 / ${totalWeeks}주`} position="top-center" />}

                {/* 주차 라벨 */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 text-xs font-medium text-center whitespace-nowrap ${
                    weekNumber === totalWeeks
                      ? 'bottom-9' // 마지막 주차는 아래
                      : 'top-4' // 나머지는 위
                  } ${isCompleted ? 'text-white' : 'text-gray-400'}`}
                >
                  {weekNumber === totalWeeks ? '달성!' : `${weekNumber}주`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
