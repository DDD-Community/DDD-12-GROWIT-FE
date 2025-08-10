import Badge from './Badge';
import FlexBox from '../foundation/FlexBox';
import { GoalProgressBar } from './GoalProgressBar';

export const RoadMap = () => {
  return (
    <div className="bg-black pt-7 px-6 pb-9 rounded-xl space-y-4">
      <FlexBox className="gap-2">
        <Badge type={'default'} size={'md'} label="4주" />
        <div className="py-1 px-4 body-1-normal text-label-neutral bg-fill-normal rounded-xl">2025/7/1 ~ 2025/8/31</div>
      </FlexBox>
      <p className="heading-2-bold text-white mb-8">그로잇 서비스 출시</p>
      <GoalProgressBar currentStep={1} totalSteps={4} />
    </div>
  );
};
