'use client';

import { RoadMap } from '@/shared/components/display/RoadMap';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import { useEffect, useState } from 'react';
import { getProgressRetrospect, getWeeklyRetrospectByGoalId } from './api';
import { Duration, Plan, Retrospect } from '../type';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';

export const InProgress = () => {
  const [weeklyRetrospect, setWeeklyRetrospect] = useState<Retrospect[]>();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [duration, setDuration] = useState<Duration>();
  const [currentWeekOfMonth, setCurrentWeekOfMonth] = useState<number>();
  const [totalWeek, setTotalWeek] = useState<number>();

  useEffect(() => {
    const fetchWeeklyRetrospect = async () => {
      const goalId = await fetchProgressGoal();
      const response = await getWeeklyRetrospectByGoalId(goalId);
      const totalWeeklyRetrospect = response.data.map(e => e.retrospect);
      const totalPlans = response.data.map(e => e.plan);
      setWeeklyRetrospect(totalWeeklyRetrospect);
      setPlans(totalPlans);

      for (const plan of totalPlans) {
        if (plan.isCurrentWeek) {
          setCurrentWeekOfMonth(plan.weekOfMonth);
          break;
        }
      }
      setTotalWeek(totalPlans.length);
    };
    const fetchProgressGoal = async (): Promise<string> => {
      const inProgressGoal = await getProgressRetrospect();
      const currentGoal = inProgressGoal.data[0];
      const goalId = currentGoal.id;
      setDuration(currentGoal.duration);
      return goalId;
    };
    fetchWeeklyRetrospect();
  }, []);

  return (
    <>
      {currentWeekOfMonth && totalWeek && duration ? (
        <>
          <RoadMap currentStep={currentWeekOfMonth} totalSteps={totalWeek} duration={duration} />
          <EntireRetrospect />
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
