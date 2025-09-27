'use server';

import { redirect } from 'next/navigation';

export async function kakaoLoginAction() {
  const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin/kakao?redirect-uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
  redirect(redirectUrl);
}
