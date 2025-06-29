import FlexBox from '@/shared/components/layout/FlexBox';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  doneTask: number;
  totalTask: number;
  label?: string;
}

const ProgressBar = ({ doneTask, totalTask, label = '작업 완성률' }: ProgressBarProps) => {
  const percentage = totalTask > 0 ? Math.min(Math.round((doneTask / totalTask) * 100), 100) : 0;
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <FlexBox className="w-full justify-between">
        {label && (
          <div className="body-1-medium text-primary-normal">
            {label}{' '}
            <span className="ml-2 text-label-alternative">{`${Math.min(doneTask, totalTask)}/${totalTask}`}</span>
          </div>
        )}
        <span className="title-3-bold text-accent-violet">{percentage}%</span>
      </FlexBox>
      <FlexBox className="relative w-full rounded-full h-3 bg-fill-normal">
        <motion.div
          className={`absolute h-full top-0 left-0 rounded-full bg-blue-500`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </FlexBox>
    </div>
  );
};

export default ProgressBar;
