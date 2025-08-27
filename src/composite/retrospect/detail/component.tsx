'use client';

import { useParams, useRouter } from 'next/navigation';
import { CompletedTaskBox } from '../done/components/CompletedTaskBox';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import { useEffect, useState } from 'react';
import { getCompletedGoals } from './api';
import { Goal } from '@/shared/type/goal';

export const CompletedDetailRetrospect = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(params.id);
  const [completedGoal, setCompletedGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const initData = async () => {
      const res = await getCompletedGoals();
      const completedGoals = res.data;
      const targetGoal = completedGoals.find(goal => goal.id === params.id) || null;
      setCompletedGoal(targetGoal);
    };
    initData();
  }, []);

  return (
    <>
      <div className="w-full flex items-start border-b border-line-normal mb-4 p-4">
        <button onClick={() => router.back()} className="cursor-pointer">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <FlexBox direction="col" className="gap-5 p-4">
        {completedGoal && (
          <CompletedTaskBox
            id={completedGoal.id}
            isCompleted={true}
            content={completedGoal.name}
            duration={completedGoal.duration}
          />
        )}

        {/** 전체 회고 (AI) */}
        <EntireRetrospect goalId={params.id} />
        {/** 주간 회고 */}
        <WeeklyRetrospect
          goalId={params.id}
          weeklyRetrospect={weeklyRetrospect}
          plans={plans}
          updateWeeklyRetrospect={updateWeeklyRetrospect}
        />
      </FlexBox>
    </>
  );
};
