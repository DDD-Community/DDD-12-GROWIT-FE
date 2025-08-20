import { Goal } from '@/shared/type/goal';
import { WeeklyGoalBannerMobile } from './components/WeeklyGoalBanner.mobile';
import { WeeklyGoalBannerDesktop } from './components/WeeklyGoalBanner.desktop';

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
