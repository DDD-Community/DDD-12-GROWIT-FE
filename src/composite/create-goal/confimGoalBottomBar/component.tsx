'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { ConfirmGoalDialogButton } from '@/feature/goal';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useFetchPostCreateGoal, useProgressPercentage } from './hook';

export const ConfirmGoalBottomBar = () => {
  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<GoalFormData>();
  const percentage = useProgressPercentage(watch);
  const { isSuccess, isError, isLoading, createGoal } = useFetchPostCreateGoal();

  return (
    <div className="w-full flex items-center max-sm:flex-col max-sm:gap-[20px] max-sm:px-[20px] max-sm:pb-[48px] sm:gap-[60px] sm:px-[40px] sm:pb-[16px] pt-[20px] border-t border-line-normal">
      <div className="flex flex-col gap-2 items-start w-full">
        <FlexBox className="w-full justify-between">
          <div className="body-1-medium text-primary-normal">
            <span className="title-3-bold text-accent-violet">{percentage}%</span>
          </div>
        </FlexBox>
        <FlexBox className="relative w-full rounded-full h-2 bg-fill-normal">
          <motion.div
            className={`absolute h-full top-0 left-0 rounded-full bg-accent-fg-violet`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </FlexBox>
      </div>
      <ConfirmGoalDialogButton
        isLoading={isLoading}
        isComplete={isValid}
        isSuccess={isSuccess}
        isError={isError}
        onClick={handleSubmit(createGoal)}
      />
    </div>
  );
};
