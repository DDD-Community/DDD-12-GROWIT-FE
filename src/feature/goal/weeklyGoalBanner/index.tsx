import { Goal } from '@/shared/type/goal';
import { WeeklyGoalBannerMobile } from './WeeklyGoalBanner.mobile';
import { WeeklyGoalBannerDesktop } from './WeeklyGoalBanner.desktop';

interface WeeklyGoalBannerProps {
  goal: Goal;
}

export const WeeklyGoalBanner = ({ goal }: WeeklyGoalBannerProps) => {
  return (
    <>
      <div className="block sm:hidden">
        <WeeklyGoalBannerMobile goal={goal} />
      </div>
      <div className="hidden sm:block">
        <WeeklyGoalBannerDesktop goal={goal} />
      </div>
    </>
  );
};
