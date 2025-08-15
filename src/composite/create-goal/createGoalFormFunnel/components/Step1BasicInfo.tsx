'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateGoalFormElement } from '@/feature/goal';
import SectionMessage from '@/shared/components/display/SectionMessage';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';

interface Step1BasicInfoProps {
  onNext: () => void;
}

export const Step1BasicInfo = ({ onNext }: Step1BasicInfoProps) => {
  const [selectedDuration, setSelectedDuration] = useState('4주');
  const { watch, formState: { errors } } = useFormContext<GoalFormData>();
  
  const formValues = watch();
  const isStepValid = 
    formValues.duration.startDate && 
    formValues.duration.endDate && 
    formValues.name;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, duration: string) => {
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
      {/* 기간 및 목표설정 영역 */}
      <div>
        <div className="mb-[24px]">
          <SectionMessage>모든 입력 정보는 목표 생성 후 수정이 불가합니다.</SectionMessage>
        </div>
        
        <div className="flex flex-col gap-[8px] mb-[20px]">
          <div className="flex flex-col gap-[8px] mb-5">
            <div className="flex items-center space-x-[8px] mb-[8px]">
              <p className="heading-2-bold text-white">기간</p>
            </div>
            <FlexBox className="gap-2 flex-1">
              <Button
                size="lg"
                text="4주"
                variant="secondary"
                className={`${selectedDuration === '4주' && 'bg-gray-100! text-gray-900!'}`}
                onClick={e => handleButtonClick(e, '4주')}
              />
              <Button
                size="lg"
                text="8주"
                variant="secondary"
                className={`${selectedDuration === '8주' && 'bg-gray-100! text-gray-900!'}`}
                onClick={e => handleButtonClick(e, '8주')}
              />
              <Button
                size="lg"
                text="12주"
                variant="secondary"
                className={`${selectedDuration === '12주' && 'bg-gray-100! text-gray-900!'}`}
                onClick={e => handleButtonClick(e, '12주')}
              />
            </FlexBox>
          </div>
          
          <p className="heading-2-bold text-white">시작 날짜</p>
          <CreateGoalFormElement.DurationDate />
          <p className="caption-1-regular text-neutral-400">* 월요일 고정, 시작일 기준 4주 후 자동 설정</p>
        </div>
        
        <div className="mb-[20px]">
          <div className="flex items-center space-x-[8px] mb-[12px]">
            <p className="heading-2-bold text-white">목표이름</p>
          </div>
          <CreateGoalFormElement.Name />
        </div>
      </div>

      {/* 다음 단계 버튼 */}
      <div className="flex justify-end">
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