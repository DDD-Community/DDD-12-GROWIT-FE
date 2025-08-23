'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  OnboardingLayout,
  OnboardingContent,
  onboardingSteps,
} from '@/composite/onboarding';

export default function OnBoardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 온보딩 완료 후 홈으로 이동
      router.push('/home');
    }
  };

  const handleSkip = () => {
    // 스킵 시 바로 홈으로 이동
    router.push('/home');
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={onboardingSteps.length}
      guideMessage={currentStepData.guideMessage}
      onNext={handleNext}
      onSkip={handleSkip}
      onStepClick={handleStepClick}
      isLastStep={isLastStep}
      characterDesktopImage={currentStepData.characterDesktopImage}
      characterMobileImage={currentStepData.characterMobileImage}
    >
      <OnboardingContent
        desktopImage={currentStepData.desktopImage}
        mobileImage={currentStepData.mobileImage}
        altText={currentStepData.altText}
        characterDesktopImage={currentStepData.characterDesktopImage}
        characterMobileImage={currentStepData.characterMobileImage}
      />
    </OnboardingLayout>
  );
}
