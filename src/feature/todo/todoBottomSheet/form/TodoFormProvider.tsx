'use client';

import { useCallback, createContext, useContext, useMemo } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { TodoFormData, TODO_DEFAULT_VALUES, TodoBottomSheetMode } from '../types';
import { todoFormSchema } from './todoFormSchema';
import { usePutTodo, useDeleteTodo, usePostAddTodo } from '@/model/todo/todoList/queries';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import type { RoutineUpdateType, TodoDetail, TodoRoutine } from '@/model/todo/todoList/dto';
import { useToast } from '@/shared/components/feedBack/toast';
import axios from 'axios';

interface TodoFormContextType {
  /** form methods */
  methods: UseFormReturn<TodoFormData>;
  /** 제출 핸들러 */
  handleSubmit: () => void;
  /** 반복 투두 범위 수정 핸들러 */
  handleEdit: (scope: RoutineUpdateType) => Promise<boolean>;
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
  /** 수정 요청 진행 상태 */
  isSubmitting: boolean;
  /** 편집 시작 시 서버에서 조회한 원본 반복 여부 */
  hasOriginalRepeat: boolean;
}

const TodoFormContext = createContext<TodoFormContextType | null>(null);

const getMutationErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
};

const buildRoutine = (
  data: TodoFormData,
  scope: Exclude<RoutineUpdateType, 'SINGLE'>,
  originalTodo?: TodoDetail
): TodoRoutine | undefined => {
  if (data.repeatType === 'none' || !data.routineDuration) return undefined;

  const isNewRoutine = !originalTodo?.routine;
  return {
    repeatType: data.repeatType,
    duration: {
      startDate: isNewRoutine && scope === 'ALL' ? data.date : (originalTodo?.routine?.duration.startDate ?? data.date),
      endDate: data.routineDuration.endDate,
    },
    repeatDays: originalTodo?.routine?.repeatDays ?? null,
  };
};

