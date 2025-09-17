'use server';

import { redirect } from 'next/navigation';

export async function kakaoLoginAction() {
  // 서버에서 리다이렉트 처리
  const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin/kakao?redirect-uri=http://localhost:3000/oauth/callback`;
  redirect(redirectUrl);
}
