'use client';

import { useTodoFormContext } from '../../form';
import { MainView } from './mainView';
import { RepeatSelectView } from './repeatSelectView';
import { DateSelectView } from './dateSelectView';
import type { TodoBottomSheetView, Goal, DateSelectTab } from '../../types';

interface TodoBottomSheetContentProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 목표 목록 */
  goals: Goal[];
  /** 바텀시트 열림 상태 */
  isOpen: boolean;
  /** 현재 뷰 */
  currentView: TodoBottomSheetView;
  /** 목표 선택 클릭 핸들러 */
  onGoalSelect?: () => void;
  /** 반복 선택 클릭 핸들러 */
  onRepeatSelect: () => void;
  /** 시작일 선택 클릭 핸들러 */
  onStartDateSelect: () => void;
  /** 종료일 선택 클릭 핸들러 */
  onEndDateSelect: () => void;
  /** 날짜 선택 초기 탭 */
  dateSelectInitialTab: DateSelectTab;
  /** 뒤로가기 핸들러 (이전 뷰로) */
  goBack: () => void;
  /** 메인 뷰로 바로 이동 */
  goToMain: () => void;
}

export const TodoBottomSheetContent = ({
  selectedDate,
  goals,
  isOpen,
  currentView,
  onGoalSelect,
  onRepeatSelect,
  onStartDateSelect,
  onEndDateSelect,
  dateSelectInitialTab,
  goBack,
  goToMain,
}: TodoBottomSheetContentProps) => {
  const { handleSubmit, handleDelete, submitLabel, showDeleteButton } = useTodoFormContext();

  switch (currentView) {
    case 'repeatSelect':
      return <RepeatSelectView onBack={goBack} onGoToDateSelect={onStartDateSelect} />;
    case 'dateSelect':
      return <DateSelectView onBack={goBack} onComplete={goToMain} initialTab={dateSelectInitialTab} />;
    case 'main':
    default:
      return (
        <MainView
          selectedDate={selectedDate}
          goals={goals}
          onSubmit={handleSubmit}
          submitLabel={submitLabel}
          onDelete={handleDelete}
          showDeleteButton={showDeleteButton}
          autoFocus={isOpen && currentView === 'main'}
          onGoalSelect={onGoalSelect}
          onRepeatSelect={onRepeatSelect}
          onStartDateSelect={onStartDateSelect}
          onEndDateSelect={onEndDateSelect}
        />
      );
  }
};

export default TodoBottomSheetContent;