interface TodoFormProviderProps {
  /** 바텀시트 모드 */
  mode: TodoBottomSheetMode;
  /** 폼 값 (편집 모드일 때 외부에서 전달) */
  values?: TodoFormData;
  /** 편집 직전 조회한 최신 투두 상세 */
  originalTodo?: TodoDetail;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 편집 모드일 때 Todo ID */
  todoId?: string;
  /** 바텀시트 닫기 콜백 */
  onClose: () => void;
  /** 기본 카테고리 (add 모드에서 카드 + 버튼 클릭 시) */
  defaultCategory?: TodoFormData['category'];
  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

export const TodoFormProvider = ({
  mode,
  values,
  originalTodo,
  selectedDate,
  todoId,
  onClose,
  defaultCategory,
  children,
}: TodoFormProviderProps) => {
  // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
  const initialDateString = format(selectedDate, 'yyyy-MM-dd');

  // add 모드일 때 사용할 기본값 (date 포함) - selectedDate 변경 시에만 재계산
  const addModeDefaults = useMemo<TodoFormData>(
    () => ({
      ...TODO_DEFAULT_VALUES,
      date: initialDateString,
      category: defaultCategory || 'NOW',
    }),
    [initialDateString, defaultCategory]
  );

  // form의 values 옵션: add 모드일 때도 selectedDate 변경을 반영
  const formValues = useMemo(() => {
    if (mode === 'edit' && values) {
      return values;
    }
    if (mode === 'add') {
      return addModeDefaults;
    }
    return undefined;
  }, [mode, values, addModeDefaults]);

  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: addModeDefaults,
    values: formValues,
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  // Mutations
  const putTodoMutation = usePutTodo();
  const deleteTodoMutation = useDeleteTodo();
  const postAddTodoMutation = usePostAddTodo();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // 폼 초기화
  const resetForm = useCallback(() => {
    methods.reset(addModeDefaults);
  }, [methods, addModeDefaults]);

  // 폼 값이 변경되었는지 확인
  const checkFormDirty = useCallback(() => {
    const currentValues = methods.getValues();
    // edit 모드: 초기 values와 비교, add 모드: 기본값과 비교
    const compareTarget = mode === 'edit' && values ? values : addModeDefaults;
    return JSON.stringify(currentValues) !== JSON.stringify(compareTarget);
  }, [methods, mode, values, addModeDefaults]);

  // 폼 리셋 후 닫기
  const closeWithReset = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const refreshAndClose = useCallback(
    async (scope: RoutineUpdateType | 'CREATE', nextDate: string) => {
      const originalDate = originalTodo?.date ?? nextDate;

      if (scope === 'FROM_DATE' || scope === 'ALL') {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.lists(), refetchType: 'all' }),
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.counts(), refetchType: 'all' }),
        ]);
      } else {
        const dates = [...new Set([originalDate, nextDate])];
        await Promise.all([
          ...dates.map(date =>
            queryClient.invalidateQueries({
              queryKey: todoListQueryKeys.getTodosByDate(date),
              refetchType: 'all',
            })
          ),
          queryClient.invalidateQueries({ queryKey: todoListQueryKeys.counts(), refetchType: 'all' }),
        ]);
      }

      if (todoId) queryClient.removeQueries({ queryKey: todoListQueryKeys.detail(todoId) });
      resetForm();
      onClose();
    },
    [originalTodo?.date, onClose, queryClient, resetForm, todoId]
  );

  const hasOriginalRepeat = !!originalTodo?.routine;

  const handleSubmit = useCallback(() => {
    methods.handleSubmit(
      async (data: TodoFormData) => {
        try {
          if (mode === 'add') {
            await postAddTodoMutation.mutateAsync({
              goalId: data.goalId ?? null,
              date: data.date,
              time: data.time || null,
              content: data.content,
              category: data.category,
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
            if (hasOriginalRepeat && data.repeatType === 'none') {
              showToast('기존 반복 투두의 반복 해제는 아직 지원하지 않아요.', 'warning');
              return;
            }

            if (data.repeatType !== 'none') {
              const routine = buildRoutine(data, 'ALL', originalTodo);
              if (!routine) return;
              await putTodoMutation.mutateAsync({
                todoId,
                goalId: data.goalId ?? null,
                date: data.date,
                time: data.time || null,
                content: data.content,
                category: data.category,
                routine,
                routineUpdateType: 'ALL',
              });
            } else {
              await putTodoMutation.mutateAsync({
                todoId,
                goalId: data.goalId ?? null,
                date: data.date,
                time: data.time || null,
                content: data.content,
                category: data.category,
              });
            }
          }
          await refreshAndClose(mode === 'add' ? 'CREATE' : data.repeatType === 'none' ? 'SINGLE' : 'ALL', data.date);
        } catch (error) {
          showToast(
            getMutationErrorMessage(error, mode === 'add' ? '투두 추가에 실패했습니다.' : '투두 수정에 실패했습니다.'),
            'error'
          );
        }
      },
      errors => {
        console.log('Validation errors:', errors);
      }
    )();
  }, [
    hasOriginalRepeat,
    methods,
    mode,
    originalTodo,
    postAddTodoMutation,
    putTodoMutation,
    refreshAndClose,
    showToast,
    todoId,
  ]);

  // 삭제 핸들러 (해당 투두만 삭제)
  const handleDelete = useCallback(async () => {
    if (!todoId) return;

    const currentDate = methods.getValues('date');
    try {
      await deleteTodoMutation.mutateAsync({ todoId, routineDeleteType: 'SINGLE' });
      await refreshAndClose('SINGLE', currentDate);
    } catch (error) {
      showToast(getMutationErrorMessage(error, '투두 삭제에 실패했습니다.'), 'error');
    }
  }, [todoId, deleteTodoMutation, methods, refreshAndClose, showToast]);

  // 전체 반복 투두 삭제 핸들러
  const handleDeleteAllRepeats = useCallback(async () => {
    if (!todoId) return;

    const currentDate = methods.getValues('date');
    try {
      await deleteTodoMutation.mutateAsync({ todoId, routineDeleteType: 'ALL' });
      await refreshAndClose('ALL', currentDate);
    } catch (error) {
      showToast(getMutationErrorMessage(error, '반복 투두 삭제에 실패했습니다.'), 'error');
    }
  }, [todoId, deleteTodoMutation, methods, refreshAndClose, showToast]);

  const handleEdit = useCallback(
    async (scope: RoutineUpdateType): Promise<boolean> => {
      let succeeded = false;
      await methods.handleSubmit(
        async (data: TodoFormData) => {
          if (!todoId) return;

          try {
            if (scope === 'SINGLE') {
              await putTodoMutation.mutateAsync({
                todoId,
                goalId: data.goalId ?? null,
                date: data.date,
                time: data.time || null,
                content: data.content,
                category: data.category,
                routineUpdateType: 'SINGLE',
              });
            } else {
              const routine = buildRoutine(data, scope, originalTodo);
              if (!routine || (scope === 'FROM_DATE' && !originalTodo?.routine)) {
                showToast('최신 반복 정보를 확인할 수 없습니다. 다시 열어주세요.', 'error');
                return;
              }
              if (scope === 'FROM_DATE' && originalTodo && routine.duration.endDate < originalTodo.date) {
                methods.setError('routineDuration', {
                  message: '반복 종료일은 수정 기준일보다 앞설 수 없습니다.',
                });
                return;
              }
              await putTodoMutation.mutateAsync({
                todoId,
                goalId: data.goalId ?? null,
                date: data.date,
                time: data.time || null,
                content: data.content,
                category: data.category,
                routine,
                routineUpdateType: scope,
              });
            }
            await refreshAndClose(scope, data.date);
            succeeded = true;
          } catch (error) {
            showToast(getMutationErrorMessage(error, '반복 투두 수정에 실패했습니다.'), 'error');
          }
        },
        () => undefined
      )();
      return succeeded;
    },
    [methods, originalTodo, putTodoMutation, refreshAndClose, showToast, todoId]
  );

  const submitLabel = mode === 'add' ? '완료' : '수정';
  const showDeleteButton = mode === 'edit';

  return (
    <TodoFormContext.Provider
      value={{
        methods,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleDeleteAllRepeats,
        resetForm,
        checkFormDirty,
        closeWithReset,
        submitLabel,
        showDeleteButton,
        isSubmitting: putTodoMutation.isPending || deleteTodoMutation.isPending,
        hasOriginalRepeat,
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
