import { useState } from 'react';
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
  const { trackButtonClick } = useGTMActions();

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
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
        <div className="flex-1 p-4">
          <DateSelectorPanel
            selectedDate={selectedDate}
            focusedDate={focusedDate || new Date()}
            isStartDate={false}
            minDate={minDate}
            maxDate={maxDate}
            onDateSelect={handleDateSelect}
            onFocusedDateChange={setFocusedDate}
            onClose={() => handleOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
