'use client';

import { useTodoFormContext } from '../../form';
import { MainView } from './mainView';
import { GoalSelectView } from './goalSelectView';
import { RepeatSelectView } from './repeatSelectView';
import { DateSelectView } from './dateSelectView';
import { DateEditView } from './dateEditView';
import type { TodoBottomSheetView, DateSelectTab } from '../../types';

interface TodoBottomSheetContentProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 바텀시트 열림 상태 */
  isOpen: boolean;
  /** 현재 뷰 */
  currentView: TodoBottomSheetView;
  /** 목표 선택 클릭 핸들러 */
  onGoalSelect: () => void;
  /** 반복 선택 클릭 핸들러 */
  onRepeatSelect: () => void;
  /** 시작일 선택 클릭 핸들러 */
  onStartDateSelect: () => void;
  /** 종료일 선택 클릭 핸들러 */
  onEndDateSelect: () => void;
  /** 날짜 수정 클릭 핸들러 */
  onDateEdit: () => void;
  /** 날짜 선택 초기 탭 */
  dateSelectInitialTab: DateSelectTab;
  /** 뒤로가기 핸들러 (이전 뷰로) */
  goBack: () => void;
  /** 메인 뷰로 바로 이동 */
  goToMain: () => void;
  /** 삭제 선택 화면으로 이동 핸들러 */
  onDeleteSelect?: () => void;
}

export const TodoBottomSheetContent = ({
  selectedDate,
  isOpen,
  currentView,
  onGoalSelect,
  onRepeatSelect,
  onStartDateSelect,
  onEndDateSelect,
  onDateEdit,
  dateSelectInitialTab,
  goBack,
  goToMain,
  onDeleteSelect,
}: TodoBottomSheetContentProps) => {
  const { handleSubmit, handleDelete, submitLabel, showDeleteButton } = useTodoFormContext();

  switch (currentView) {
    case 'goalSelect':
      return <GoalSelectView onBack={goBack} />;
    case 'repeatSelect':
      return <RepeatSelectView onBack={goBack} onGoToDateSelect={onEndDateSelect} />;
    case 'dateSelect':
      return (
        <DateSelectView
          onBack={goBack}
          onComplete={goToMain}
          initialTab={dateSelectInitialTab}
          defaultDate={selectedDate}
        />
      );
    case 'dateEdit':
      return (
        <DateEditView
          onBack={goBack}
          onRepeatSelect={onRepeatSelect}
          onStartDateSelect={onStartDateSelect}
          onEndDateSelect={onEndDateSelect}
        />
      );
    case 'main':
    default:
      return (
        <MainView
          selectedDate={selectedDate}
          onSubmit={handleSubmit}
          submitLabel={submitLabel}
          onDeleteSelect={onDeleteSelect}
          onDelete={handleDelete}
          showDeleteButton={showDeleteButton}
          autoFocus={isOpen && currentView === 'main'}
          onGoalSelect={onGoalSelect}
          onRepeatSelect={onRepeatSelect}
          onStartDateSelect={onStartDateSelect}
          onEndDateSelect={onEndDateSelect}
          onDateEdit={onDateEdit}
        />
      );
  }
};

export default TodoBottomSheetContent;
