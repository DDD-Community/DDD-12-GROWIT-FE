'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/composite/onboarding/onboardLayout';
import { OnboardingContent, onboardingSteps } from '@/composite/onboarding/onboardContent';
import { ROUTES } from '@/shared/constants/routes';

export default function OnBoardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push(ROUTES.CREATE_GOAL);
    }
  };

  const handleSkip = () => {
    router.push(ROUTES.CREATE_GOAL);
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
      onNext={handleNext}
      onSkip={handleSkip}
      onStepClick={handleStepClick}
      isLastStep={isLastStep}
      guideMessage={currentStepData.guideMessage}
      subMessage={currentStepData.subMessage}
      characterImage={currentStepData.characterImage}
    >
      <OnboardingContent
        altText={currentStepData.altText}
        desktopImage={currentStepData.desktopImage}
        mobileImage={currentStepData.mobileImage}
      />
    </OnboardingLayout>
  );
}
