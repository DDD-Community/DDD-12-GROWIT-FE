import { cn } from '@/shared/lib/utils';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { isToday, getDateString } from '@/model/todo/selectedDay/utils';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { useSelectedDayActions } from '@/model/todo/selectedDay';

interface WeekDatePickerProps {
  weekDates: Array<{
    key: DAY_OF_THE_WEEK;
    label: string;
    date: Date;
  }>;
  selectedDay: DAY_OF_THE_WEEK;
  goal: {
    duration: {
      startDate: string;
      endDate: string;
    };
  };
}

export const WeekDatePicker = ({ weekDates, selectedDay, goal }: WeekDatePickerProps) => {
  const { updateDateInfo } = useSelectedDayActions();

  const handleDateClick = (date: Date) => {
    updateDateInfo(date);
  };

  return (
    <div className="grid grid-cols-7 gap-2 mb-[20px]">
      {weekDates.map((day, index) => {
        const isSelected = selectedDay === day.key;
        const isTodayDate = isToday(day.date);
        const goalStartDate = new Date(goal.duration.startDate);
        const goalEndDate = new Date(goal.duration.endDate);

        const isBeforeStart = day.date < goalStartDate;
        const isAfterEnd = day.date > goalEndDate;
        const isDisabled = isBeforeStart || isAfterEnd;

        const tooltipMessage = isBeforeStart ? '아직 목표가 시작되지 않은 날이에요.' : '목표가 종료된 이후예요.';

        let tooltipPosition: 'top-left' | 'top-center' | 'top-right' = 'top-center';
        if (index <= 1) {
          tooltipPosition = 'top-left';
        } else if (index >= 5) {
          tooltipPosition = 'top-right';
        }

        return (
          <div key={day.key} className="relative group">
            <button
              onClick={() => !isDisabled && handleDateClick(day.date)}
              disabled={isDisabled}
              className={cn(
                'relative flex flex-col items-center justify-center gap-[4px] w-full',
                isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'
              )}
            >
              <span
                className={cn(
                  'flex relative items-center justify-center w-[30px] h-[30px] rounded-full text-sm',
                  isSelected ? 'bg-white text-[#23242A] font-bold shadow' : 'text-label-normal',
                  isDisabled && 'text-gray-500'
                )}
              >
                {day.label}
                {isTodayDate && <div className="absolute top-[2px] w-[4px] h-[4px] rounded-[6px] bg-accent-fg-lime" />}
              </span>
              <span
                className={cn(
                  'text-xs text-[#AEB0B6]',
                  isSelected && 'font-bold text-white',
                  isDisabled && 'text-gray-600'
                )}
              >
                {getDateString(day.date)}
              </span>
            </button>
            {isDisabled && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <ToolTip text={tooltipMessage} position={tooltipPosition} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
