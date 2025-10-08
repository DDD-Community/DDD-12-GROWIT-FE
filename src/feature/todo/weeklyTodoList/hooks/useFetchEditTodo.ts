'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/shared/components/feedBack/toast';
import { AxiosError } from 'axios';
import { Todo } from '@/shared/type/Todo';
import { putTodo } from '../api/api';

interface UseEditTodoProps {
  onSuccess: (updatedTodo: Todo) => void;
}

export function useFetchEditTodo({ onSuccess }: UseEditTodoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // 투두 수정 API 호출
  const editTodo = useCallback(
    async (todoId: string, content: string, date: string) => {
      setIsLoading(true);

      try {
        await putTodo({
          todoId,
          content: content.trim(),
          date,
        });

        // TodoResponse를 Todo로 변환
        const updatedTodo: Todo = {
          id: todoId,
          goalId: '', // 이 값들은 실제로는 API 응답에서 가져와야 함
          planId: '',
          date,
          content: content.trim(),
          isCompleted: false,
        };

        showToast('투두가 성공적으로 수정되었습니다.', 'success');
        onSuccess(updatedTodo);

        return true; // 성공 시 true 반환
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessage = error?.response?.data?.message || '투두 수정에 실패했습니다.';
          showToast(errorMessage, 'error');
        } else {
          showToast('투두 수정에 실패했습니다.', 'error');
        }
        return false; // 실패 시 false 반환
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, showToast]
  );

  return {
    isLoading,
    editTodo,
  };
}
