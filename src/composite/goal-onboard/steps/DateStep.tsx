'use client';

import { useState } from 'react';
import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { CellButton } from '@/shared/components/input/CellButton';
import DateSelectorPanel from '@/feature/todo/weeklyTodoList/components/DateSelectorPanel';
import { CheckCircleIcon, XCircleIcon } from '@/shared/constants/icons';
import { ChevronRight } from 'lucide-react';

interface DateStepProps {
  startDate: string;
  endDate: string;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
}

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return '선택';
  const date = new Date(dateStr);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[date.getDay()];
  return `${year}.${month}.${day}.${dayName}`;
};

export const DateStep = ({ startDate, endDate, onChangeStartDate, onChangeEndDate }: DateStepProps) => {
  const [openStartPanel, setOpenStartPanel] = useState(false);
  const [openEndPanel, setOpenEndPanel] = useState(false);
  const today = new Date();

  const startDateObj = startDate ? new Date(startDate) : today;
  const endDateObj = endDate ? new Date(endDate) : today;
  const minEndDate = startDate ? new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000) : today;

  return (
    <FlexBox direction="col" className="flex-1 px-5 pt-6 overflow-y-auto pb-24">
      <FlexBox direction="col" className="items-center mb-8">
        <div className="relative w-[236px] h-[190px] mb-4 -ml-5">
          <Image src="/goal-onboard/goal-onboard-3.png" alt="그로롱 캐릭터" fill className="object-contain" priority />
        </div>
        <h2 className="text-xl font-bold text-white text-center">언제까지 목표를 이뤄볼까?</h2>
      </FlexBox>

      <FlexBox direction="col" className="gap-4">
        {/* 시작일 선택 */}
        <CellButton
          type="button"
          onClick={() => {
            setOpenStartPanel(!openStartPanel);
            setOpenEndPanel(false);
          }}
          renderLeftSide={() => (
            <div className="flex items-center gap-2">
              <CheckCircleIcon />
              <span className="label-1-normal text-text-primary">시작일</span>
            </div>
          )}
          renderRightSide={() => (
            <div className="flex items-center gap-2 text-text-strong">
              <span className="label-1-normal">{formatDateDisplay(startDate)}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        />
        {openStartPanel && (
          <DateSelectorPanel
            selectedDate={startDateObj}
            focusedDate={startDateObj}
            onDateSelect={date => {
              onChangeStartDate(formatDateToYYYYMMDD(date));
              setOpenStartPanel(false);
            }}
            onFocusedDateChange={() => {}}
            minDate={today}
          />
        )}

        {/* 종료일 선택 */}
        <CellButton
          type="button"
          onClick={() => {
            setOpenEndPanel(!openEndPanel);
            setOpenStartPanel(false);
          }}
          renderLeftSide={() => (
            <div className="flex items-center gap-2">
              <XCircleIcon />
              <span className="label-1-normal text-text-primary">종료일</span>
            </div>
          )}
          renderRightSide={() => (
            <div className="flex items-center gap-2 text-text-strong">
              <span className="label-1-normal">{formatDateDisplay(endDate)}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        />
        {openEndPanel && (
          <DateSelectorPanel
            selectedDate={endDateObj}
            focusedDate={endDateObj}
            onDateSelect={date => {
              onChangeEndDate(formatDateToYYYYMMDD(date));
              setOpenEndPanel(false);
            }}
            onFocusedDateChange={() => {}}
            minDate={minEndDate}
          />
        )}
      </FlexBox>

      <p className="text-sm text-status-negative mt-4">ⓘ 목표 기간은 최소 1주, 최대 1년까지 설정 가능합니다.</p>
    </FlexBox>
  );
};
