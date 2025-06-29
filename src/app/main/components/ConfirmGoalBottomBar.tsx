import FlexBox from '@/shared/components/layout/FlexBox';
import Button from '@/shared/components/navigation/Button';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  doneTask?: number;
  totalTask?: number;
  isLoading: boolean;
  percentage: number;
  onComplete: () => void;
  isComplete: boolean;
  isError?: boolean;
}

export const ConfirmGoalBottomBar = ({
  isLoading,
  doneTask,
  totalTask,
  percentage,
  onComplete,
  isComplete,
  isError = false,
}: ProgressBarProps) => {
  const isButtonEnabled = !isLoading && (isComplete || isError);

  const getButtonText = () => {
    if (isLoading) return '로딩중';
    if (isError) return '다시 시도';
    return '목표 작성 완료';
  };

  return (
    <div className="w-full flex items-center px-[40px] pt-[12px] pb-[16px] gap-[95px] border-t border-line-normal">
      <div className="flex flex-col gap-2 items-start w-full">
        <FlexBox className="w-full justify-between">
          <div className="body-1-medium text-primary-normal">
            <span className="title-3-bold text-accent-violet">{percentage}%</span>
            {/*<span className="ml-2 text-label-alternative">{`${Math.min(doneTask, totalTask)}/${totalTask}`}</span>*/}
          </div>
        </FlexBox>
        <FlexBox className="relative w-full rounded-full h-3 bg-fill-normal">
          <motion.div
            className={`absolute h-full top-0 left-0 rounded-full bg-accent-fg-violet`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </FlexBox>
      </div>
      <FlexBox className="min-w-[130px]">
        <Button
          size="ml"
          text={getButtonText()}
          onClick={onComplete}
          disabled={!isButtonEnabled}
          className={isButtonEnabled ? '' : 'opacity-50 cursor-not-allowed'}
        />
      </FlexBox>
    </div>
  );
};
