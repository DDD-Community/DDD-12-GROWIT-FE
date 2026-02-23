import { useState } from 'react';
import { AxiosError } from 'axios';
import { KakaoSignupFormData, SignupFormData, SocialLoginType } from '@/composite/signup/signUpForm/type';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { postSignUp, postKakaoSignUp, postAppSocialSignUp } from '@/composite/signup/signUpForm/api';
import { authService } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

export function useFetchSignUp() {
  const { showToast } = useToast();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);

  const fetchSignUp = async (data: SignupFormData) => {
    try {
      setSubmitting(true);
      await postSignUp(data);
      setSubmitting(false);
      setSignupSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError<CommonError>;
      if (axiosError.isAxiosError && axiosError.response?.data.message) {
        const errorMessage = axiosError.response
          ? axiosError.response?.data.message
          : '예상치 못한 문제가 발생했습니다.';
        showToast(errorMessage);
      }
      setSubmitting(false);
      setSignupSuccess(false);
    }
  };

  return {
    isSubmitting,
    isSignupSuccess,
    fetchSignUp,
  };
}

export function useFetchKakaoSignUp() {
  const { showToast } = useToast();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);
  const router = useRouter();

  const fetchKakaoSignUp = async (data: KakaoSignupFormData) => {
    try {
      setSubmitting(true);
      const hashed = window.location.hash.replace('#', '');
      const url = new URLSearchParams(hashed);
      const registrationToken = url.get('registrationToken');

      if (!registrationToken) {
        showToast('카카오 등록 토큰을 불러오는데 실패했습니다. 다시 시도해주세요.');
        router.push('/login');
        return;
      }
      await postKakaoSignUp(data, registrationToken);
      setSubmitting(false);
      setSignupSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError<CommonError>;
      if (axiosError.isAxiosError && axiosError.response?.data.message) {
        const errorMessage = axiosError.response
          ? axiosError.response?.data.message
          : '예상치 못한 문제가 발생했습니다.';
        showToast(errorMessage);
      }
      setSubmitting(false);
      setSignupSuccess(false);
    }
  };

  return {
    isSubmitting,
    isSignupSuccess,
    fetchKakaoSignUp,
  };
}

interface UseAppSocialSignupProps {
  registrationToken: string;
  socialType: SocialLoginType;
}

export function useFetchAppSocialSignup({ registrationToken, socialType }: UseAppSocialSignupProps) {
  const { showToast } = useToast();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSignupSuccess, setSignupSuccess] = useState<boolean>(false);

  const fetchAppSocialSignup = async (data: KakaoSignupFormData) => {
    try {
      setSubmitting(true);

      const response = await postAppSocialSignUp(data, registrationToken, socialType);

      // 토큰 저장 → AppBridgeProvider가 자동으로 앱에 SYNC_TOKEN_TO_APP 전송
      authService.login({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      setSubmitting(false);
      setSignupSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError<CommonError>;
      const errorMessage = axiosError.response?.data.message || '회원가입에 실패했습니다.';
      showToast(errorMessage);
      setSubmitting(false);
      setSignupSuccess(false);
    }
  };

  return {
    isSubmitting,
    isSignupSuccess,
    fetchAppSocialSignup,
  };
}
