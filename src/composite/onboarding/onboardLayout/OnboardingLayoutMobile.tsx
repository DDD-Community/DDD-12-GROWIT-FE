'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { ProgressIndicator } from './components/ProgressIndicator';

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
    <div className="fixed inset-0 w-full h-full bg-[#1C1C1E] flex flex-col md:hidden overflow-hidden">
      {/* Top area with guide message and character */}
      <div className="px-6 pt-12 pb-4 flex-shrink-0">
        {/* Guide message with character */}
        <div className="flex items-center justify-center gap-4">
          {characterImage && (
            <div className="relative w-[60px] h-[60px] flex-shrink-0">
              <Image src={characterImage} alt="캐릭터" fill className="object-contain" priority />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-white text-lg font-medium text-center whitespace-pre-line">{guideMessage}</p>
            <p className="text-white text-lg font-medium text-center whitespace-pre-line">{subMessage}</p>
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
            <>
              <button onClick={onSkip} className="px-6 py-3 text-gray-400 hover:text-gray-300 transition-colors">
                건너뛰기
              </button>
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onNext}
              className="px-12 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium w-full max-w-[300px]"
            >
              시작하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
