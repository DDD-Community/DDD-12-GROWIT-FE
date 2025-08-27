import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { WeeklyRetrospectBox } from '@/feature/retrospects/weeklyRetrospect/components/WeeklyRetrospectBox';
import { Plan, Retrospect } from '@/composite/retrospect/type';

interface WeeklyRetrospectProps {
  weeklyRetrospect: (Retrospect | null)[];
  plans: Plan[];
  updateWeeklyRetrospect: (weeklyRetrospectId: string, newRetrospect: string) => Promise<void>;
}
export const WeeklyRetrospect = ({ weeklyRetrospect, plans, updateWeeklyRetrospect }: WeeklyRetrospectProps) => {
  const totalWeekCount = plans.length;

  const getCurrentWeekNumber = () => {
    const currentWeekPlan = plans.find(plan => plan.isCurrentWeek);
    return currentWeekPlan ? currentWeekPlan.weekOfMonth : 1;
  };
  const currentWeekNumber = getCurrentWeekNumber();

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
          const currentPlan = plans[idx];
          // 지나간 주차인지에 대한 계산
          const isPassedWeek = currentPlan.weekOfMonth < currentWeekNumber;

          return (
            <WeeklyRetrospectBox
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
