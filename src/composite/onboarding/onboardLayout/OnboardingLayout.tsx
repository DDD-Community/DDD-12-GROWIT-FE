'use client';

import React from 'react';
import { OnboardingLayoutMobile } from './OnboardingLayoutMobile';
import { OnboardingLayoutDesktop } from './OnboardingLayoutDesktop';

interface OnboardingLayoutProps {
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

export function OnboardingLayout(props: OnboardingLayoutProps) {
  return (
    <>
      <OnboardingLayoutMobile {...props} />
      <OnboardingLayoutDesktop {...props} />
    </>
  );
}