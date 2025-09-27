'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { postCreateGoal } from './api';
import { AxiosError } from 'axios';
import { CommonError } from '@/shared/type/response';

export const useFetchPostCreateGoal = (initialData?: GoalFormData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const hasInitialized = useRef(false);

  const createGoal = useCallback(async (data: GoalFormData) => {
    const startTime = performance.now();
    console.log('🚀 createGoal 시작:', new Date().toISOString());

    try {
      reset();
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      setError(null);

      // 서버 요청과 최소 로딩 시간을 병렬로 처리
      const [result] = await Promise.all([
        postCreateGoal(data),
        new Promise(resolve => setTimeout(resolve, 2000)), // 2초 최소 로딩 시간
      ]);

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
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log('✅ createGoal 완료:', new Date().toISOString());
      console.log(`⏱️  총 실행 시간: ${duration.toFixed(2)}ms (${(duration / 1000).toFixed(2)}초)`);
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setData(null);
  }, []);

  // 페이지 마운트 시 자동 패칭 (최초 1회만)
  useEffect(() => {
    if (initialData && !hasInitialized.current) {
      hasInitialized.current = true;
      createGoal(initialData);
    }
    return reset;
  }, [initialData, createGoal]);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    createGoal,
  };
};
