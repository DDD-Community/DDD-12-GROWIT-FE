import FlexBox from '@/shared/components/layout/FlexBox';
import Button from '@/shared/components/navigation/Button';
import { motion } from 'framer-motion';
import { GoalDialogButton } from '@/feature/goal/components/GoalDialogButton';

interface ProgressBarProps {
  doneTask?: number;
  totalTask?: number;
  isLoading: boolean;
  percentage: number;
  onComplete: () => void;
  isComplete: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export const ConfirmGoalBottomBar = ({
  doneTask,
  totalTask,
  percentage,
  onComplete,
  isLoading,
  isComplete,
  isError = false,
  isSuccess = false,
}: ProgressBarProps) => {
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
      <GoalDialogButton
        isLoading={isLoading}
        isComplete={isComplete}
        isSuccess={isSuccess}
        isError={isError}
        onClick={onComplete}
      />
    </div>
  );
};
