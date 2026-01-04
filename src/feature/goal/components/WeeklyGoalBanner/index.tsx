import { Goal } from '@/shared/type/goal';
import { WeeklyGoalBannerMobile } from './components/WeeklyGoalBanner.mobile';

interface WeeklyGoalBannerProps {
  goal: Goal;
}

export const WeeklyGoalBanner = ({ goal }: WeeklyGoalBannerProps) => {
  return (
    <>
      <div className="block">
        <WeeklyGoalBannerMobile goal={goal} />
      </div>
    </>
  );
};
