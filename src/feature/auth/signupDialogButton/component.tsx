'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/dialog';
import Button from '@/shared/components/navigation/Button';

interface SignupButtonProps {
  isValid: boolean;
  onClick: () => void;
  isSignupSuccess: boolean;
  isSubmitting: boolean;
}

export const SignupDialogButton = ({ isValid, onClick, isSignupSuccess, isSubmitting }: SignupButtonProps) => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (isSignupSuccess) setShowSuccessDialog(true);
  }, [isSignupSuccess]);

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    router.push('/login');
  };

  return (
    <>
      <Button
        size={'ml'}
        onClick={onClick}
        disabled={!isValid || isSubmitting}
        text={isSubmitting ? '가입 중...' : '가입하기'}
      />
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-center">회원가입 완료</DialogTitle>
            <DialogDescription className="text-center">GROWIT 에 오신것을 환영해요!.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <button onClick={handleSuccessConfirm} className="w-full">
              확인
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
