import { useState, useEffect } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from '../hooks';
import { Goal } from '@/shared/type/goal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import { getDateString, isToday, getWeekStartDate, getAllWeekDates } from '../utils';

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface MobileWeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
}

export const MobileWeeklyTodoList = ({
  weeklyTodos,
  goal,
  currentWeekIndex,
  onToggleTodo,
  onEdit,
  onDelete,
}: MobileWeeklyTodoListProps) => {
  const [selectedDay, setSelectedDay] = useState<DAY_OF_THE_WEEK>('MONDAY');

  // currentWeekIndex는 1부터 시작하는 주차 번호이므로 0부터 시작하는 인덱스로 변환
  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex - 1);
  const days = getAllWeekDates(weekStart); // 모바일에서는 평일과 주말 모두 포함

  // 오늘 날짜가 포함된 요일을 찾아서 초기 선택값으로 설정
  useEffect(() => {
    const todayDay = days.find(day => isToday(day.date));
    if (todayDay) {
      setSelectedDay(todayDay.key);
    }
  }, [days]);

  const selectedDayTodos = weeklyTodos[selectedDay] || [];

  return (
    <div className="flex flex-col">
      {/* 요일/날짜 선택 섹션 */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map(day => {
          const isSelected = selectedDay === day.key;
          const isTodayDate = isToday(day.date);

          return (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`
                flex flex-col items-center justify-center h-[56px] rounded-2xl
                ${
                  isTodayDate
                    ? 'bg-purple-500 text-white'
                    : isSelected
                      ? 'bg-white text-[#23242A] font-[600]'
                      : 'bg-[#2A2B31] text-[#AEB0B6]'
                }
                transition-colors duration-200
              `}
            >
              <span className="text-xs font-medium">{day.label}</span>
              <span className="text-xs mt-1">{getDateString(day.date)}</span>
            </button>
          );
        })}
      </div>

      {/* 선택된 날짜의 Todo 목록 */}
      <div className="flex flex-col gap-3 min-h-[200px]">
        {selectedDayTodos.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-8 text-[#AEB0B6]">이 날의 Todo 가 없어요 ㅠ_ㅠ</div>
          </div>
        ) : (
          selectedDayTodos.map(todo => (
            <MobileWeeklyTodoItem
              key={todo.id}
              todo={todo}
              dayOfWeek={selectedDay}
              onToggleTodo={onToggleTodo}
              onEdit={() => onEdit?.(todo)}
              onDelete={() => onDelete?.(todo)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const MobileWeeklyTodoItem = ({ todo, dayOfWeek, onToggleTodo, onEdit, onDelete }: MobileWeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);

  const handleCheck = async () => {
    const newChecked = !checked;

    try {
      // 서버에 상태 변경 요청
      await mutate(todo.id, newChecked);

      // 성공 시 로컬 상태 업데이트 및 onToggleTodo 호출
      setChecked(newChecked);
      onToggleTodo?.(dayOfWeek, todo.id);
    } catch (error) {
      // 실패 시 원래 상태 유지 (checked 상태는 변경하지 않음)
      console.error('Todo 상태 변경 실패:', error);
      // onToggleTodo도 호출하지 않음
    }
  };

  return (
    <div className="bg-elevated-assistive border-[1px] border-line-normal rounded-lg p-[14px] flex items-center gap-3 shadow">
      <div className="flex items-center">
        <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      </div>
      <span className={`flex-1 text-sm ${todo.isCompleted ? 'line-through text-[#70737C]' : 'text-white'} truncate`}>
        {todo.content}
      </span>
      {/* 더보기 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded hover:bg-[#2A2B31] transition-colors">
            <span className="text-white text-lg">⋮</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
