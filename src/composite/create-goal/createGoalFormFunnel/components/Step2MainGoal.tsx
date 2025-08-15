'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';

interface Step2MainGoalProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Step2MainGoal = ({ onNext, onPrev }: Step2MainGoalProps) => {
  const { watch } = useFormContext<GoalFormData>();
  
  const formValues = watch();
  const isStepValid = 
    formValues.beforeAfter.asIs && 
    formValues.beforeAfter.toBe;

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isStepValid) {
      onNext();
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrev();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 목표 설정 영역 */}
      <div>
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">목표설정</p>
          <p className="label-1-regular text-neutral-400">
            현재 나의 상태와 4주 뒤의 나를 생각하며 작성해주세요.
          </p>
        </div>
        <CreateGoalFormElement.MainGoal />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-4">
        <Button
          size="lg"
          text="이전"
          variant="secondary"
          onClick={handlePrev}
          className="w-full sm:w-auto"
        />
        <Button
          size="lg"
          text="다음"
          variant="primary"
          disabled={!isStepValid}
          onClick={handleNext}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};