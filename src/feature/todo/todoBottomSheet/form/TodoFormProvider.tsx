'use client';

import { useEffect, useCallback, createContext, useContext } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormData, TODO_DEFAULT_VALUES, TodoBottomSheetMode } from '../types';
import { todoFormSchema } from './todoFormSchema';

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
  /** 제출 콜백 */
  onSubmit: (data: TodoFormData) => void;
  /** 삭제 콜백 (해당 투두만 삭제) */
  onDelete?: () => void;
  /** 전체 반복 투두 삭제 콜백 */
  onDeleteAllRepeats?: () => void;
  /** 바텀시트 닫기 콜백 */
  onClose: () => void;
  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

export const TodoFormProvider = ({
  mode,
  initialData,
  isOpen,
  onSubmit,
  onDelete,
  onDeleteAllRepeats,
  onClose,
  children,
}: TodoFormProviderProps) => {
  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: mode === 'edit' && initialData ? initialData : TODO_DEFAULT_VALUES,
    mode: 'onSubmit',
  });

  // 바텀시트 열릴 때 편집 모드면 초기 데이터 설정
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      methods.reset(initialData);
    }
  }, [isOpen, mode, initialData, methods]);

  // 폼 초기화
  const resetForm = useCallback(() => {
    methods.reset(TODO_DEFAULT_VALUES);
  }, [methods]);

  // 제출 핸들러 (react-hook-form의 handleSubmit 사용)
  const handleSubmit = useCallback(() => {
    methods.handleSubmit(
      // 유효성 검증 성공 시
      data => {
        onSubmit(data);
        onClose();
      },
      // 유효성 검증 실패 시 (에러는 formState.errors에 자동 저장)
      errors => {
        console.log('Validation errors:', errors);
      }
    )();
  }, [methods, onSubmit, onClose]);

  // 삭제 핸들러 (해당 투두만 삭제)
  const handleDelete = useCallback(() => {
    onDelete?.();
    onClose();
  }, [onDelete, onClose]);

  // 전체 반복 투두 삭제 핸들러
  const handleDeleteAllRepeats = useCallback(() => {
    onDeleteAllRepeats?.();
    onClose();
  }, [onDeleteAllRepeats, onClose]);

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
