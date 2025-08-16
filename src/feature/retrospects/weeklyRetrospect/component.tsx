import { RetrospectBox } from '@/composite/retrospect/inProgress/components/RetrospectBox';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { Plan, Retrospect } from '@/composite/retrospect/type';

interface WeeklyRetrospectProps {
  weeklyRetrospect: (Retrospect | null)[];
  plans: Plan[];
}
export const WeeklyRetrospect = ({ weeklyRetrospect, plans }: WeeklyRetrospectProps) => {
  const totalWeekCount = plans.length;
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

          return (
            <RetrospectBox
              key={currentPlan.id}
              week={currentPlan.weekOfMonth}
              isLocked={currentRetrospect === null}
              isCompleted={currentRetrospect !== null && currentRetrospect.content.length > 0}
              isThisWeek={currentPlan.isCurrentWeek}
              weeklyGoal={currentPlan.content}
              content={currentRetrospect ? currentRetrospect.content : ''}
            />
          );
        })}
      </Accordion>
    </>
  );
};
