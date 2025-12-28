'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FunnelHeader, FunnelHeaderProvider } from '@/shared/components/layout/FunnelHeader';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { WelcomeStep, GoalNameStep, DateStep, CompleteStep } from '@/composite/goal-onboard';
import { ROUTES } from '@/shared/constants/routes';
import { useFetchUserName } from '@/shared/hooks';
import { createCreateGoalMutation } from '@/model/goal/hooks';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { useToast } from '@/shared/components/feedBack/toast';

const TOTAL_STEPS = 4;

interface OnboardFormData {
  goalName: string;
  startDate: string;
  endDate: string;
}

export default function GoalOnboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { fullUserName } = useFetchUserName();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardFormData>({
    goalName: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<{ goalName?: string }>({});

  const { mutate: createGoal, isPending } = useMutation(
    createCreateGoalMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.progress() });
        setCurrentStep(4); // 완료 스텝으로 이동
      },
      onError: () => {
        showToast('목표 생성에 실패했습니다.', 'error');
      },
    })
  );

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 2:
        if (!formData.goalName.trim()) {
          setErrors({ goalName: '목표 이름을 입력해주세요.' });
          return false;
        }
        setErrors({});
        return true;
      case 3:
        return !!formData.startDate && !!formData.endDate;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === 3) {
      // 목표 생성 API 호출
      createGoal({
        category: '',
        name: formData.goalName,
        duration: 0,
        durationDate: {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        toBe: '',
        plans: [],
      });
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const handleComplete = () => {
    router.push(ROUTES.HOME);
    showToast('목표 생성이 완료되었습니다.', 'success');
  };

  const getButtonText = (): string => {
    switch (currentStep) {
      case 1:
        return '목표 설정하기';
      case 3:
        return isPending ? '생성 중...' : '완료';
      case 4:
        return '목표 시작하기';
      default:
        return '다음';
    }
  };

  const isButtonDisabled = (): boolean => {
    if (isPending) return true;

    switch (currentStep) {
      case 2:
        return !formData.goalName.trim();
      case 3:
        return !formData.startDate || !formData.endDate;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep userName={fullUserName} />;
      case 2:
        return (
          <GoalNameStep
            goalName={formData.goalName}
            onChangeGoalName={name => setFormData(prev => ({ ...prev, goalName: name }))}
            error={errors.goalName}
          />
        );
      case 3:
        return (
          <DateStep
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChangeStartDate={date => setFormData(prev => ({ ...prev, startDate: date }))}
            onChangeEndDate={date => setFormData(prev => ({ ...prev, endDate: date }))}
          />
        );
      case 4:
        return <CompleteStep goalName={formData.goalName} />;
      default:
        return null;
    }
  };

  return (
    <FunnelHeaderProvider>
      <main className="flex flex-1 flex-col h-screen overflow-hidden bg-normal">
        {currentStep > 1 && currentStep < 4 && (
          <FunnelHeader
            currentStep={currentStep - 1}
            totalSteps={TOTAL_STEPS - 2}
            onBack={handleBack}
            title="목표 추가"
          />
        )}

        <div className="flex flex-1 flex-col overflow-hidden">{renderStep()}</div>

        <FunnelNextButton
          text={getButtonText()}
          onClick={currentStep === 4 ? handleComplete : handleNext}
          disabled={isButtonDisabled()}
        />
      </main>
    </FunnelHeaderProvider>
  );
}
