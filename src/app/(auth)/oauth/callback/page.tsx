'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { KakaoSignupForm } from '@/composite/signup/signUpForm/KakaoSignupForm';
import { tokenController } from '@/shared/lib/token';
import { useToast } from '@/shared/components/feedBack/toast';

export default function OAuthCallbackPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [hasTokens, setHasTokens] = useState(false);

  useEffect(() => {
    const handleTokenProcessing = async () => {
      try {
        const hashed = window.location.hash.replace('#', '');
        const url = new URLSearchParams(hashed);
        const accessToken = url.get('accessToken');
        const refreshToken = url.get('refreshToken');

        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          redirect('/login');
        }
        if (accessToken && refreshToken) {
          setHasTokens(true);
          tokenController.setTokens(accessToken, refreshToken);
          setTimeout(() => {
            redirect('/home');
          }, 50);
        } else {
          setHasTokens(false);
        }
      } catch (error: any) {
        console.error('토큰 처리 중 오류:', error);
        showToast('로그인 처리 중 오류가 발생했습니다.', 'error');
        setHasTokens(false);
      } finally {
        setIsLoading(false);
      }
    };
    handleTokenProcessing();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#1C1C1E] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-100 font-medium">로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  // 토큰이 있어서 로그인 성공한 경우
  if (hasTokens) {
    return (
      <div className="flex min-h-screen bg-[#1C1C1E] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-100 font-medium">
            로그인 성공! <br /> 홈으로 이동 중...
          </p>
        </div>
      </div>
    );
  }

  // 아직 가입이 안된 경우 (회원가입 폼 표시)
  return (
    <div className="flex h-screen bg-[#1C1C1E] overflow-hidden">
      {/* 왼쪽 회원가입 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2">
        {/* 고정 헤더 */}
        <div className="flex flex-col items-start gap-[40px] p-10 md:p-[20px] pb-0">
          <h1 className="text-2xl font-bold text-white pl-[4px]">GROWIT</h1>
          <Link href="/login" className="text-white">
            <span className="inline-flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              뒤로
            </span>
          </Link>
        </div>

        {/* 스크롤 가능한 폼 섹션 */}
        <div className="flex-1 overflow-y-auto px-10 md:px-[20px] pt-8 md:pt-[20px]">
          <div className="flex flex-col justify-center max-w-md mx-auto w-full gap-5">
            <h2 className="text-2xl font-bold mb-2 text-white">
              간단한 회원가입으로 <br />
              쉽고 빠르게 시작하세요!
            </h2>
            <KakaoSignupForm />
          </div>
        </div>
      </div>

      {/* 오른쪽 이미지 섹션 - lg 크기 이상에서만 표시 */}
      <div className="hidden lg:flex w-1/2 m-4 p-4 items-center justify-center">
        <div className="relative w-full h-full rounded-[16px]">
          <Image src="/landing.png" alt="Dashboard Preview" fill priority className="object-contain" />
        </div>
      </div>
    </div>
  );
}
