import Image from 'next/image';
import React from 'react';

export interface GoalProgressProps {
  totalSteps: number;
  currentStep: number;
}

export const GoalProgressBar = ({ totalSteps, currentStep }: GoalProgressProps) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const calculateStep = (index: number, currentStep: number, totalSteps: number) => {
    const isCurrentOrCompleted = index < currentStep;

    if (isCurrentOrCompleted) {
      // 현재 주차이거나 완료된 주차
      if (totalSteps === 4) {
        return 'bg-brand-neon border-white w-4 h-4'; // brand-neon 대신 green-500 사용
      } else if (totalSteps === 8) {
        return 'bg-accent-blue border-white w-4 h-4'; // accent-blue 대신 blue-500 사용
      } else if (totalSteps === 12) {
        return 'bg-accent-orange border-white w-4 h-4'; // accent-orange 대신 orange-500 사용
      }
    }

    // 미완료 주차
    return 'w-3 h-3 border-gray-300 bg-gray-500';
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="relative w-full">
        {/* 백그라운드 프로그래스 바 */}
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-neon to-accent-blue rounded-full"
            style={{ width: `${Math.max(0, progressPercent + 1)}%` }}
          />
        </div>

        {/* Circle on top of progress bar */}
        {Array.from({ length: totalSteps - 1 }).map((_, index) => (
          <div
            key={index}
            className={`absolute top-1/2 shadown-2xl transform -translate-y-1/2 rounded-full border-2
              ${calculateStep(index, currentStep, totalSteps)}
                
            `}
            style={{ left: `${(index / (totalSteps - 1)) * 100}%` }}
          />
        ))}
        {currentStep === totalSteps ? (
          <Image
            src="/final-gradient.svg"
            alt="last-step"
            width={32}
            height={32}
            className="absolute top-1/2 transform -translate-y-1/2 left-[calc(100%-16px)]"
          />
        ) : (
          <Image
            src="/final.svg"
            alt="last-step"
            width={32}
            height={32}
            className="absolute top-1/2 transform -translate-y-1/2 left-[calc(100%-16px)]"
          />
        )}
      </div>
    </div>
  );
};
