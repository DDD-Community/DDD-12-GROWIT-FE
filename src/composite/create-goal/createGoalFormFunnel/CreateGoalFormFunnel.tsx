'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateGoalFormElement } from '@/feature/goal';
import { Step1GoalCategory, Step2GoalName, Step3Duration, Step4Summary } from './components';
import { FunnelHeader } from '@/shared/components/layout/FunnelHeader';

type StepType = 'goal-category' | 'goal-name' | 'duration' | 'summary';

export const CreateGoalFormFunnel = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>('goal-category');

  const steps: StepType[] = ['goal-category', 'goal-name', 'duration', 'summary'];
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

  return (
    <CreateGoalFormElement.Provider>
      <div className="flex flex-1 flex-col">
        <FunnelHeader
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
          onBack={handleBack}
          title="목표 생성하기"
        />
        <div className="flex flex-1 flex-col sm:px-[20px] overflow-y-auto">
          <div className="flex flex-col p-[20px]">
            <div className="max-w-[868px] w-full mx-auto">
              <div className="max-w-[646px] w-full mx-auto">
                <CreateGoalFormElement.FormContainer>
                  {currentStep === 'goal-category' && <Step1GoalCategory onNext={() => handleNext('goal-name')} />}
                  {currentStep === 'goal-name' && <Step2GoalName onNext={() => handleNext('duration')} />}
                  {currentStep === 'duration' && <Step3Duration onNext={() => handleNext('summary')} />}
                  {currentStep === 'summary' && <Step4Summary />}
                </CreateGoalFormElement.FormContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CreateGoalFormElement.Provider>
  );
};
