'use client';

import { useState } from 'react';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { StackView, useStackNavigation } from './components/shared/stackView';
import { TodoBottomSheetContent } from './components/content';
import { TodoFormProvider } from './form';
import {
  type TodoFormData,
  type TodoBottomSheetMode,
  type TodoBottomSheetView,
  type Goal,
  type DateSelectTab,
} from './types';

interface TodoBottomSheetProps {
  /** 바텀시트 모드: 'add' (추가) 또는 'edit' (편집) */
  mode: TodoBottomSheetMode;
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 목표 목록 */
  goals?: Goal[];
  /** 제출 핸들러 */
  onSubmit: (data: TodoFormData) => void;
  /** 삭제 핸들러 (편집 모드에서만 사용) */
  onDelete?: () => void;
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
  /** 목표 선택 클릭 핸들러 (외부 처리 시 사용) */
  onGoalSelect?: () => void;
}

export const TodoBottomSheet = ({
  mode,
  selectedDate,
  goals = [],
  onSubmit,
  onDelete,
  initialData,
  isOpen: externalIsOpen,
  onOpen: externalOnOpen,
  onClose: externalOnClose,
  onGoalSelect,
}: TodoBottomSheetProps) => {
  // 내부 상태 관리 (외부 제어가 없을 때 사용)
  const internalSheet = useBottomSheet();

  // 외부 제어 또는 내부 상태 사용
  const isOpen = externalIsOpen ?? internalSheet.isOpen;
  const showSheet = externalOnOpen ?? internalSheet.showSheet;
  const closeSheet = externalOnClose ?? internalSheet.closeSheet;

  // 스택 네비게이션 훅 사용
  const { currentView, direction, navigateTo, goBack, goToMain, reset } = useStackNavigation<TodoBottomSheetView>({
    initialView: 'main',
  });

  // 날짜 선택 초기 탭 상태
  const [dateSelectInitialTab, setDateSelectInitialTab] = useState<DateSelectTab>('startDate');

  // 반복 선택 클릭 핸들러 (내부 스택 네비게이션)
  const handleRepeatSelect = () => {
    navigateTo('repeatSelect');
  };

  // 시작일 선택 클릭 핸들러
  const handleStartDateSelect = () => {
    setDateSelectInitialTab('startDate');
    navigateTo('dateSelect');
  };

  // 종료일 선택 클릭 핸들러
  const handleEndDateSelect = () => {
    setDateSelectInitialTab('endDate');
    navigateTo('dateSelect');
  };

  return (
    <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
      <TodoFormProvider
        mode={mode}
        initialData={initialData}
        isOpen={isOpen}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onClose={() => {
          closeSheet();
          reset();
        }}
      >
        <StackView viewKey={currentView} direction={direction}>
          <TodoBottomSheetContent
            selectedDate={selectedDate}
            goals={goals}
            isOpen={isOpen}
            currentView={currentView}
            onGoalSelect={onGoalSelect}
            onRepeatSelect={handleRepeatSelect}
            onStartDateSelect={handleStartDateSelect}
            onEndDateSelect={handleEndDateSelect}
            dateSelectInitialTab={dateSelectInitialTab}
            goBack={goBack}
            goToMain={goToMain}
          />
        </StackView>
      </TodoFormProvider>
    </BottomSheet>
  );
};

export default TodoBottomSheet;
