import Badge from './Badge';
import FlexBox from '../foundation/FlexBox';
import { GoalProgressBar } from './GoalProgressBar';

interface RoadMapProps {
  totalSteps: number;
  currentStep: number;
  duration: {
    startDate: string;
    endDate: string;
  };
}
export const RoadMap = ({ totalSteps, currentStep, duration }: RoadMapProps) => {
  return (
    <div className="bg-black p-6 rounded-xl space-y-4 bg-center bg-cover bg-[url(/interaction.png))]">
      <FlexBox className="gap-2">
        <Badge
          type={'default'}
          size={'md'}
          color={totalSteps === 4 ? 'bg-brand-neon' : totalSteps === 8 ? 'bg-accent-blue' : 'bg-accent-orange'}
          textColor="text-button-normal"
          label={`${totalSteps}주`}
          className="font-bold"
        />
        <div className="py-1 px-4 text-sm text-label-neutral bg-fill-normal rounded-2xl">
          {duration.startDate} ~ {duration.endDate}
        </div>
      </FlexBox>
      <p className="heading-2-bold text-white mb-8">그로잇 서비스 출시</p>
      <GoalProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};
