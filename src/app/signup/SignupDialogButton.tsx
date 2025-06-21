'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/dialog';

interface SignupButtonProps {
  isValid: boolean;
}

export const SignupDialogButton = ({ isValid }: SignupButtonProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSignup = async () => {
    if (!isValid) return;
    setShowSuccessDialog(true);

    // try {
    //   setIsSubmitting(true);
    //
    //   // 회원가입 API 호출
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('회원가입에 실패했습니다.');
    //   }
    //
    //   // 성공 시 Dialog 표시
    //   setShowSuccessDialog(true);
    // } catch (error) {
    //   console.error('회원가입 실패:', error);
    //   // TODO: 에러 처리 (토스트 메시지 등)
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    router.push('/login');
  };

  return (
    <>
      <button
        onClick={handleSignup}
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isValid ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#2C2C2E] text-gray-500 cursor-not-allowed'
        }`}
      >
        가입하기
      </button>
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-center">회원가입 완료</DialogTitle>
            <DialogDescription className="text-center">
              GROWIT 회원가입이 성공적으로 완료되었습니다.
              <br />
              로그인 페이지로 이동합니다.
            </DialogDescription>
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
