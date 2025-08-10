import FlexBox from '@/shared/components/foundation/FlexBox';
import { motion } from 'framer-motion';

interface ProgressProps {
  percent: number;
}

/**
 * @deprecated
 * - 기획변경으로 헤당 컴포넌트는 더이상 사용하지 않음
 */
export const Progress = ({ percent }: ProgressProps) => {
  return (
    <div className="flex flex-col items-center gap-[12px] w-[50%] max-sm:w-full">
      <div className="flex w-full justify-between gap-2 items-center">
        <div className="px-3 rounded-full bg-accent-violet/20 ">
          <span className="text-accent-fg-violet text-xs font-light">주간 투두 완료율</span>
        </div>
        <span className="text-accent-fg-violet text-ml font-bold">{percent}%</span>
      </div>
      <FlexBox className="relative w-full rounded-full h-2 bg-fill-normal">
        <motion.div
          className={`absolute h-full top-0 left-0 rounded-full bg-accent-violet`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </FlexBox>
    </div>
  );
};
