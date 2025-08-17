'use client';

import { RoadMap } from '@/shared/components/display/RoadMap';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import { useInProgress } from './hook';

export const InProgress = () => {
  const { weeklyRetrospect, plans, duration, currentWeekOfMonth, totalWeek } = useInProgress();

  return (
    <>
      {currentWeekOfMonth && totalWeek && duration ? (
        <>
          <RoadMap currentStep={currentWeekOfMonth} totalSteps={totalWeek} duration={duration} />
          <EntireRetrospect isSummaryVisible={false} />
          {weeklyRetrospect && <WeeklyRetrospect weeklyRetrospect={weeklyRetrospect} plans={plans} />}
        </>
      ) : (
        <FlexBox direction="col" className="justify-center space-y-4">
          <p className="text-label-neutral">진행중인 목표가 없습니다</p>
          <div className="w-[113px]">
            <Button
              text="목표 추가"
              size={'ml'}
              layout="icon-right"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.0003 4.16602V15.8327M4.16699 9.99935H15.8337"
                    stroke="#171719"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </FlexBox>
      )}
    </>
  );
};
