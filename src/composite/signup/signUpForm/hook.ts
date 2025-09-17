import { useState } from 'react';
import { AxiosError } from 'axios';
import { KakaoSignupFormData, SignupFormData } from '@/composite/signup/signUpForm/type';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { postSignUp, postKakaoSignUp } from '@/composite/signup/signUpForm/api';
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
