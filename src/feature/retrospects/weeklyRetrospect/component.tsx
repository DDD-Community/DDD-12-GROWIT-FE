import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { WeeklyRetrospectBox } from '@/feature/retrospects/weeklyRetrospect/components/WeeklyRetrospectBox';
import { Retrospect } from '@/composite/retrospect/type';
import { useMemo, useState } from 'react';

interface WeeklyRetrospectProps {
  goalId?: string;
  weeklyRetrospect: (Retrospect | null)[];
  plans: any[];
  updateWeeklyRetrospect: (
    weeklyRetrospectId: string,
    newRetrospect: { keep: string; problem: string; tryNext: string }
  ) => Promise<void>;
}
export const WeeklyRetrospect = ({
  goalId,
  weeklyRetrospect,
  plans,
  updateWeeklyRetrospect,
}: WeeklyRetrospectProps) => {
  const totalWeekCount = plans.length;

  // 주차 순으로 정렬되는것을 보장
  const sortedPlans = useMemo(() => {
    return [...plans].sort((a, b) => a.weekOfMonth - b.weekOfMonth);
  }, [plans]);

  // useMemo로 현재 주차 계산 최적화
  const currentWeekNumber = useMemo(() => {
    const currentWeekPlan = plans.find(plan => plan.isCurrentWeek);
    return currentWeekPlan ? currentWeekPlan.weekOfMonth : 1;
  }, [plans]);

  return (
    <>
      <Accordion
        renderTitle={() => (
          <FlexBox className="flex gap-2">
            <p className="heading-2-bold text-label-normal">주간회고</p>
          </FlexBox>
        )}
      >
        {Array.from({ length: totalWeekCount }, (_, idx) => {
          const currentRetrospect = weeklyRetrospect[idx];
          const currentPlan = sortedPlans[idx];
          // 지나간 주차인지에 대한 계산
          const isPassedWeek = currentPlan.weekOfMonth < currentWeekNumber;

          return (
            <WeeklyRetrospectBox
              goalId={goalId}
              key={currentPlan.id}
              retrospect={currentRetrospect || null}
              plan={currentPlan}
              isCurrentWeek={currentPlan.isCurrentWeek}
              isPassedWeek={isPassedWeek}
              updateWeeklyRetrospect={updateWeeklyRetrospect}
            />
          );
        })}
      </Accordion>
    </>
  );
};
