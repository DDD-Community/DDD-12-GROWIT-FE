'use client';

import { useEffect, useCallback, createContext, useContext } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { TodoFormData, TODO_DEFAULT_VALUES, TodoBottomSheetMode } from '../types';
import { todoFormSchema } from './todoFormSchema';
import { usePutTodo, useDeleteTodo, usePostAddTodo } from '@/model/todo/todoList/queries';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { GoalTodo } from '@/shared/type/GoalTodo';

interface TodoFormContextType {
  /** form methods */
  methods: UseFormReturn<TodoFormData>;
  /** 제출 핸들러 */
  handleSubmit: () => void;
  /** 삭제 핸들러 (해당 투두만 삭제) */
  handleDelete: () => void;
  /** 전체 반복 투두 삭제 핸들러 */
  handleDeleteAllRepeats?: () => void;
  /** 폼 초기화 */
  resetForm: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
  /** 삭제 버튼 표시 여부 */
  showDeleteButton: boolean;
}

const TodoFormContext = createContext<TodoFormContextType | null>(null);

interface TodoFormProviderProps {
  /** 바텀시트 모드 */
  mode: TodoBottomSheetMode;
  /** 편집 모드일 때 초기 데이터 */
  initialData?: TodoFormData;
  /** 바텀시트 열림 상태 */
  isOpen: boolean;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 편집 모드일 때 Todo ID */
  todoId?: string;
  /** 편집 모드일 때 Todo 데이터 (전체 반복 투두 삭제용) */
  editingTodo?: GoalTodo | null;
  /** 바텀시트 닫기 콜백 */
  onClose: () => void;
  /** 목표 추가 클릭 핸들러 */
  onAddGoal?: () => void;
  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

export const TodoFormProvider = ({
  mode,
  initialData,
  isOpen,
  selectedDate,
  todoId,
  editingTodo,
  onClose,
  onAddGoal,
  children,
}: TodoFormProviderProps) => {
  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: mode === 'edit' && initialData ? initialData : TODO_DEFAULT_VALUES,
    mode: 'onSubmit',
    // form 상태를 유지하기 위해 keepValues 옵션 사용
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
      await deleteTodoMutation.mutateAsync(todoId);
      // 쿼리 무효화하여 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
      // Todo count 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
      onClose();
    } catch (error) {
      console.error('Todo 삭제 실패:', error);
    }
  }, [todoId, deleteTodoMutation, queryClient, dateString, onClose]);

  // 전체 반복 투두 삭제 핸들러
  const handleDeleteAllRepeats = useCallback(async () => {
    if (!editingTodo?.routine) return;

    const editingRoutine = editingTodo.routine;

    try {
      // 캐시에서 현재 날짜의 todos 가져오기
      const cachedData = queryClient.getQueryData(todoListQueryKeys.getTodosByDate(dateString));
      const todosData = cachedData as Array<{ todo: GoalTodo; goal: any }> | undefined;

      if (!todosData) {
        console.error('캐시된 데이터를 찾을 수 없습니다.');
        return;
      }

      // API 응답을 GoalTodo[] 형식으로 변환
      const todos: GoalTodo[] = todosData.map(item => ({
        ...item.todo,
        goal: item.goal,
      }));

      // 같은 routine을 가진 모든 투두 삭제
      const todosToDelete = todos.filter(todo => {
        if (!todo.routine) return false;
        const todoRoutine = todo.routine;
        return (
          editingRoutine.duration.startDate === todoRoutine.duration.startDate &&
          editingRoutine.duration.endDate === todoRoutine.duration.endDate &&
          editingRoutine.repeatType === todoRoutine.repeatType
        );
      });

      // 모든 투두 삭제
      await Promise.all(todosToDelete.map(todo => deleteTodoMutation.mutateAsync(todo.id)));

      // 쿼리 무효화하여 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
      // Todo count 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
      onClose();
    } catch (error) {
      console.error('반복 투두 삭제 실패:', error);
    }
  }, [editingTodo, deleteTodoMutation, queryClient, dateString, onClose]);

  const submitLabel = mode === 'add' ? '완료' : '수정';
  const showDeleteButton = mode === 'edit';

  return (
    <TodoFormContext.Provider
      value={{
        methods,
        handleSubmit,
        handleDelete,
        handleDeleteAllRepeats,
        resetForm,
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
