'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';
import { GuideMessage } from './GuideMessage';

interface Step3DurationProps {
  onNext: () => void;
}

export const Step3Duration = ({ onNext }: Step3DurationProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(4);
  const { watch } = useFormContext<GoalFormData>();

  const formValues = watch();
  const isStepValid = formValues.duration.startDate && formValues.duration.endDate;

  const handleDurationClick = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleNext = () => {
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <GuideMessage text={`몇 주 동안 이 목표에\n도전해볼까?`} highlight={['몇 주 동안']} status="curious" />
        <div className="mb-6">
          <p className="label-1-bold text-white mb-3">기간</p>
          <div className="flex gap-2">
            <Button
              size="lg"
              text="4주"
              variant="secondary"
              type="button"
              className={`flex-1 ${selectedDuration === 4 && 'bg-gray-100! text-gray-900!'}`}
              onClick={() => handleDurationClick(4)}
            />
            <Button
              size="lg"
              text="8주"
              variant="secondary"
              type="button"
              className={`flex-1 ${selectedDuration === 8 && 'bg-gray-100! text-gray-900!'}`}
              onClick={() => handleDurationClick(8)}
            />
            <Button
              size="lg"
              text="12주"
              variant="secondary"
              type="button"
              className={`flex-1 ${selectedDuration === 12 && 'bg-gray-100! text-gray-900!'}`}
              onClick={() => handleDurationClick(12)}
            />
          </div>
        </div>
        <div>
          <p className="label-1-bold text-white mb-3">시작 날짜</p>
          <CreateGoalFormElement.DurationDate weeks={selectedDuration} />
          <p className="caption-1-regular text-neutral-400 mt-2">
            * 월요일 고정, 시작일 기준 {selectedDuration}주 후 자동 설정
          </p>
        </div>
      </div>

      <FunnelNextButton disabled={!isStepValid} onClick={handleNext} />
    </div>
  );
};
