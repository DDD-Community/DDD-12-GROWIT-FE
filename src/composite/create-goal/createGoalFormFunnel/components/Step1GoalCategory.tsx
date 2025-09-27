'use client';

import { useFormContext } from 'react-hook-form';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import Button from '@/shared/components/input/Button';
import { GoalFormData } from '@/shared/type/form';
import { GOAL_CATEGORIES, GoalCategoryEnum } from '@/shared/constants/goalCategory';
import { GuideMessage } from './GuideMessage';

interface Step1GoalCategoryProps {
  onNext: () => void;
}

export const Step1GoalCategory = ({ onNext }: Step1GoalCategoryProps) => {
  const { watch, setValue } = useFormContext<GoalFormData>();
  const formValues = watch();
  const selectedCategory = formValues.category;

  const handleCategorySelect = (e: React.MouseEvent<HTMLButtonElement>, categoryId: GoalCategoryEnum) => {
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
              variant={selectedCategory === category.id ? 'select' : 'secondary'}
              onClick={e => handleCategorySelect(e, category.id)}
            />
          ))}
        </div>
      </div>

      <FunnelNextButton disabled={!selectedCategory} onClick={handleNext} />
    </div>
  );
};
