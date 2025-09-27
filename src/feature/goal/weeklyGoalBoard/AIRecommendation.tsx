import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { AIMentor } from '@/feature/home/type';

const AIMentorIcons = {
  TIM_COOK: '/home/timcook-face.png',
  WARREN_BUFFETT: '/home/warrenbuffett-face.png',
  CONFUCIUS: '/home/confucius-face.png',
};

interface AIRecommendationProps {
  aiMentor: AIMentor;
  recommendedGoal: string;
  selectedWeekIndex: number;
}
export const AIRecommendation = ({ aiMentor, recommendedGoal, selectedWeekIndex }: AIRecommendationProps) => {
  return (
    <FlexBox className="flex items-center justify-between w-full p-4 bg-elevated-normal rounded-lg hover:bg-elevated-alternative gap-4 transition-colors duration-200 border border-gray-500">
      <Image src={AIMentorIcons[aiMentor]} alt="planet" width={45} height={45} priority={true} />
      <div className="flex-1 flex flex-col">
        <span className="label-1-normal text-label-neutral">{selectedWeekIndex}주차 목표</span>
        <p className="body-1-bold text-primary-strong">{recommendedGoal}</p>
      </div>
    </FlexBox>
  );
};
