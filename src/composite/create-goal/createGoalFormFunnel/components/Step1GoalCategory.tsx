'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';
import { GOAL_CATEGORIES } from '@/shared/constants/goalCategory';
import { GuideMessage } from './GuideMessage';

interface Step1GoalCategoryProps {
  onNext: () => void;
}

export const Step1GoalCategory = ({ onNext }: Step1GoalCategoryProps) => {
  const { watch, setValue } = useFormContext<GoalFormData>();
  const formValues = watch();
  const selectedCategory = formValues.category;

  const handleCategorySelect = (e: React.MouseEvent<HTMLButtonElement>, categoryId: string) => {
    e.preventDefault();
    setValue('category', categoryId);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCategory) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <GuideMessage text="어떤 분야에 집중하고 싶어?" highlight={['분야']} status="default" />
        <div className="flex flex-col gap-3 px-[20px]">
          {GOAL_CATEGORIES.map(category => (
            <Button
              key={category.id}
              size="xl"
              text={category.label}
              variant="secondary"
              onClick={e => handleCategorySelect(e, category.id)}
              className={`w-full ${
                selectedCategory === category.id ? 'border-[#34C759] bg-[rgba(52,199,89,0.08)]' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <FunnelNextButton disabled={!selectedCategory} onClick={handleNext} />
    </div>
  );
};
