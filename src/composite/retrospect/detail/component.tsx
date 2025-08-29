'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { CompletedTaskBox } from '../done/components/CompletedTaskBox';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import { CompletedGoal } from '../done/type';

export const CompletedDetailRetrospect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemData = searchParams.get('itemData');
  const completedGoal: CompletedGoal = itemData ? JSON.parse(itemData) : null;

  const params = useParams<{ id: string }>();
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(params.id);

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
        {completedGoal && <CompletedTaskBox completedGoal={completedGoal} isCompleted={true} />}

        {/** 전체 회고 (AI) */}
        <EntireRetrospect goalId={params.id} goalRetrospect={completedGoal.goalRetrospect} />
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
