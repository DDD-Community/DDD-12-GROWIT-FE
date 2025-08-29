'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/dialog';
import Button from '@/shared/components/input/Button';
import { useFetchPostCreateGoal } from './hook';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Image from 'next/image';

export const ConfirmGoalButton = () => {
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
          <FlexBox className="justify-center">
            <Image src="/image/grorong-congratulation.png" alt="onboard" width={120} height={120} />
          </FlexBox>
          <FlexBox direction="col" className="gap-3">
            <p className="text-white text-[16px] whitespace-pre-line text-center">
              {`축하해 🎉 모든 준비가 끝났어!\n 이제 멋진 여정을 함께 시작해보자!`}
            </p>
          </FlexBox>
          <Button size={'ml'} text={`${formValues.duration}주 여정 시작하기`} onClick={handleSuccessConfirm} />
        </DialogContent>
      </Dialog>
    </>
  );
};
