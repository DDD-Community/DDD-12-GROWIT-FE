import { useState } from 'react';
import { AxiosError } from 'axios';
import { SignupFormData } from '@/app/signup/type';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/toast';
import { postSignUp } from '@/app/signup/api';

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
