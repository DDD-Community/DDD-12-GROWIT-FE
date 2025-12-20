'use client';

import { useTodoFormContext } from '../../form';
import { MainView } from './mainView';
import { RepeatSelectView } from './repeatSelectView';
import { DateSelectView } from './dateSelectView';
import type { TodoBottomSheetView, Goal } from '../../types';

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
  /** 날짜 선택 클릭 핸들러 */
  onDateSelect: () => void;
  /** 뒤로가기 핸들러 */
  goBack: () => void;
}

export const TodoBottomSheetContent = ({
  selectedDate,
  goals,
  isOpen,
  currentView,
  onGoalSelect,
  onRepeatSelect,
  onDateSelect,
  goBack,
}: TodoBottomSheetContentProps) => {
  const { handleSubmit, handleDelete, submitLabel, showDeleteButton } = useTodoFormContext();

  switch (currentView) {
    case 'repeatSelect':
      return <RepeatSelectView onBack={goBack} onGoToDateSelect={onDateSelect} />;
    case 'dateSelect':
      return <DateSelectView onBack={goBack} onComplete={goBack} />;
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
          onStartDateSelect={onDateSelect}
          onEndDateSelect={onDateSelect}
        />
      );
  }
};

export default TodoBottomSheetContent;
