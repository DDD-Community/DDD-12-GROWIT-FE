'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { FunnelHeader, FunnelHeaderProvider } from '@/shared/components/layout/FunnelHeader';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { SwipeActionButton } from '@/shared/components/input/SwipeActionButton';
import { WelcomeStep, GoalNameStep, DateStep, CompleteStep } from '@/composite/goal-onboard';
import { ROUTES } from '@/shared/constants/routes';
import { useFetchUserName } from '@/shared/hooks';
import { GoalMutation } from '@/model/goal/queries';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { userApi, UserQueryKeys } from '@/model/user';
import { useToast } from '@/shared/components/feedBack/toast';
import { CreateGoalFormElement } from '@/feature/goal';
import { GoalFormData } from '@/shared/type/form';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';

const TOTAL_STEPS = 4;

function GoalOnboardContent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { fullUserName } = useFetchUserName();

  const [currentStep, setCurrentStep] = useState(1);
  const [createdGoalData, setCreatedGoalData] = useState<CreateGoalResponseData | null>(null);

  const { watch } = useFormContext<GoalFormData>();
  const goalName = watch('name');
  const startDate = watch('durationDate.startDate');
  const endDate = watch('durationDate.endDate');

  const { mutate: createGoal, isPending } = useMutation(
    GoalMutation.createGoal({
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.progress() });
        setCreatedGoalData(data);
        setCurrentStep(4); // 완료 스텝으로 이동
      },
      onError: () => {
        showToast('목표 생성에 실패했습니다.', 'error');
      },
    })
  );

  const { mutate: updateOnboardStatus } = useMutation({
    mutationFn: userApi.putOnboardStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UserQueryKeys.onboardStatus() });
      setCurrentStep(2);
    },
    onError: () => {
      showToast('온보딩 등록에 실패했습니다.', 'error');
    },
  });

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 2:
        return !!goalName?.trim();
      case 3:
        return !!startDate && !!endDate;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === 1) {
      // 온보딩 등록 API 호출
      updateOnboardStatus();
      return;
    }

    if (currentStep === 3) {
      // 목표 생성 API 호출
      createGoal({
        name: goalName,
        duration: {
          startDate,
          endDate,
        },
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
        return !goalName?.trim();
      case 3:
        return !startDate || !endDate;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep userName={fullUserName} />;
      case 2:
        return <GoalNameStep />;
      case 3:
        return <DateStep />;
      case 4:
        return (
          <CompleteStep goalName={goalName} startDate={startDate} endDate={endDate} planet={createdGoalData?.planet} />
        );
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

        {currentStep === 4 ? (
          <div className="fixed bottom-0 left-0 right-0 p-5 max-w-md mx-auto">
            <SwipeActionButton text="목표 시작하기" onSwipeComplete={handleComplete} />
          </div>
        ) : (
          <FunnelNextButton text={getButtonText()} onClick={handleNext} disabled={isButtonDisabled()} />
        )}
      </main>
    </FunnelHeaderProvider>
  );
}

export default function GoalOnboardPage() {
  return (
    <CreateGoalFormElement.Provider>
      <GoalOnboardContent />
    </CreateGoalFormElement.Provider>
  );
}
