'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/dialog';
import Button from '@/shared/components/input/Button';
import { useFetchPostCreateGoal } from './hook';

export const ConfirmGoalBottomBar = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { handleSubmit, getValues } = useFormContext<GoalFormData>();
  const { isSuccess, isError, isLoading, createGoal } = useFetchPostCreateGoal();

  const formValues = getValues();
  const isFormValid = formValues.category && formValues.name && formValues.durationDate.startDate;
  const isButtonEnabled = !isLoading && (isFormValid || isError);

  const getButtonText = () => {
    if (isLoading) return '로딩중';
    return '목표 작성 완료';
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    router.push('/home');
  };

  useEffect(() => {
    if (isSuccess) setShowSuccessDialog(true);
  }, [isSuccess]);

  return (
    <>
      <FunnelNextButton
        text={getButtonText()}
        variant="brand"
        disabled={!isButtonEnabled}
        onClick={e => {
          handleSubmit(createGoal)(e);
        }}
      />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-center">축하한다냥 🐱</DialogTitle>
            <DialogDescription className="text-center">드디어 4주간 여정의 도착지가 정해졌다냥!</DialogDescription>
          </DialogHeader>
          <Button size={'ml'} text={'4주 여정 시작하기'} onClick={handleSuccessConfirm} />
        </DialogContent>
      </Dialog>
    </>
  );
};
