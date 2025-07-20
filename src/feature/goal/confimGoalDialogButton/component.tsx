'use client';

import { useEffect, useState } from 'react';
import Button from '@/shared/components/navigation/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/dialog';
import { useRouter } from 'next/navigation';

interface GoalDialogButtonProps {
  isLoading: boolean;
  isComplete: boolean;
  isSuccess: boolean;
  isError: boolean;
  onClick: () => void;
}

export const ConfirmGoalDialogButton = ({
  isLoading,
  isError,
  isComplete,
  isSuccess,
  onClick,
}: GoalDialogButtonProps) => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const isButtonEnabled = !isLoading && (isComplete || isError);
  const getButtonText = () => {
    if (isLoading) return '로딩중';
    if (isError) return '다시 시도';
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
      <FlexBox className="max-sm:w-full sm:min-w-[140px]">
        <Button size="xl" text={getButtonText()} onClick={onClick} disabled={!isButtonEnabled} />
      </FlexBox>
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
