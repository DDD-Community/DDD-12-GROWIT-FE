'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { appBridge } from '@/shared/lib/appBridge';
import type { OAuthSignupPayload } from '@/shared/lib/appBridge';
import { AppSocialSignupForm } from '@/composite/signup/signUpForm';

export default function OAuthAppSignupPage() {
  const router = useRouter();
  const [signupData, setSignupData] = useState<OAuthSignupPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dataReceivedRef = useRef(false);

  useEffect(() => {
    // 1. 앱 환경이 아니면 일반 웹 회원가입으로 리다이렉트
    if (!appBridge.isInApp()) {
      router.replace('/signup');
      return;
    }

    // 2. 앱에 준비 완료 알림
    appBridge.sendToApp('READY');

    // 3. 앱에서 회원가입 데이터 수신
    const unsubscribe = appBridge.onAppMessage<OAuthSignupPayload>(message => {
      if (message.type === 'OAUTH_SIGNUP' && message.payload) {
        dataReceivedRef.current = true;
        setSignupData(message.payload);
      }
    });

    // 4. 타임아웃 처리 (10초)
    const timeoutId = setTimeout(() => {
      if (!dataReceivedRef.current) {
        setError('회원가입 데이터를 받지 못했습니다.');
      }
    }, 10000);

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [router]);

  // 에러 상태
  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-normal-alternative text-white">
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={() => appBridge.sendToApp('NAVIGATE_TO_NATIVE_LOGIN')}
          className="px-6 py-3 bg-white text-black rounded-lg font-medium"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // 로딩 상태
  if (!signupData) {
    return (
      <div className="flex h-screen items-center justify-center bg-normal-alternative">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  // 회원가입 폼 렌더링
  return (
    <div className="flex flex-col h-screen bg-normal-alternative">
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <h1 className="text-xl font-bold text-white mb-6">회원가입</h1>
        <AppSocialSignupForm socialType={signupData.socialLoginType} registrationToken={signupData.registrationToken} />
      </div>
    </div>
  );
}
