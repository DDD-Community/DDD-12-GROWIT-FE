'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateGoalFormElement, useCreateGoalState } from '@/feature/goal';
import {
  Step0Onboarding,
  Step1GoalCategory,
  Step2GoalName,
  Step3Duration,
  Step4Matching,
  Step5Summary,
} from './components';
import { FunnelHeader, FunnelHeaderProvider } from '@/shared/components/layout/FunnelHeader';

type StepType = 'onboarding' | 'goal-category' | 'goal-name' | 'duration' | 'summary' | 'matching';

const CreateGoalFormFunnelContent = () => {
  const router = useRouter();
  const createGoalState = useCreateGoalState();

  const [currentStep, setCurrentStep] = useState<StepType>('onboarding');
  const steps: StepType[] = ['onboarding', 'goal-category', 'goal-name', 'duration', 'matching', 'summary'];
  const currentStepIndex = steps.indexOf(currentStep) + 1;
  const totalSteps = steps.length;

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex === 0) {
      router.back();
    } else {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleNext = (nextStep: StepType) => {
    setCurrentStep(nextStep);
  };

  const handleSummaryNext = () => {
    router.push('/home');
  };

  return (
    <div className="flex flex-col">
      <CreateGoalFormElement.Provider>
        <FunnelHeaderProvider>
          <FunnelHeader currentStep={currentStepIndex} totalSteps={totalSteps} onBack={handleBack} />
          <div className="flex flex-1 flex-col w-full mx-auto">
            <CreateGoalFormElement.FormContainer>
              {currentStep === 'onboarding' && <Step0Onboarding onNext={() => handleNext('goal-category')} />}
              {currentStep === 'goal-category' && <Step1GoalCategory onNext={() => handleNext('goal-name')} />}
              {currentStep === 'goal-name' && <Step2GoalName onNext={() => handleNext('duration')} />}
              {currentStep === 'duration' && <Step3Duration onNext={() => handleNext('matching')} />}
              {currentStep === 'matching' && (
                <Step4Matching
                  onBack={() => handleBack()}
                  onNext={() => handleNext('summary')}
                  createGoalState={createGoalState}
                />
              )}
              {currentStep === 'summary' && (
                <Step5Summary onNext={() => handleSummaryNext()} createGoalResult={createGoalState.data} />
              )}
            </CreateGoalFormElement.FormContainer>
          </div>
        </FunnelHeaderProvider>
      </CreateGoalFormElement.Provider>
    </div>
  );
};

export const CreateGoalFormFunnel = () => {
  return (
    <CreateGoalFormElement.Provider>
      <CreateGoalFormFunnelContent />
    </CreateGoalFormElement.Provider>
  );
};
