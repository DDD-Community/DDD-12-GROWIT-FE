'use client';

import React from 'react';
import Image from 'next/image';
import { ProgressIndicator } from './components/ProgressIndicator';
import Button from '@/shared/components/input/Button';

interface OnboardingLayoutMobileProps {
  currentStep: number;
  totalSteps: number;
  guideMessage: string;
  subMessage: string;
  onNext: () => void;
  onSkip?: () => void;
  onStepClick?: (step: number) => void;
  children: React.ReactNode;
  isLastStep: boolean;
  characterImage?: string;
}

export function OnboardingLayoutMobile({
  currentStep,
  totalSteps,
  guideMessage,
  subMessage,
  onNext,
  onSkip,
  onStepClick,
  children,
  isLastStep,
  characterImage,
}: OnboardingLayoutMobileProps) {
  return (
    <div className="fixed inset-0 w-full bg-normal-alternative flex flex-col md:hidden overflow-hidden">
      <div className="px-6 pt-4 pb-4 flex justify-center items-end gap-2">
        {characterImage && (
          <div className="relative min-w-[80px] min-h-[80px]">
            <Image src={characterImage} alt="캐릭터" fill className="object-contain" priority />
          </div>
        )}
        <div className="bg-[#2C2C2E] p-[16px] rounded-t-2xl rounded-r-2xl rounded-bl-none rounded-br-2xl shadow-md">
          <div className="flex flex-col flex-1 gap-[8px]">
            <p className="text-white text-[14px] whitespace-pre-line">{guideMessage}</p>
            <p className="text-primary-heavy caption-1-regular leading-relaxed">{subMessage}</p>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 min-h-0">{children}</div>

      {/* Progress indicators below content */}
      <div className="px-6 pb-24 flex-shrink-0">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
      </div>

      {/* Bottom fixed button area */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E] to-[#1C1C1E]/80">
        <div className="flex justify-center gap-4">
          {!isLastStep ? (
            <Button size="lg" layout="icon-right" text="다음" onClick={onNext} />
          ) : (
            <Button size="lg" text="목표 추가하기" onClick={onNext} />
          )}
        </div>
      </div>
    </div>
  );
}
