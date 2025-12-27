'use client';

import { useCallback, createContext, useContext } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { TodoFormData, TODO_DEFAULT_VALUES, TodoBottomSheetMode } from '../types';
import { todoFormSchema } from './todoFormSchema';
import { usePutTodo, useDeleteTodo, usePostAddTodo } from '@/model/todo/todoList/queries';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';

interface TodoFormContextType {
  /** form methods */
  methods: UseFormReturn<TodoFormData>;
  /** 제출 핸들러 */
  handleSubmit: () => void;
  /** 해당 투두만 수정 핸들러 (반복 투두) */
  handleEditSingle: () => void;
  /** 전체 반복 투두 수정 핸들러 */
  handleEditAll?: () => void;
  /** 삭제 핸들러 (해당 투두만 삭제) */
  handleDelete: () => void;
  /** 전체 반복 투두 삭제 핸들러 */
  handleDeleteAllRepeats?: () => void;
  /** 폼 초기화 */
  resetForm: () => void;
  /** 폼 값이 변경되었는지 확인 */
  checkFormDirty: () => boolean;
  /** 폼 리셋 후 닫기 */
  closeWithReset: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
  /** 삭제 버튼 표시 여부 */
  showDeleteButton: boolean;
}

const TodoFormContext = createContext<TodoFormContextType | null>(null);

