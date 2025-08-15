'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';

interface Step2GoalNameProps {
  onNext: () => void;
}

export const Step2GoalName = ({ onNext }: Step2GoalNameProps) => {
  const { watch } = useFormContext<GoalFormData>();
  
  const formValues = watch();
  const isStepValid = formValues.name && formValues.name.trim().length > 0;

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 목표 이름 설정 영역 */}
      <div>
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">목표 이름</p>
          <p className="label-1-regular text-neutral-400">
            이루고 싶은 목표를 구체적으로 작성해주세요.
          </p>
        </div>
        <CreateGoalFormElement.Name />
      </div>

      <FunnelNextButton
        disabled={!isStepValid}
        onClick={handleNext}
      />
    </div>
  );
};