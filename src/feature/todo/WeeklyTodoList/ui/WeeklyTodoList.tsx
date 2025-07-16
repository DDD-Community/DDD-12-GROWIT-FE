import EditTodoModal from './EditTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import { useState, useEffect } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from '../hooks';
import Button from '@/shared/components/navigation/Button';
import { Goal } from '@/shared/type/goal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import { getDateString, isToday, getWeekStartDate, getWeekDates } from '../utils';

interface WeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface WeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
}

export const WeeklyTodoList = ({ weeklyTodos, goal, currentWeekIndex, onToggleTodo }: WeeklyTodoListProps) => {
  const [showWeekend, setShowWeekend] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });

  // props가 변경되면 모달 상태 초기화
  useEffect(() => {
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, currentWeekIndex]);

  // currentWeekIndex는 1부터 시작하는 주차 번호이므로 0부터 시작하는 인덱스로 변환
  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex - 1);
  const days = getWeekDates(weekStart, showWeekend);

  const handleEditSubmit = (updatedTodo: Todo) => {
    // TODO: 패치 로직 구현
    console.log('Edit submitted:', updatedTodo);
    setEditModal({ open: false, todo: null });
  };

  const handleDeleteSubmit = (todo: Todo) => {
    // TODO: 패치 로직 구현
    console.log('Delete submitted:', todo);
    setDeleteModal({ open: false, todo: null });
  };

  return (
    <div className="flex flex-col">
      {/* 모달 영역 */}
      <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
      />
      <DeleteTodoModal
        open={deleteModal.open}
        todo={deleteModal.todo}
        onClose={() => setDeleteModal({ open: false, todo: null })}
        onDelete={handleDeleteSubmit}
      />
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
                <span className="flex items-center justify-center text-label-normal w-7 h-7 text-sm">{day.label}</span>
              )}
              <span className="text-xs text-[#AEB0B6]">{getDateString(day.date)}</span>
            </div>
            {/* 투두 카드 리스트 */}
            {(weeklyTodos?.[day.key] || []).map(todo => (
              <WeeklyTodoItem
                key={todo.id}
                todo={todo}
                dayOfWeek={day.key}
                onToggleTodo={onToggleTodo}
                onEdit={() => setEditModal({ open: true, todo })}
                onDelete={() => setDeleteModal({ open: true, todo })}
              />
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

const WeeklyTodoItem = ({ todo, dayOfWeek, onToggleTodo, onEdit, onDelete }: WeeklyTodoItemProps) => {
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

  const handleEdit = () => {
    // TODO: 편집 기능 구현
    onEdit?.();
  };

  const handleDelete = () => {
    // TODO: 삭제 기능 구현
    onDelete?.();
  };

  return (
    <div className="bg-elevated-assistive rounded-lg p-3 flex items-center gap-2 relative group">
      <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      <span className={`text-sm ${todo.isCompleted ? 'line-through text-label-disable' : 'text-label-normal'}`}>
        {todo.content}
      </span>
      {/* 더보기 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-fill-normal">
            ⋮
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
