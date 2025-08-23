'use client';

import React from 'react';
import { OnboardingLayoutMobile } from './OnboardingLayoutMobile';
import { OnboardingLayoutDesktop } from './OnboardingLayoutDesktop';

interface OnboardingLayoutProps {
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

export function OnboardingLayout(props: OnboardingLayoutProps) {
  return (
    <>
      <OnboardingLayoutMobile {...props} />
      <OnboardingLayoutDesktop {...props} />
    </>
  );
}