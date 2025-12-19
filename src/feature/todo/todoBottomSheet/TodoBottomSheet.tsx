'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { Header, Content } from './components';
import { type TodoFormData, type TodoBottomSheetMode, TODO_DEFAULT_VALUES } from './types';

interface TodoBottomSheetProps {
  /** 바텀시트 모드: 'add' (추가) 또는 'edit' (편집) */
  mode: TodoBottomSheetMode;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 그룹 목록 */
  groups?: { id: string; name: string }[];
  /** 제출 핸들러 */
  onSubmit: (data: TodoFormData) => void;
  /** 편집 모드일 때 초기 데이터 */
  initialData?: TodoFormData;
  /** 편집 모드일 때 Todo ID */
  todoId?: string;
  /** 바텀시트 열림 상태 (외부 제어용) */
  isOpen?: boolean;
  /** 바텀시트 열기 함수 (외부 제어용) */
  onOpen?: () => void;
  /** 바텀시트 닫기 함수 (외부 제어용) */
  onClose?: () => void;
  /** FloatingButton 표시 여부 (기본값: add 모드일 때만 표시) */
  showFloatingButton?: boolean;
}

export const TodoBottomSheet = ({
  mode,
  selectedDate,
  groups = [],
  onSubmit,
  initialData,
  isOpen: externalIsOpen,
  onOpen: externalOnOpen,
  onClose: externalOnClose,
  showFloatingButton,
}: TodoBottomSheetProps) => {
  // 내부 상태 관리 (외부 제어가 없을 때 사용)
  const internalSheet = useBottomSheet();

  // 외부 제어 또는 내부 상태 사용
  const isOpen = externalIsOpen ?? internalSheet.isOpen;
  const showSheet = externalOnOpen ?? internalSheet.showSheet;
  const closeSheet = externalOnClose ?? internalSheet.closeSheet;

  // FloatingButton 표시 여부 결정
  const shouldShowFloatingButton = showFloatingButton ?? mode === 'add';

  const methods = useForm<TodoFormData>({
    defaultValues: mode === 'edit' && initialData ? initialData : TODO_DEFAULT_VALUES,
  });

  // 바텀시트가 열릴 때 편집 모드면 초기 데이터 설정
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      methods.reset(initialData);
    }
  }, [isOpen, mode, initialData, methods]);

  // 바텀시트가 닫히면 폼 초기화
  useEffect(() => {
    if (!isOpen) {
      methods.reset(TODO_DEFAULT_VALUES);
    }
  }, [isOpen, methods]);

  const handleSubmit = () => {
    const data = methods.getValues();
    if (data.content.trim()) {
      onSubmit({ ...data, content: data.content.trim() });
      closeSheet();
    }
  };

  const submitLabel = mode === 'add' ? '완료' : '수정';

  return (
    <>
      {shouldShowFloatingButton && <FloatingButton onClick={showSheet} aria-label="투두 추가" />}
      <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
        <FormProvider {...methods}>
          <BottomSheet.Title>
            <Header selectedDate={selectedDate} onSubmit={handleSubmit} submitLabel={submitLabel} />
          </BottomSheet.Title>
          <BottomSheet.Content>
            <Content groups={groups} autoFocus={isOpen} />
          </BottomSheet.Content>
        </FormProvider>
      </BottomSheet>
    </>
  );
};

export default TodoBottomSheet;
