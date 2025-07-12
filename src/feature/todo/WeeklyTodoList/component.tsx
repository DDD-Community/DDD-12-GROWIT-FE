import { useState } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from './hooks';
import { WEEKDAYS, WEEKENDS } from './const';

interface WeeklyTodoItemProps {
  todo: Todo;
}

interface WeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
}

export const WeeklyTodoList = ({ weeklyTodos }: WeeklyTodoListProps) => {
  const [showWeekend, setShowWeekend] = useState(false);
  const days = showWeekend ? WEEKENDS : WEEKDAYS;

  return (
    <div className="flex flex-col">
      <div className={`grid ${showWeekend ? 'grid-cols-2' : 'grid-cols-5'} gap-2 min-h-[300px]`}>
        {days.map(day => (
          <div key={day.key} className="flex flex-col gap-2">
            <div className="text-label-disable text-xs text-center mb-1">{day.label}</div>
            {((weeklyTodos?.[day.key as DAY_OF_THE_WEEK] || []) as Todo[]).map((todo: Todo) => (
              <WeeklyTodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
          disabled={!showWeekend}
          onClick={() => setShowWeekend(false)}
        >
          &lt;
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
          disabled={showWeekend}
          onClick={() => setShowWeekend(true)}
        >
          &gt;
        </button>
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
