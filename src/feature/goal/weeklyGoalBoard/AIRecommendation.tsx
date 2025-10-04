import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { AIMentor } from '@/feature/home/type';
import { AddPlanModal } from '@/feature/plan/addPlanModal';

const AIMentorIcons = {
  TIM_COOK: '/home/timcook-face.png',
  WARREN_BUFFETT: '/home/warrenbuffett-face.png',
  CONFUCIUS: '/home/confucius-face.png',
};

interface AIRecommendationProps {
  aiMentor: AIMentor;
  selectedWeekIndex: number;
  selectedPlanContent: string;
  onSuccessAddPlan: () => void;
  goalId: string;
  planId: string;
}
export const AIRecommendation = ({
  aiMentor,
  selectedWeekIndex,
  selectedPlanContent,
  onSuccessAddPlan,
  goalId,
  planId,
}: AIRecommendationProps) => {
  return (
    <FlexBox className="flex items-center justify-between w-full p-4 bg-elevated-normal rounded-lg hover:bg-elevated-alternative gap-4 transition-colors duration-200 border border-gray-500">
      <Image
        src={AIMentorIcons[aiMentor]}
        alt="planet"
        width={45}
        height={45}
        priority={true}
        className="w-auto h-auto"
      />
      <div className="flex-1 flex flex-col">
        <span className="label-1-normal text-label-neutral">{selectedWeekIndex}주차 목표</span>
        <p className="body-1-bold text-primary-strong">{selectedPlanContent}</p>
      </div>
      <AddPlanModal
        onSuccessAddPlan={onSuccessAddPlan}
        selectedPlanIndex={selectedWeekIndex}
        selectedPlanContent={selectedPlanContent}
        goalId={goalId}
        planId={planId}
      />
    </FlexBox>
  );
};
