'use client';

import { useParams } from 'next/navigation';
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
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(params.id);
  //const { todoCompletedRate, analysis, content } = useEntireRetrospect(params.id);

  return (
    <FlexBox direction="col" className="gap-5">
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
  );
};
