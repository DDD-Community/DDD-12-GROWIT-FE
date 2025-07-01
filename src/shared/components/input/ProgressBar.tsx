import FlexBox from '@/shared/components/layout/FlexBox';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  percentage: number;
  totalTask?: number;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar = ({ percentage, totalTask, label = '작업 완성률', showPercentage = false }: ProgressBarProps) => {
  const value = Math.min(percentage, 100);
  const hasTotalTask = typeof totalTask === 'number' && !isNaN(totalTask);
  const doneTask = hasTotalTask ? Math.min(Math.round((percentage / 100) * totalTask), totalTask) : null;

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {showPercentage && (
        <FlexBox className="w-full justify-between">
          {label && (
            <div className="body-1-medium text-primary-normal">
              {label}{' '}
              {hasTotalTask && doneTask !== null && (
                <span className="ml-2 text-label-alternative">{`${Math.min(doneTask, totalTask)}/${totalTask}`}</span>
              )}
            </div>
          )}
          <span className="title-3-bold text-accent-violet">{value}%</span>
        </FlexBox>
      )}
      <FlexBox className="relative w-full rounded-full h-3 bg-fill-normal">
        <motion.div
          className={`absolute h-full top-0 left-0 rounded-full bg-blue-500`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </FlexBox>
    </div>
  );
};

export default ProgressBar;
