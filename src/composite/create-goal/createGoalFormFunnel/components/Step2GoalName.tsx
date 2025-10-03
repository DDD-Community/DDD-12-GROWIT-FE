'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';
import { GoalCategoryEnum } from '@/shared/type/goal';
import { GuideMessage } from './GuideMessage';
import Button from '@/shared/components/input/Button';

interface Step2GoalNameProps {
  onNext: () => void;
}

const CATEGORY_EXAMPLES: Record<string, string[]> = {
  [GoalCategoryEnum.STUDY]: ['매일 1시간 독서', '전공수업 A+', '컴활 자격증 취득'],
  [GoalCategoryEnum.FINANCE]: ['월 50만원 저축', 'ETF 분산투자 시작', '지출 20% 줄이기'],
  [GoalCategoryEnum.IT_PROJECT]: ['개발 스프린트', 'MVP 4주 내 완성', '서비스 고도화'],
};

export const Step2GoalName = ({ onNext }: Step2GoalNameProps) => {
  const { watch, setValue } = useFormContext<GoalFormData>();

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
          <div className="flex flex-row gap-3 flex-wrap mt-6">
            {selectedCategory &&
              CATEGORY_EXAMPLES[selectedCategory] &&
              CATEGORY_EXAMPLES[selectedCategory].map(example => (
                <div key={example} className="inline-flex">
                  <Button
                    size="sm"
                    type="button"
                    text={example}
                    variant={formValues.name === example ? 'select' : 'secondary'}
                    className={formValues.name === example ? '' : 'bg-transparent'}
                    onClick={() => setValue('name', example)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <FunnelNextButton disabled={!isStepValid} onClick={handleNext} />
    </div>
  );
};
