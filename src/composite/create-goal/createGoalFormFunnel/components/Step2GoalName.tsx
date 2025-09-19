'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';
import { GoalCategoryEnum } from '@/shared/constants/goalCategory';
import { GuideMessage } from './GuideMessage';

interface Step2GoalNameProps {
  onNext: () => void;
}

const CATEGORY_EXAMPLES: Record<string, string> = {
  [GoalCategoryEnum.PROFESSIONAL_GROWTH]: '4주 안에 TOEIC 900점 달성하기, 매일 영어 뉴스 1편 해석하기',
  [GoalCategoryEnum.CAREER_TRANSITION]: '네카라쿠배당토 합격하기, PM으로 전직 성공하기',
  [GoalCategoryEnum.LIFESTYLE_ROUTINE]: '매일 새벽 6시에 일어나기, 매일 1시간 책 읽기',
  [GoalCategoryEnum.WEALTH_BUILDING]: '1,000만원 저축하기, 미주 단타로 4배 수익률 달성하기',
  [GoalCategoryEnum.SIDE_PROJECT]: '동아리 프로젝트 출시, 공모전 우승',
  [GoalCategoryEnum.NETWORKING]: '한 달 2회 이상 독서모임 참석하기, 업계 후배 1:1 멘토링 진행하기',
};

export const Step2GoalName = ({ onNext }: Step2GoalNameProps) => {
  const { watch } = useFormContext<GoalFormData>();

  const formValues = watch();
  const isStepValid = formValues.name && formValues.name.trim().length > 0;
  const selectedCategory = formValues.category;

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <GuideMessage text="어떤 목표를 가지고 있어?" highlight={['목표']} status="exciting" />
        <div className="px-[20px]">
          <CreateGoalFormElement.Name />
          {selectedCategory && CATEGORY_EXAMPLES[selectedCategory] && (
            <p className="mt-2 text-[14px] text-neutral-400">ex. {CATEGORY_EXAMPLES[selectedCategory]}</p>
          )}
        </div>
      </div>
      <FunnelNextButton disabled={!isStepValid} onClick={handleNext} />
    </div>
  );
};
