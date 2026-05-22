'use client';

import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { parseDateString, formatMonthDayWeekday } from '@/shared/lib/dateUtils';
import { useDebounceCallback } from '@/shared/hooks';
import type { TodoFormData } from '../../../types';

interface MainViewHeaderProps {
  /** 날짜 수정 클릭 핸들러 */
  onDateEdit?: () => void;
  /** 제출 핸들러 */
  onSubmit: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
}

/** MainView 헤더 컴포넌트 */
export const MainViewHeader = ({ onDateEdit, onSubmit, submitLabel }: MainViewHeaderProps) => {
  const { watch } = useFormContext<TodoFormData>();

  // 필요한 데이터 가져오기
  const content = watch('content');
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');
  const todoDate = watch('date');

  // 폼의 date 필드를 Date 객체로 변환
  const displayDate = parseDateString(todoDate) || new Date();

  // UI 상태 계산 (컴포넌트 내부에서 계산)
  const isContentValid = content?.trim() && content.trim().length <= 34;
  const isRoutineDurationValid =
    repeatType === 'none' ||
    (routineDuration?.startDate &&
      routineDuration?.endDate &&
      new Date(routineDuration.startDate) <= new Date(routineDuration.endDate));
  const isSubmitDisabled = !isContentValid || !isRoutineDurationValid;

  // 제출 버튼 디바운스 (연속 클릭 시 마지막 클릭 후 300ms 뒤 실행)
  const handleDebouncedSubmit = useDebounceCallback(onSubmit, 300);

  return (
    <div className="w-full flex items-center px-5 pt-2 pb-4">
      {/* 왼쪽 빈 영역 (레이아웃 균형용) */}
      <div className="flex-1" />

      {/* 날짜 제목 - 중앙 (클릭 시 날짜 수정 화면으로 이동) */}
      <button type="button" onClick={onDateEdit} className="body-1-bold text-white underline">
        {formatMonthDayWeekday(displayDate)}
      </button>

      {/* 완료 버튼 - 오른쪽 영역 */}
      <div className="flex-1 flex justify-end">
        <button
          type="button"
          onClick={handleDebouncedSubmit}
          disabled={isSubmitDisabled}
          className={cn(
            'label-1-bold px-[14px] py-2 rounded-lg',
            !isSubmitDisabled ? 'text-label-normal' : 'text-label-assistive'
          )}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};
