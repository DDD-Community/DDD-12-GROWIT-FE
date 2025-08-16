'use client';

import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';
import { GuideMessage } from './GuideMessage';

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
      <div>
        <GuideMessage text="어떤 목표를 가지고 있어?" highlight={['목표']} status="curious" />
        <CreateGoalFormElement.Name />
      </div>
      <FunnelNextButton disabled={!isStepValid} onClick={handleNext} />
    </div>
  );
};
