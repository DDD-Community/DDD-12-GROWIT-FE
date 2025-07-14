import EditTodoModal from './EditTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import { useState, useEffect } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from '../hooks';
import Button from '@/shared/components/navigation/Button';
import { DAY_LABELS, WEEKDAYS } from '../const';
import { Goal } from '@/shared/type/goal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';

interface WeeklyTodoItemProps {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
}

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

  // 시작 날짜가 해당 주의 월요일이 되도록 조정
  const dayOfWeek = start.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 월요일까지의 일수

  // 시작 날짜를 해당 주의 월요일로 조정
  start.setDate(start.getDate() - daysToMonday);

  // 주차에 따라 7일씩 더하기
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
            {(weeklyTodos?.[day.key] || [])
              .filter(todo => todo.date === day.date.toISOString().split('T')[0])
              .map(todo => (
                <WeeklyTodoItem
                  key={todo.id}
                  todo={todo}
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

const WeeklyTodoItem = ({ todo, onEdit, onDelete }: WeeklyTodoItemProps) => {
  const { mutate } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);

  const handleCheck = async () => {
    setChecked(!checked);
    await mutate(todo.id, !checked);
  };

  const handleEdit = () => {
    // TODO: 편집 기능 구현
    console.log('편집:', todo.id);
    onEdit?.();
  };

  const handleDelete = () => {
    // TODO: 삭제 기능 구현
    console.log('삭제:', todo.id);
    onDelete?.();
  };

  return (
    <div className="bg-elevated-assistive rounded-lg p-3 flex items-center gap-2 relative group">
      <Checkbox checked={checked} onClick={handleCheck} />
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
