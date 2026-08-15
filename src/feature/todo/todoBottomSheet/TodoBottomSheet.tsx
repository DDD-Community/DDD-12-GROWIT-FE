'use client';

import { useMemo, useState } from 'react';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { StackView, useStackNavigation } from './components/shared/stackView';
import { UnsavedChangesModal } from './components/shared/unsavedChangesModal';
import { TodoBottomSheetContent } from './components/content';
import { DeleteBottomSheet, EditBottomSheet } from './components/subBottomSheet';
import { TodoFormProvider, useTodoFormContext } from './form';
import { type TodoFormData, type TodoBottomSheetMode, type TodoBottomSheetView, type DateSelectTab } from './types';
import { useTodoById } from '@/model/todo/todoList';
import Button from '@/shared/components/input/Button';

// BottomSheet wrapper 컴포넌트 (useTodoFormContext 사용을 위해 TodoFormProvider 내부에서 사용)
interface TodoBottomSheetWrapperProps {
  isOpen: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

const TodoBottomSheetWrapper = ({ isOpen, onOpen, children }: TodoBottomSheetWrapperProps) => {
  const { checkFormDirty, closeWithReset } = useTodoFormContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleCloseSheet = () => {
    if (checkFormDirty()) {
      setIsConfirmModalOpen(true);
    } else {
      closeWithReset();
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
    closeWithReset();
  };

  return (
    <>
      <BottomSheet isOpen={isOpen} showSheet={onOpen} closeSheet={handleCloseSheet} height="auto">
        {children}
      </BottomSheet>

      <UnsavedChangesModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmClose}
      />
    </>
  );
};

interface TodoBottomSheetProps {
  /** 바텀시트 모드: 'add' (추가) 또는 'edit' (편집) */
  mode: TodoBottomSheetMode;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 폼 값 (편집 모드일 때 외부에서 전달) */
  values?: TodoFormData;
  /** 편집 모드일 때 Todo ID */
  todoId?: string;
  /** 바텀시트 열림 상태 */
  isOpen: boolean;
  /** 바텀시트 열기 함수 */
  onOpen: () => void;
  /** 바텀시트 닫기 함수 */
  onClose: () => void;
  /** 기본 카테고리 (add 모드에서 카드 + 버튼 클릭 시) */
  defaultCategory?: TodoFormData['category'];
}

export const TodoBottomSheet = ({
  mode,
  selectedDate,
  values,
  todoId,
  isOpen,
  onOpen,
  onClose,
  defaultCategory,
}: TodoBottomSheetProps) => {
  const todoDetailQuery = useTodoById(todoId, isOpen && mode === 'edit');
  const editSheet = useBottomSheet();
  const deleteSheet = useBottomSheet();

  // 스택 네비게이션 훅 사용
  const { currentView, direction, navigateTo, goBack, goToMain, reset } = useStackNavigation<TodoBottomSheetView>({
    initialView: 'main',
  });

  // 날짜 선택 초기 탭 상태
  const [dateSelectInitialTab, setDateSelectInitialTab] = useState<DateSelectTab>('endDate');

  // 목표 선택 클릭 핸들러 (내부 스택 네비게이션)
  const handleGoalSelect = () => {
    navigateTo('goalSelect');
  };

  // 반복 선택 클릭 핸들러 (내부 스택 네비게이션)
  const handleRepeatSelect = () => {
    navigateTo('repeatSelect');
  };

  // 시작일 선택 클릭 핸들러
  const handleStartDateSelect = () => {
    navigateTo('dateSelect');
    setDateSelectInitialTab('startDate');
  };

  // 종료일 선택 클릭 핸들러
  const handleEndDateSelect = () => {
    navigateTo('dateSelect');
    setDateSelectInitialTab('endDate');
  };

  // 날짜 수정 클릭 핸들러
  const handleDateEdit = () => {
    navigateTo('dateEdit');
  };

  // 시간 선택 클릭 핸들러
  const handleTimeSelect = () => {
    navigateTo('timeSelect');
  };

  // 삭제 BottomSheet 열기 핸들러
  const handleDeleteSelect = () => {
    deleteSheet.showSheet();
  };

  // 수정 BottomSheet 열기 핸들러 (반복 투두용)
  const handleEditSelect = () => {
    editSheet.showSheet();
  };

  // 메인 BottomSheet는 삭제/수정 BottomSheet가 열려있지 않을 때만 표시
  const isMainSheetOpen = isOpen && !deleteSheet.isOpen && !editSheet.isOpen;

  const editValues = useMemo<TodoFormData | undefined>(() => {
    if (mode !== 'edit') return values;
    if (!todoDetailQuery.data) return values;

    return {
      content: todoDetailQuery.data.content,
      goalId: todoDetailQuery.data.goalId,
      repeatType: todoDetailQuery.data.routine?.repeatType ?? 'none',
      category: todoDetailQuery.data.category,
      date: todoDetailQuery.data.date,
      time: todoDetailQuery.data.time ?? undefined,
      routineDuration: todoDetailQuery.data.routine?.duration,
    };
  }, [mode, todoDetailQuery.data, values]);

  if (mode === 'edit' && isOpen && todoDetailQuery.isPending) {
    return (
      <BottomSheet isOpen showSheet={onOpen} closeSheet={onClose} height="auto">
        <BottomSheet.Content>
          <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-label-neutral">
            <div className="size-8 animate-spin rounded-full border-2 border-label-assistive border-t-label-normal" />
            <p className="body-2-normal">최신 투두 정보를 불러오고 있어요.</p>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    );
  }

  if (mode === 'edit' && isOpen && todoDetailQuery.isError) {
    return (
      <BottomSheet isOpen showSheet={onOpen} closeSheet={onClose} height="auto">
        <BottomSheet.Content>
          <div className="flex min-h-40 flex-col items-center justify-center gap-4 px-5 text-center">
            <p className="body-2-normal text-label-neutral">최신 투두 정보를 불러오지 못했어요.</p>
            <Button size="lg" variant="tertiary" text="다시 시도" onClick={() => todoDetailQuery.refetch()} />
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    );
  }

  return (
    <TodoFormProvider
      mode={mode}
      todoId={todoId}
      values={editValues}
      originalTodo={todoDetailQuery.data}
      selectedDate={selectedDate}
      defaultCategory={defaultCategory}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      {/* 메인 BottomSheet - 삭제/수정 모드가 아닐 때만 표시 */}
      <TodoBottomSheetWrapper isOpen={isMainSheetOpen} onOpen={onOpen}>
        <StackView viewKey={currentView} direction={direction}>
          <TodoBottomSheetContent
            selectedDate={selectedDate}
            isOpen={isOpen}
            currentView={currentView}
            onGoalSelect={handleGoalSelect}
            onRepeatSelect={handleRepeatSelect}
            onStartDateSelect={handleStartDateSelect}
            onEndDateSelect={handleEndDateSelect}
            onDateEdit={handleDateEdit}
            onTimeSelect={handleTimeSelect}
            dateSelectInitialTab={dateSelectInitialTab}
            goBack={goBack}
            goToMain={goToMain}
            onDeleteSelect={handleDeleteSelect}
            onEditSelect={handleEditSelect}
          />
        </StackView>
      </TodoBottomSheetWrapper>

      {/* 삭제 전용 BottomSheet */}
      <DeleteBottomSheet isOpen={deleteSheet.isOpen} onClose={deleteSheet.closeSheet} />

      {/* 수정 전용 BottomSheet (반복 투두) */}
      <EditBottomSheet isOpen={editSheet.isOpen} onClose={editSheet.closeSheet} />
    </TodoFormProvider>
  );
};

export default TodoBottomSheet;
