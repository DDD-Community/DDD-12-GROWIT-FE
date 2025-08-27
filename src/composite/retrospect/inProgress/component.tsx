'use client';

import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { CreateGoalButton } from '@/feature/goal';
import { WeeklyGoalBanner } from '@/feature/goal/weeklyGoalBanner';
import { useGoalSelector } from '@/model/goal/context';
import { RetrospectLocked } from './components/RetrospectLocked';

export const InProgress = () => {
  const { currentGoal } = useGoalSelector();
  const goalId = currentGoal?.id ?? '';
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(goalId);

  if (!currentGoal) {
    return (
      <FlexBox direction="col" className="justify-center space-y-4">
        <p className="text-label-neutral">진행중인 목표가 없습니다</p>
        <div className="w-[113px]">
          <CreateGoalButton />
        </div>
      </FlexBox>
    );
  }

  return (
    <>
      <WeeklyGoalBanner goal={currentGoal} />
      <RetrospectLocked />
      <WeeklyRetrospect
        weeklyRetrospect={weeklyRetrospect}
        plans={plans}
        updateWeeklyRetrospect={updateWeeklyRetrospect}
      />
    </>
  );
};
