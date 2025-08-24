'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { ProgressIndicator } from './components/ProgressIndicator';
import Button from '@/shared/components/input/Button';

interface OnboardingLayoutDesktopProps {
  currentStep: number;
  totalSteps: number;
  guideMessage: string;
  subMessage: string;
  onNext: () => void;
  onStepClick?: (step: number) => void;
  children: React.ReactNode;
  isLastStep: boolean;
  characterImage?: string;
}

export function OnboardingLayoutDesktop({
  currentStep,
  totalSteps,
  guideMessage,
  subMessage,
  onNext,
  onStepClick,
  children,
  isLastStep,
  characterImage,
}: OnboardingLayoutDesktopProps) {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#1C1C1E] hidden md:flex flex-col">
      {/* 메인 컨텐츠 랜더링 */}
      <div className="flex-1 flex items-center justify-center px-8">{children}</div>

      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
      </div>

      <div className="absolute bottom-12 right-12 flex items-end">
        {characterImage && (
          <div className="relative w-[100px] h-[100px]">
            <Image src={characterImage} alt="캐릭터" fill className="object-contain" priority />
          </div>
        )}
        <div className="inline-block">
          <div className="bg-[#2C2C2E] p-[20px] rounded-t-2xl rounded-r-2xl rounded-bl-none rounded-br-2xl shadow-md inline-block">
            <div className="flex flex-col gap-[8px] w-[256px]">
              <p className="text-white text-[16px] whitespace-pre-line">{guideMessage}</p>
              <p className="text-primary-heavy caption-1-regular leading-relaxed">{subMessage}</p>
            </div>
            <div className="flex justify-end mt-[20px]">
              <div className="flex">
                {!isLastStep ? (
                  <Button
                    size="sm"
                    layout="icon-right"
                    text="다음"
                    onClick={onNext}
                    icon={<ChevronRight className="w-5 h-5" />}
                  />
                ) : (
                  <Button size="sm" layout="icon-right" text="시작하기" onClick={onNext} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
