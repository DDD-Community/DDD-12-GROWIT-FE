'use client';

import { useParams, useRouter } from 'next/navigation';
import { CompletedTaskBox } from '../done/components/CompletedTaskBox';
import { Duration } from '../type';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';

const dummyDuration: Duration = {
  startDate: '2025/7/1',
  endDate: '2025/7/31',
};

export const CompletedDetailRetrospect = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(params.id);
  //const { todoCompletedRate, analysis, content } = useEntireRetrospect(params.id);

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
        <CompletedTaskBox id={''} isCompleted={false} content={'그로잇 서비스 출시'} duration={dummyDuration} />
        {/** 전체 회고 (AI) */}
        <EntireRetrospect isSummaryVisible={true} />
        {/** 주간 회고 */}
        <WeeklyRetrospect
          weeklyRetrospect={weeklyRetrospect}
          plans={plans}
          updateWeeklyRetrospect={updateWeeklyRetrospect}
        />
      </FlexBox>
    </>
  );
};
