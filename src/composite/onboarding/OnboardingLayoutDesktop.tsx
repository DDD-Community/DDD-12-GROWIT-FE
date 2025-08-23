'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface OnboardingLayoutDesktopProps {
  currentStep: number;
  totalSteps: number;
  guideMessage: string;
  onNext: () => void;
  onSkip?: () => void;
  onStepClick?: (step: number) => void;
  children: React.ReactNode;
  isLastStep: boolean;
  characterDesktopImage?: string;
  characterMobileImage?: string;
}

export function OnboardingLayoutDesktop({
  currentStep,
  totalSteps,
  guideMessage,
  onNext,
  onSkip,
  onStepClick,
  children,
  isLastStep,
  characterDesktopImage,
}: OnboardingLayoutDesktopProps) {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#1C1C1E] hidden md:flex flex-col">
      {/* Skip button at top right */}
      {!isLastStep && (
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
          >
            건너뛰기
          </button>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-8">
        {children}
      </div>

      {/* Progress indicators at bottom center */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              onClick={() => onStepClick?.(index)}
              className="p-2 -m-2 cursor-pointer"
              aria-label={`Go to step ${index + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 hover:bg-gray-400 ${
                  index === currentStep
                    ? 'w-10 bg-white hover:bg-white'
                    : 'w-2 bg-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Guide message and Next button at right bottom */}
      <div className="absolute bottom-12 right-12 flex items-center gap-6">
        {characterDesktopImage && (
          <div className="relative w-[100px] h-[100px] flex-shrink-0">
            <Image
              src={characterDesktopImage}
              alt="캐릭터"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        
        <p className="text-white text-xl font-medium whitespace-pre-line">
          {guideMessage}
        </p>
        
        {!isLastStep ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-10 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            다음
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-14 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            시작하기
          </button>
        )}
      </div>
    </div>
  );
}