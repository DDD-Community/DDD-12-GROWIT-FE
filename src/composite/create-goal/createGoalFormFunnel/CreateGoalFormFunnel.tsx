'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateGoalFormElement } from '@/feature/goal';
import { Step1BasicInfo, Step2MainGoal, Step3WeeklyGoals } from './components';
import { FunnelHeader } from '@/shared/components/layout/FunnelHeader';

interface Props {
  confirmFooter: React.ReactNode;
}

type StepType = 'basic-info' | 'main-goal' | 'weekly-goals';

export const CreateGoalFormFunnel = ({ confirmFooter }: Props) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>('basic-info');

  const steps: StepType[] = ['basic-info', 'main-goal', 'weekly-goals'];
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
                  {currentStep === 'basic-info' && <Step1BasicInfo onNext={() => handleNext('main-goal')} />}
                  {currentStep === 'main-goal' && (
                    <Step2MainGoal onNext={() => handleNext('weekly-goals')} onPrev={() => handleNext('basic-info')} />
                  )}
                  {currentStep === 'weekly-goals' && <Step3WeeklyGoals onPrev={() => handleNext('main-goal')} />}
                </CreateGoalFormElement.FormContainer>
              </div>
            </div>
          </div>
        </div>
        {confirmFooter}
      </div>
    </CreateGoalFormElement.Provider>
  );
};
