'use client';

import { useState, useEffect } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { useToast } from '@/shared/components/feedBack/toast';
import { postCreateGoal } from './api';
import { AxiosError } from 'axios';
import { CommonError } from '@/shared/type/response';

export const useFetchPostCreateGoal = (initialData?: GoalFormData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createGoal = async (data: GoalFormData) => {
    try {
      reset();
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      setError(null);
      const result = await postCreateGoal(data);
      setData(result);
      setIsSuccess(true);
      return result;
    } catch (err) {
      setIsError(true);
      let errorMessage = '목표 생성에 실패했습니다.';
      if (
        typeof AxiosError !== 'undefined' &&
        err &&
        typeof err === 'object' &&
        'isAxiosError' in err &&
        (err as AxiosError<CommonError>).isAxiosError
      ) {
        errorMessage = (err as AxiosError<CommonError>).response?.data?.message ?? errorMessage;
      }
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setData(null);
  };

  // 페이지 마운트 시 자동 패칭
  useEffect(() => {
    if (initialData) {
      createGoal(initialData);
    }
  }, [initialData]);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    createGoal,
    reset,
  };
};
