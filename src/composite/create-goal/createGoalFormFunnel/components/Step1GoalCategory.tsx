'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';
import { GOAL_CATEGORIES } from '@/shared/constants/goalCategory';

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
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">목표 카테고리</p>
          <p className="label-1-regular text-neutral-400">어떤 분야의 목표를 달성하고 싶으신가요?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {GOAL_CATEGORIES.map(category => (
            <Button
              key={category.id}
              size="lg"
              text={category.label}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              onClick={e => handleCategorySelect(e, category.id)}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <FunnelNextButton disabled={!selectedCategory} onClick={handleNext} />
    </div>
  );
};
