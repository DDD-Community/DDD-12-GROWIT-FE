import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';
import DateSelectorPanel from './DateSelectorPanel';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { Z_INDEX } from '@/shared/lib/z-index';

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
  placeholder?: string;
}

export const DateSelector = ({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  placeholder = '날짜 선택',
}: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(selectedDate);
  const [selectedDateLocal, setSelectedDateLocal] = useState<Date | undefined>(selectedDate);
  const { trackButtonClick } = useGTMActions();

  // selectedDate prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    setSelectedDateLocal(selectedDate);
    setFocusedDate(selectedDate);
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Sheet가 열릴 때 selectedDate를 초기값으로 설정
      setSelectedDateLocal(selectedDate);
      setFocusedDate(selectedDate || new Date());
      trackButtonClick({
        eventName: GTM_EVENTS.SHEET_OPEN,
        buttonName: GTM_BUTTON_NAME.DATE_SELECTOR_SHEET,
      });
    } else {
      trackButtonClick({
        eventName: GTM_EVENTS.SHEET_CLOSE,
        buttonName: GTM_BUTTON_NAME.DATE_SELECTOR_SHEET,
      });
    }
  };

  const handleComplete = () => {
    if (selectedDateLocal) {
      onDateSelect(selectedDateLocal);
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button type="button" className="flex items-center justify-between gap-2 px-3 py-2 focus:outline-none">
          <span className="headline-1-bold text-label-normal">
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
          <svg className="w-4 h-4 text-label-alternative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className={`h-[60vh] ${Z_INDEX.SHEET}`}>
        {/* <div className="flex items-center justify-between w-full">
          <button type="button" className="label-1-normal font-bold text-status-negative">
            닫기
          </button>
        </div> */}
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-between text-label-normal">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="label-1-normal font-bold text-status-negative"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleComplete}
              disabled={!selectedDateLocal}
              className="label-1-normal font-bold"
            >
              완료
            </button>
          </div>
          <DateSelectorPanel
            selectedDate={selectedDateLocal}
            focusedDate={focusedDate || new Date()}
            isStartDate={false}
            minDate={minDate}
            maxDate={maxDate}
            onDateSelect={setSelectedDateLocal}
            onFocusedDateChange={setFocusedDate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
