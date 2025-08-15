'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { GoalFormData } from '@/shared/type/form';

interface Step3DurationProps {
  onNext: () => void;
}

export const Step3Duration = ({ onNext }: Step3DurationProps) => {
  const [selectedDuration, setSelectedDuration] = useState('4주');
  const { watch } = useFormContext<GoalFormData>();
  
  const formValues = watch();
  const isStepValid = 
    formValues.duration.startDate && 
    formValues.duration.endDate;

  const handleDurationClick = (e: React.MouseEvent<HTMLButtonElement>, duration: string) => {
    e.preventDefault();
    setSelectedDuration(duration);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isStepValid) {
      onNext();
    }
  };


  return (
    <div className="flex flex-col gap-8">
      {/* 기간 및 시작일 설정 영역 */}
      <div>
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">목표 기간</p>
          <p className="label-1-regular text-neutral-400">
            목표를 달성할 기간과 시작일을 선택해주세요.
          </p>
        </div>
        
        {/* 기간 선택 */}
        <div className="mb-6">
          <p className="label-1-bold text-white mb-3">기간</p>
          <div className="flex gap-2">
            <Button
              size="lg"
              text="4주"
              variant="secondary"
              className={`flex-1 ${selectedDuration === '4주' && 'bg-gray-100! text-gray-900!'}`}
              onClick={e => handleDurationClick(e, '4주')}
            />
            <Button
              size="lg"
              text="8주"
              variant="secondary"
              className={`flex-1 ${selectedDuration === '8주' && 'bg-gray-100! text-gray-900!'}`}
              onClick={e => handleDurationClick(e, '8주')}
            />
            <Button
              size="lg"
              text="12주"
              variant="secondary"
              className={`flex-1 ${selectedDuration === '12주' && 'bg-gray-100! text-gray-900!'}`}
              onClick={e => handleDurationClick(e, '12주')}
            />
          </div>
        </div>
        
        {/* 시작 날짜 선택 */}
        <div>
          <p className="label-1-bold text-white mb-3">시작 날짜</p>
          <CreateGoalFormElement.DurationDate />
          <p className="caption-1-regular text-neutral-400 mt-2">
            * 월요일 고정, 시작일 기준 {selectedDuration} 후 자동 설정
          </p>
        </div>
      </div>

      <FunnelNextButton
        disabled={!isStepValid}
        onClick={handleNext}
      />
    </div>
  );
};