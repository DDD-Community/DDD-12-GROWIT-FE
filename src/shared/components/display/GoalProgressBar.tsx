import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export interface GoalProgressProps {
  totalSteps: 4 | 8 | 12;
  currentStep: number;
}

export const GoalProgressBar = ({ totalSteps, currentStep }: GoalProgressProps) => {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="relative w-full flex justify-between">
        {/* {Array.from({ length: totalSteps }, (_, i) => (
          <Image
            key={i}
            src="/meteor.svg"
            alt="meteor"
            width={24}
            height={24}
            className={i + 1 <= currentStep ? 'opacity-100' : 'opacity-40'} // 진행된 스텝은 선명, 나머지는 흐리게
          />
        ))} */}
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-fill-normal rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
