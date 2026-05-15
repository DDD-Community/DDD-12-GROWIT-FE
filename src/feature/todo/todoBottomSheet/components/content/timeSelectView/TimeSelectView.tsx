'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon } from '../../shared/icons';
import type { TodoFormData } from '../../../types';

interface TimeSelectViewProps {
  /** 뒤로가기 */
  onBack: () => void;
  /** 적용 후 메인으로 */
  onComplete: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pad = (n: number) => String(n).padStart(2, '0');

const parseTime = (time?: string) => {
  if (!time) return { hour: 9, minute: 0 };
  const m = /^(\d{2}):(\d{2})$/.exec(time);
  if (!m) return { hour: 9, minute: 0 };
  return { hour: Number(m[1]), minute: Number(m[2]) };
};

/**
 * 시간 선택 sub-view (BottomSheet stack).
 * 시(0-23) / 분(0-59) 두 column select로 시간을 설정.
 */
export const TimeSelectView = ({ onBack, onComplete }: TimeSelectViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const initial = parseTime(watch('time'));
  const [hour, setHour] = useState<number>(initial.hour);
  const [minute, setMinute] = useState<number>(initial.minute);

  const handleApply = () => {
    setValue('time', `${pad(hour)}:${pad(minute)}`, { shouldDirty: true });
    onComplete();
  };

  const handleClear = () => {
    setValue('time', undefined, { shouldDirty: true });
    onComplete();
  };

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center px-5 pt-2 pb-4">
          <button
            type="button"
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center"
            aria-label="뒤로가기"
          >
            <ChevronLeftIcon />
          </button>
          <p className="flex-1 text-center body-1-bold text-white">시간</p>
          <button
            type="button"
            onClick={handleApply}
            className="label-1-bold px-[14px] py-2 rounded-lg text-white"
          >
            적용
          </button>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content>
        <div className="flex flex-col gap-5 px-5 pb-5">
          <div className="flex items-center justify-center gap-3 text-white text-[18px] font-medium">
            <select
              value={hour}
              onChange={e => setHour(Number(e.target.value))}
              aria-label="시"
              className="bg-[#171717] border border-[#27272A] rounded-md px-4 py-3 text-center min-w-[80px] outline-none"
            >
              {HOURS.map(h => (
                <option key={h} value={h}>
                  {pad(h)}
                </option>
              ))}
            </select>
            <span className="text-[#A1A1A1]">시</span>
            <select
              value={minute}
              onChange={e => setMinute(Number(e.target.value))}
              aria-label="분"
              className="bg-[#171717] border border-[#27272A] rounded-md px-4 py-3 text-center min-w-[80px] outline-none"
            >
              {MINUTES.map(m => (
                <option key={m} value={m}>
                  {pad(m)}
                </option>
              ))}
            </select>
            <span className="text-[#A1A1A1]">분</span>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="self-center text-sm text-[#A1A1A1] underline"
          >
            시간 설정 안 함
          </button>
        </div>
      </BottomSheet.Content>
    </>
  );
};

export default TimeSelectView;
