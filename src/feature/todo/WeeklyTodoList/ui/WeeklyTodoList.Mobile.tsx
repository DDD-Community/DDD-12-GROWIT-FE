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
import EditTodoModal from './EditTodoModal';
import DeleteTodoModal from './DeleteTodoModal';

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface MobileWeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
  onWeekChange?: (weekOfMonth: number) => void;
  onToggleWeekend?: (showWeekend: boolean) => void;
}

export const MobileWeeklyTodoList = ({
  weeklyTodos,
  goal,
  currentWeekIndex,
  onToggleTodo,
  onEdit,
  onDelete,
  onWeekChange,
  onToggleWeekend,
}: MobileWeeklyTodoListProps) => {
  const [selectedDay, setSelectedDay] = useState<DAY_OF_THE_WEEK>('MONDAY');
  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });

  // currentWeekIndex는 1부터 시작하는 주차 번호이므로 0부터 시작하는 인덱스로 변환
  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex - 1);
  const days = getAllWeekDates(weekStart); // 모바일에서는 평일과 주말 모두 포함

  // props가 변경되면 모달 상태 초기화
  useEffect(() => {
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, currentWeekIndex]);

  const selectedDayTodos = weeklyTodos[selectedDay] || [];

  const handleEditSubmit = (updatedTodo: Todo) => {
    setEditModal({ open: false, todo: null });
    // Todo 수정 후 부모 컴포넌트에 알림
    onEdit?.(updatedTodo);
  };

  const handleDeleteSubmit = (todo: Todo) => {
    setDeleteModal({ open: false, todo: null });
    onDelete?.(todo);
  };

  return (
    <div className="flex flex-col">
      {/* 모달 영역 */}
      <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        goal={goal}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
        onWeekChange={onWeekChange}
        onToggleWeekend={onToggleWeekend}
      />
      <DeleteTodoModal
        open={deleteModal.open}
        todo={deleteModal.todo}
        onClose={() => setDeleteModal({ open: false, todo: null })}
        onDelete={handleDeleteSubmit}
      />

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
                    ? 'bg-accent-violet text-white'
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
              onEdit={() => setEditModal({ open: true, todo })}
              onDelete={() => setDeleteModal({ open: true, todo })}
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

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    const newChecked = !checked;

    try {
      await mutate(todo.id, newChecked);
      setChecked(newChecked);
      onToggleTodo(dayOfWeek, todo.id);
    } catch (error) {
      console.error('Todo 상태 변경 실패:', error);
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
            수정
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
