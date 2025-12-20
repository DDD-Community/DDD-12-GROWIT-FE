'use client';

import { useFormContext } from 'react-hook-form';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon } from '../../shared/icons';
import { OptionCell } from '../../shared/optionCell';
import type { TodoFormData, FormRepeatType, REPEAT_TYPE_LABELS } from '../../../types';

interface RepeatSelectViewProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
  /** 날짜 선택 화면으로 이동 핸들러 */
  onGoToDateSelect: () => void;
  /** 반복 타입 라벨 */
  repeatLabels?: typeof REPEAT_TYPE_LABELS;
}

const REPEAT_OPTIONS: FormRepeatType[] = ['none', 'DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY'];

export const RepeatSelectView = ({
  onBack,
  onGoToDateSelect,
  repeatLabels = { none: '없음', DAILY: '매일', WEEKLY: '매주', BIWEEKLY: '격주', MONTHLY: '매월' },
}: RepeatSelectViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const currentRepeatType = watch('repeatType');

  // 반복 타입 선택 (선택만 하고 이동하지 않음)
  const handleSelect = (type: FormRepeatType) => {
    setValue('repeatType', type);

    // none 선택 시 routineDuration 초기화
    if (type === 'none') {
      setValue('routineDuration', undefined);
    }
  };

  // 완료 버튼 클릭
  const handleComplete = () => {
    if (currentRepeatType === 'none') {
      // 반복 없음이면 메인으로 돌아가기
      onBack();
    } else {
      // 반복 설정 시 → 날짜 선택 화면으로 이동
      onGoToDateSelect();
    }
  };

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-between px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="p-1 -ml-1">
            <ChevronLeftIcon />
          </button>
          <h2 className="body-1-normal-bold text-label-normal">반복</h2>
          <button type="button" onClick={handleComplete} className="label-1-bold text-label-normal">
            완료
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <div className="flex flex-col gap-2 items-center">
          {REPEAT_OPTIONS.map(type => (
            <OptionCell
              key={type}
              value={type}
              label={repeatLabels[type]}
              isSelected={currentRepeatType === type}
              onClick={handleSelect}
            />
          ))}
        </div>
      </BottomSheet.Content>
    </>
  );
};

export default RepeatSelectView;
