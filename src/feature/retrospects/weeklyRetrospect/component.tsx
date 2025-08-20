import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { WeeklyRetrospectBox } from '@/feature/retrospects/WeeklyRetrospectBox';
import { Plan, Retrospect } from '@/composite/retrospect/type';

interface WeeklyRetrospectProps {
  weeklyRetrospect: (Retrospect | null)[];
  plans: Plan[];
  updateWeeklyRetrospect: (
    e: React.FormEvent<HTMLFormElement>,
    weeklyRetrospectId: string,
    newRetrospect: string
  ) => Promise<void>;
}
export const WeeklyRetrospect = ({ weeklyRetrospect, plans, updateWeeklyRetrospect }: WeeklyRetrospectProps) => {
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
            <WeeklyRetrospectBox
              key={currentPlan.id}
              id={currentRetrospect?.id ? currentRetrospect.id : null}
              week={currentPlan.weekOfMonth}
              isLocked={currentRetrospect === null && !currentPlan.isCurrentWeek}
              isCompleted={currentRetrospect !== null && currentRetrospect.content.length > 0}
              isThisWeek={currentPlan.isCurrentWeek}
              weeklyGoal={currentPlan.content}
              content={currentRetrospect ? currentRetrospect.content : ''}
              updateWeeklyRetrospect={updateWeeklyRetrospect}
            />
          );
        })}
      </Accordion>
    </>
  );
};
