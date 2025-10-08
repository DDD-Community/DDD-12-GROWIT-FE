'use client';

import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/shared/components/feedBack/toast';
import { AxiosError } from 'axios';
import { Goal } from '@/shared/type/goal';
import { useFetchAddTodo } from './useFetchAddTodo';

export function useAddTodoForm(
  goal: Goal,
  selectedPlanId: string,
  selectedDate: Date | null,
  onWeekChange?: (weekOfMonth: number) => void
) {
  const [date, setDate] = useState<Date | undefined>(selectedDate || undefined);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTodo } = useFetchAddTodo();
  const { showToast } = useToast();

  // Goal의 시작일과 종료일을 Date 객체로 변환
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  // Update date when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

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

      // 성공 시 content만 초기화, date는 selectedDate 유지
      setContent('');
      setContentError(null);
      // Keep the date as selectedDate for next todo
      if (selectedDate) {
        setDate(selectedDate);
      }

      showToast('투두가 성공적으로 추가되었습니다.', 'success');

      // weekOfMonth 정보가 있으면 해당 주차로 이동
      if (data.plan?.weekOfMonth && onWeekChange) {
        onWeekChange(data.plan.weekOfMonth);
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
  }, [date, content, addTodo, goal.id, selectedPlanId, showToast, onWeekChange]);

  // 폼 초기화 - selectedDate가 있으면 그 값으로, 없으면 undefined로 초기화
  const resetForm = useCallback(() => {
    setDate(selectedDate || undefined);
    setContent('');
    setContentError(null);
  }, [selectedDate]);

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