interface TodoFormProviderProps {
  /** 바텀시트 모드 */
  mode: TodoBottomSheetMode;
  /** 폼 값 (편집 모드일 때 외부에서 전달) */
  values?: TodoFormData;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 편집 모드일 때 Todo ID */
  todoId?: string;
  /** 바텀시트 닫기 콜백 */
  onClose: () => void;
  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

export const TodoFormProvider = ({ mode, values, selectedDate, todoId, onClose, children }: TodoFormProviderProps) => {
  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: TODO_DEFAULT_VALUES,
    values: mode === 'edit' && values ? values : undefined,
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  // Mutations
  const putTodoMutation = usePutTodo();
  const deleteTodoMutation = useDeleteTodo();
  const postAddTodoMutation = usePostAddTodo();
  const queryClient = useQueryClient();

  // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
  const dateString = format(selectedDate, 'yyyy-MM-dd');

  // 폼 초기화
  const resetForm = useCallback(() => {
    methods.reset(TODO_DEFAULT_VALUES);
  }, [methods]);

  // 폼 값이 변경되었는지 확인
  const checkFormDirty = useCallback(() => {
    const currentValues = methods.getValues();
    // edit 모드: 초기 values와 비교, add 모드: 기본값과 비교
    const compareTarget = mode === 'edit' && values ? values : TODO_DEFAULT_VALUES;
    return JSON.stringify(currentValues) !== JSON.stringify(compareTarget);
  }, [methods, mode, values]);

  // 폼 리셋 후 닫기
  const closeWithReset = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  // 제출 핸들러 (react-hook-form의 handleSubmit 사용)
  const handleSubmit = useCallback(() => {
    methods.handleSubmit(
      // 유효성 검증 성공 시
      async (data: TodoFormData) => {
        try {
          if (mode === 'add') {
            // 신규 Todo 추가
            await postAddTodoMutation.mutateAsync({
              goalId: data.goalId ?? null,
              date: dateString,
              content: data.content,
              isImportant: data.isImportant,
              routine:
                data.repeatType !== 'none' && data.routineDuration
                  ? {
                      repeatType: data.repeatType,
                      duration: {
                        startDate: data.routineDuration.startDate,
                        endDate: data.routineDuration.endDate,
                      },
                    }
                  : undefined,
            });
          } else if (mode === 'edit' && todoId) {
            // Todo 수정
            await putTodoMutation.mutateAsync({
              todoId,
              goalId: data.goalId ?? null,
              date: dateString,
              content: data.content,
              isImportant: data.isImportant,
              routine:
                data.repeatType !== 'none' && data.routineDuration
                  ? {
                      repeatType: data.repeatType,
                      duration: {
                        startDate: data.routineDuration.startDate,
                        endDate: data.routineDuration.endDate,
                      },
                    }
                  : undefined,
            });
          }
          // 쿼리 무효화하여 데이터 다시 가져오기
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
          queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
          onClose();
        } catch (error) {
          console.error(mode === 'add' ? 'Todo 추가 실패:' : 'Todo 수정 실패:', error);
        }
      },
      // 유효성 검증 실패 시 (에러는 formState.errors에 자동 저장)
      errors => {
        console.log('Validation errors:', errors);
      }
    )();
  }, [methods, mode, todoId, dateString, postAddTodoMutation, putTodoMutation, queryClient, onClose]);

  // 삭제 핸들러 (해당 투두만 삭제)
  const handleDelete = useCallback(async () => {
    if (!todoId) return;

    try {
      // todo 삭제 및 query 무효화 (SINGLE: 해당 투두만 삭제)
      await deleteTodoMutation.mutateAsync({ todoId, routineDeleteType: 'SINGLE' });
      queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
      queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
      onClose();
    } catch (error) {
      console.error('Todo 삭제 실패:', error);
    }
  }, [todoId, deleteTodoMutation, queryClient, dateString, onClose]);

  // 전체 반복 투두 삭제 핸들러
  const handleDeleteAllRepeats = useCallback(async () => {
    if (!todoId) return;

    try {
      // 전체 반복 투두 삭제 (ALL: 모든 반복 투두 삭제)
      await deleteTodoMutation.mutateAsync({ todoId, routineDeleteType: 'ALL' });
      queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
      queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
      onClose();
    } catch (error) {
      console.error('반복 투두 삭제 실패:', error);
    }
  }, [todoId, deleteTodoMutation, queryClient, dateString, onClose]);

  // 해당 투두만 수정 핸들러 (반복 투두) - 동일한 edit API 사용
  const handleEditSingle = useCallback(() => {
    methods.handleSubmit(
      async (data: TodoFormData) => {
        if (!todoId) return;

        try {
          await putTodoMutation.mutateAsync({
            todoId,
            goalId: data.goalId ?? null,
            date: dateString,
            content: data.content,
            isImportant: data.isImportant,
            routine:
              data.repeatType !== 'none' && data.routineDuration
                ? {
                    repeatType: data.repeatType,
                    duration: {
                      startDate: data.routineDuration.startDate,
                      endDate: data.routineDuration.endDate,
                    },
                  }
                : undefined,
          });
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
          queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
          onClose();
        } catch (error) {
          console.error('Todo 수정 실패:', error);
        }
      },
      errors => {
        console.log('Validation errors:', errors);
      }
    )();
  }, [methods, todoId, dateString, putTodoMutation, queryClient, onClose]);

  // 전체 반복 투두 수정 핸들러 - 동일한 edit API 사용
  const handleEditAll = useCallback(() => {
    methods.handleSubmit(
      async (data: TodoFormData) => {
        if (!todoId) return;

        try {
          await putTodoMutation.mutateAsync({
            todoId,
            goalId: data.goalId ?? null,
            date: dateString,
            content: data.content,
            isImportant: data.isImportant,
            routine:
              data.repeatType !== 'none' && data.routineDuration
                ? {
                    repeatType: data.repeatType,
                    duration: {
                      startDate: data.routineDuration.startDate,
                      endDate: data.routineDuration.endDate,
                    },
                  }
                : undefined,
          });
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
          queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
          onClose();
        } catch (error) {
          console.error('반복 투두 수정 실패:', error);
        }
      },
      errors => {
        console.log('Validation errors:', errors);
      }
    )();
  }, [methods, todoId, dateString, putTodoMutation, queryClient, onClose]);

  const submitLabel = mode === 'add' ? '완료' : '수정';
  const showDeleteButton = mode === 'edit';

  return (
    <TodoFormContext.Provider
      value={{
        methods,
        handleSubmit,
        handleEditSingle,
        handleEditAll,
        handleDelete,
        handleDeleteAllRepeats,
        resetForm,
        checkFormDirty,
        closeWithReset,
        submitLabel,
        showDeleteButton,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </TodoFormContext.Provider>
  );
};

/**
 * TodoForm Context 접근 훅
 */
export const useTodoFormContext = () => {
  const context = useContext(TodoFormContext);
  if (!context) {
    throw new Error('useTodoFormContext must be used within TodoFormProvider');
  }
  return context;
};

export default TodoFormProvider;
