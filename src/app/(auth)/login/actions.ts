'use server';

import { redirect } from 'next/navigation';

export async function kakaoLoginAction() {
  // 서버에서 리다이렉트 처리
  const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin/kakao`;

  console.log('🔄 카카오 로그인 리다이렉트 시작');
  console.log('📍 리다이렉트 URL:', redirectUrl);
  console.log('🌐 API URL:', process.env.NEXT_PUBLIC_API_URL);

  redirect(redirectUrl);
}
