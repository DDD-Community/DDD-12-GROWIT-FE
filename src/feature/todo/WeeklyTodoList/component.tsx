import { useState } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from './hooks';
import Button from '@/shared/components/navigation/Button';

interface WeeklyTodoItemProps {
  todo: Todo;
}

interface Goal {
  duration: {
    startDate: string;
    endDate: string;
  };
  plans: { id: string; content: string }[];
}

const DAY_LABELS: Record<DAY_OF_THE_WEEK, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const WEEKDAYS: DAY_OF_THE_WEEK[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const WEEKENDS: DAY_OF_THE_WEEK[] = ['SATURDAY', 'SUNDAY'];

function getDateString(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

// 주차별 시작 날짜 계산
function getWeekStartDate(startDate: string, weekIdx: number) {
  const start = new Date(startDate);
  start.setDate(start.getDate() + weekIdx * 7);
  return start;
}

// 해당 주차의 요일별 날짜 배열 반환
function getWeekDates(weekStart: Date, showWeekend: boolean) {
  if (showWeekend) {
    // 토요일: +5, 일요일: +6
    return [
      {
        key: 'SATURDAY' as DAY_OF_THE_WEEK,
        label: DAY_LABELS['SATURDAY'],
        date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 5),
      },
      {
        key: 'SUNDAY' as DAY_OF_THE_WEEK,
        label: DAY_LABELS['SUNDAY'],
        date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6),
      },
    ];
  } else {
    // 평일: 월~금 (idx 0~4)
    return WEEKDAYS.map((key, idx) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + idx);
      return { key, label: DAY_LABELS[key], date };
    });
  }
}

interface WeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
}

export const WeeklyTodoList = ({ weeklyTodos, goal, currentWeekIndex }: WeeklyTodoListProps) => {
  const [showWeekend, setShowWeekend] = useState(false);

  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex);
  const days = getWeekDates(weekStart, showWeekend);

  return (
    <div className="flex flex-col">
      <div className={`grid grid-cols-5 gap-2 min-h-[300px]`}>
        {days.map((day, idx) => (
          <div
            key={day.key}
            className={`
              flex flex-col gap-2
              ${idx !== 0 ? 'border-l border-[#70737C52]' : ''}
              px-1
            `}
          >
            {/* 날짜 + 요일 헤더 */}
            <div className="flex items-center mb-1 ml-2 gap-[8px]">
              {isToday(day.date) ? (
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#23242A] font-bold text-md shadow">
                  {day.label}
                </span>
              ) : (
                <span className="text-label-normal text-xs text-center">{day.label}</span>
              )}
              <span className="text-xs text-[#AEB0B6]">{getDateString(day.date)}</span>
            </div>
            {/* 투두 카드 리스트 */}
            {(weeklyTodos?.[day.key] || [])
              .filter(todo => todo.date === day.date.toISOString().split('T')[0])
              .map(todo => (
                <WeeklyTodoItem key={todo.id} todo={todo} />
              ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <div className="flex gap-[8px]">
          <Button
            size={'ml'}
            variant={'secondary'}
            text={'<'}
            disabled={!showWeekend}
            onClick={() => setShowWeekend(false)}
          />
          <Button
            size={'ml'}
            variant={'secondary'}
            text={'>'}
            disabled={showWeekend}
            onClick={() => setShowWeekend(true)}
          />
        </div>
      </div>
    </div>
  );
};

const WeeklyTodoItem = ({ todo }: WeeklyTodoItemProps) => {
  const [checked, setChecked] = useState(todo.isCompleted);
  const { mutate, isLoading } = usePatchTodoStatus();

  const handleCheck = async () => {
    if (checked || isLoading) return;
    setChecked(!checked);
    await mutate(todo.id, true);
  };

  return (
    <div className="bg-elevated-assistive rounded-lg p-3 flex items-center gap-2 relative group">
      <Checkbox checked={todo.isCompleted} onClick={handleCheck} />
      <span className={`text-sm ${todo.isCompleted ? 'line-through text-label-disable' : 'text-label-normal'}`}>
        {todo.content}
      </span>
      {/* 더보기 메뉴 자리 */}
      <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-fill-normal">
        ⋮
      </button>
    </div>
  );
};
