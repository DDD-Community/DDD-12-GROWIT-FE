'use client';

import { useState, useCallback } from 'react';
import { postAddTodo } from './api';
import { useToast } from '@/shared/components/feedBack/toast';
import { Axios, AxiosError } from 'axios';

export function useFetchAddTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const addTodo = useCallback(async (request: Parameters<typeof postAddTodo>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postAddTodo(request);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addTodo, loading, error, data };
}

// 확장된 Plan 타입 (weekOfMonth 포함)
interface ExtendedPlan {
  id: string;
  content: string;
  weekOfMonth?: number;
}

// 확장된 Goal 타입
interface ExtendedGoal {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
  plans: ExtendedPlan[];
}

export function useAddTodoForm(
  goal: ExtendedGoal,
  selectedPlanId: string,
  onWeekChange?: (weekOfMonth: number) => void,
  onToggleWeekend?: (showWeekend: boolean) => void
) {
  const [date, setDate] = useState<Date>();
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTodo } = useFetchAddTodo();
  const { showToast } = useToast();

  // Goal의 시작일과 종료일을 Date 객체로 변환
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  // 날짜 선택 핸들러
  const handleDateSelect = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
    // 날짜가 변경되면 content 에러 초기화
    setContentError(null);
  }, []);

  // 내용 입력 핸들러
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);

    // 5글자 미만일 때 에러 표시
    if (value.length > 0 && value.length < 5) {
      setContentError('5글자 이상 입력해주세요.');
    } else {
      setContentError(null);
    }
  }, []);

  // 투두 추가 핸들러
  const handleAddTodo = useCallback(async () => {
    if (!date) {
      showToast('날짜를 선택해주세요.', 'warning');
      return;
    }

    if (!content || content.length < 5) {
      setContentError('5글자 이상 입력해주세요.');
      showToast('5글자 이상 입력해주세요.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // 로컬 시간대를 고려한 날짜 형식 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const { data } = await addTodo({
        goalId: goal.id,
        planId: selectedPlanId,
        date: formattedDate, // YYYY-MM-DD 형식
        content,
      });

      // 성공 시 상태 초기화
      setDate(undefined);
      setContent('');
      setContentError(null);

      showToast('투두가 성공적으로 추가되었습니다.', 'success');

      // weekOfMonth 정보가 있으면 해당 주차로 이동
      if (data.plan?.weekOfMonth && onWeekChange) {
        onWeekChange(data.plan.weekOfMonth);
      }

      // 날짜가 주말인지 확인하고 주말 표시 토글
      const dayOfWeek = date.getDay(); // 0: 일요일, 6: 토요일
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (onToggleWeekend) {
        onToggleWeekend(isWeekend); // 주말이면 true, 평일이면 false
      }

      return true; // 성공 시 true 반환
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showToast(`${error.response?.data.message}`, 'error');
      }
      return false; // 실패 시 false 반환
    } finally {
      setIsSubmitting(false);
    }
  }, [date, content, addTodo, goal.id, showToast, onWeekChange, onToggleWeekend]);

  // 폼 초기화
  const resetForm = useCallback(() => {
    setDate(undefined);
    setContent('');
    setContentError(null);
  }, []);

  // 폼 유효성 검사
  const isFormValid = useCallback(() => {
    return date && content && content.length >= 5;
  }, [date, content]);

  return {
    // 상태
    date,
    content,
    contentError,
    startDate,
    endDate,
    isSubmitting,

    // 핸들러
    handleDateSelect,
    handleContentChange,
    handleAddTodo,
    resetForm,

    // 유틸리티
    isFormValid,
  };
}
