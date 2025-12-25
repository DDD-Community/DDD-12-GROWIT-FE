'use client';

import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { FlagIcon } from '../../shared/icons';
import type { TodoFormData } from '../../../types';

/** 헤더 날짜 포맷 (M월 D일 요일) */
const formatHeaderDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
};

interface MainViewHeaderProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 날짜 수정 클릭 핸들러 */
  onDateEdit?: () => void;
  /** 제출 핸들러 */
  onSubmit: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
}

/** MainView 헤더 컴포넌트 */
export const MainViewHeader = ({ selectedDate, onDateEdit, onSubmit, submitLabel }: MainViewHeaderProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();

  // 필요한 데이터 가져오기
  const isImportant = watch('isImportant');
  const content = watch('content');
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');

  // UI 상태 계산 (컴포넌트 내부에서 계산)
  const isContentValid = content?.trim() && content.trim().length <= 34;
  const isRoutineDurationValid =
    repeatType === 'none' ||
    (routineDuration?.startDate &&
      routineDuration?.endDate &&
      new Date(routineDuration.startDate) <= new Date(routineDuration.endDate));
  const isSubmitDisabled = !isContentValid || !isRoutineDurationValid;

  // 중요 표시 토글 핸들러
  const handleToggleImportant = () => {
    setValue('isImportant', !isImportant);
  };
  return (
    <div className="w-full flex items-center px-5 pt-2 pb-4">
      {/* 중요 표시 버튼 - 왼쪽 영역 */}
      <div className="flex-1 flex justify-start">
        <button
          type="button"
          onClick={handleToggleImportant}
          className="w-6 h-6 flex items-center justify-center"
          aria-label={isImportant ? '중요 표시 해제' : '중요 표시'}
        >
          <FlagIcon filled={isImportant} />
        </button>
      </div>

      {/* 날짜 제목 - 중앙 (클릭 시 날짜 수정 화면으로 이동) */}
      <button type="button" onClick={onDateEdit} className="body-1-bold text-white underline">
        {formatHeaderDate(selectedDate)}
      </button>

      {/* 완료 버튼 - 오른쪽 영역 */}
      <div className="flex-1 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
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
