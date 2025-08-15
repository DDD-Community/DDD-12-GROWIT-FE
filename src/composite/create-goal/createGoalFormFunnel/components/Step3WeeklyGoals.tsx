'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';

interface Step3WeeklyGoalsProps {
  onPrev: () => void;
}

export const Step3WeeklyGoals = ({ onPrev }: Step3WeeklyGoalsProps) => {
  const { watch, formState: { isValid } } = useFormContext<GoalFormData>();
  
  const formValues = watch();
  const isStepValid = formValues.plans.every(plan => plan.content);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPrev();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 주간목표 설정 영역 */}
      <div>
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">주간목표</p>
          <p className="label-1-regular text-neutral-400">
            주마다 실행할 목표를 30자 이내로 적어주세요.
          </p>
        </div>
        <CreateGoalFormElement.WeekendGoal />
      </div>

      {/* 버튼 영역 - 이전 버튼만 (제출은 ConfirmGoalBottomBar에서 처리) */}
      <div className="flex justify-start">
        <Button
          size="lg"
          text="이전"
          variant="secondary"
          onClick={handlePrev}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};