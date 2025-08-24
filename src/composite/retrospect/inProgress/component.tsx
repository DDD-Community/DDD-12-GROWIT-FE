'use client';

import { RoadMap } from '@/shared/components/display/RoadMap';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { useEffect, useState } from 'react';
import { getProgressRetrospect } from './api';
import { CreateGoalButton } from '@/feature/goal';
import { WeeklyGoalBanner } from '@/feature/goal/weeklyGoalBanner';
import { Goal } from '@/shared/type/goal';

export const InProgress = () => {
  const [ingGoal, setIngGoal] = useState<Goal | null>(null);
  const [goalId, setGoalId] = useState<string>('');

  // 1. Goal과 Duration 가져오기
  useEffect(() => {
    const fetchGoal = async () => {
      const res = await getProgressRetrospect();
      const currentGoal = res.data[0];
      if (currentGoal) {
        setIngGoal(currentGoal);
        setGoalId(currentGoal.id);
      }
    };
    fetchGoal();
  }, []);

  // 2. goalId를 useWeeklyRetrospect에 전달
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(goalId);

  return (
    <>
      {ingGoal ? (
        <>
          <WeeklyGoalBanner goal={ingGoal} />
          <EntireRetrospect goalId={goalId} />
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
            <CreateGoalButton />
          </div>
        </FlexBox>
      )}
    </>
  );
};
