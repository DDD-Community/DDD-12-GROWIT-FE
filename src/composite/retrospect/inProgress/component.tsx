'use client';

import { RoadMap } from '@/shared/components/display/RoadMap';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import { useWeeklyRetrospect } from '../hooks';
import { useEffect, useState } from 'react';
import { Duration } from '../type';
import { getProgressRetrospect } from './api';

export const InProgress = () => {
  const [goalId, setGoalId] = useState<string>('');
  const [duration, setDuration] = useState<Duration>();
  const [currentWeekOfMonth, setCurrentWeekOfMonth] = useState<number>();
  const [totalWeek, setTotalWeek] = useState<number>();

  // 1. Goal과 Duration 가져오기
  useEffect(() => {
    const fetchGoal = async () => {
      const res = await getProgressRetrospect();
      const currentGoal = res.data[0];
      if (currentGoal) {
        setGoalId(currentGoal.id);
        setDuration(currentGoal.duration);
      }
    };
    fetchGoal();
  }, []);

  // 2. goalId를 useWeeklyRetrospect에 전달
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(goalId);

  // 3. plans가 바뀌면 currentWeekOfMonth와 totalWeek 계산
  useEffect(() => {
    if (plans.length > 0) {
      const currentPlan = plans.find(plan => plan.isCurrentWeek);
      setCurrentWeekOfMonth(currentPlan?.weekOfMonth);
      setTotalWeek(plans.length);
    }
  }, [plans]);

  return (
    <>
      {currentWeekOfMonth && totalWeek && duration ? (
        <>
          <RoadMap currentStep={currentWeekOfMonth} totalSteps={totalWeek} duration={duration} />
          <EntireRetrospect isSummaryVisible={false} />
          {weeklyRetrospect && (
            <WeeklyRetrospect
              weeklyRetrospect={weeklyRetrospect}
              plans={plans}
              updateWeeklyRetrospect={updateWeeklyRetrospect}
            />
          )}
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
