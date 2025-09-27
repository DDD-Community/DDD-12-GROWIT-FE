'use client';

import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import { getToday } from '@/feature/goal/createGoalFormElement/utils';
import Button from '@/shared/components/input/Button';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';
import { GuideMessage } from './GuideMessage';
import { useFunnelHeader } from '@/shared/components/layout/FunnelHeader';

interface Step3DurationProps {
  onNext: () => void;
}

export const Step3Duration = ({ onNext }: Step3DurationProps) => {
  const { showHeader } = useFunnelHeader();
  const { watch, setValue, getValues } = useFormContext<GoalFormData>();

  const formValues = watch();
  const selectedDuration = formValues.duration || 4;
  const isStepValid = formValues.durationDate.startDate && formValues.durationDate.endDate;

  useEffect(() => {
    if (!formValues.durationDate.startDate) {
      setValue('durationDate.startDate', getToday());
    }
    showHeader();
  }, []);

  const updatePlans = useCallback(
    (weeks: number) => {
      const currentPlans = getValues('plans') || [];
      const newPlans = Array.from({ length: weeks }, (_, index) => ({
        content: currentPlans[index]?.content || '',
        weekOfMonth: index + 1,
      }));
      setValue('plans', newPlans);
    },
    [getValues, setValue]
  );

  const handleDurationClick = (duration: number) => {
    setValue('duration', duration);
    updatePlans(duration);
  };

  const handleNext = () => {
    if (isStepValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <GuideMessage text={`몇 주 동안 이 목표에\n도전해볼까?`} highlight={['몇 주 동안']} status="happy" />
        <div className="px-[20px]">
          <div className="mb-12">
            <p className="label-1-bold text-white mb-3">기간 선택</p>
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
            <p className="mt-2 text-[14px] text-neutral-400 flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
                <path d="M8 5V8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.5" fill="#9CA3AF" />
              </svg>
              <span>목표 시작일과 상관없이, 목표 종료일은 일요일에 끝나요.</span>
            </p>
          </div>
        </div>
      </div>

      <FunnelNextButton disabled={!isStepValid} onClick={handleNext} />
    </div>
  );
};
