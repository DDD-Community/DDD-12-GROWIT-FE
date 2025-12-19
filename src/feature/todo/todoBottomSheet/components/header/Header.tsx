'use client';

import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { FlagIcon } from '../icons';
import type { TodoFormData } from '../../types';

interface HeaderProps {
  selectedDate: Date;
  onSubmit: () => void;
  submitLabel?: string;
}

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
};

export const Header = ({ selectedDate, onSubmit, submitLabel = '완료' }: HeaderProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const isImportant = watch('isImportant');
  const content = watch('content');

  const isSubmitDisabled = !content?.trim();

  return (
    <div className="w-full flex items-center px-5 pt-2 pb-4">
      {/* 중요 표시 버튼 - 왼쪽 영역 */}
      <div className="flex-1 flex justify-start">
        <button
          type="button"
          onClick={() => setValue('isImportant', !isImportant)}
          className="w-6 h-6 flex items-center justify-center"
          aria-label={isImportant ? '중요 표시 해제' : '중요 표시'}
        >
          <FlagIcon filled={isImportant} />
        </button>
      </div>

      {/* 날짜 제목 - 중앙 */}
      <h2 className="body-1-bold text-white underline">{formatDate(selectedDate)}</h2>

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

export default Header;
