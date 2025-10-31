import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { Goal } from '@/shared/type/goal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePatchTodoStatus } from '@/model/todo/todayTodoList/hooks/usePatchTodoStatus';
import Checkbox from '@/shared/components/input/Checkbox';
import { EditTodoButton } from './EditTodoButton';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useFetchEditTodo } from '@/feature/todo/weeklyTodoList/hooks/useFetchEditTodo';

interface TodoEditInputProps {
  isEditing: boolean;
  todo: Todo;
  onEditTodoItem: (updatedTodo: Todo) => void;
  onEditCancel: () => void;
}

interface EditFormData {
  content: string;
}

const TodoEditInput = ({ isEditing, todo, onEditTodoItem, onEditCancel }: TodoEditInputProps) => {
  const { editTodo } = useFetchEditTodo({
    onSuccess: updatedTodo => {
      onEditTodoItem(updatedTodo);
      onEditCancel();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditFormData>({
    defaultValues: {
      content: todo.content,
    },
  });

  useEffect(() => {
    reset({ content: todo.content });
  }, [todo.content, reset]);

  const onSubmit = async (data: EditFormData) => {
    if (data.content.trim() && data.content !== todo.content) {
      await editTodo(todo.id, data.content, todo.date);
    } else {
      onEditCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onEditCancel();
    }
  };

  if (!isEditing) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 h-[36px] grid grid-cols-[1fr_auto] items-center gap-2">
      <input
        {...register('content', {
          required: true,
          minLength: 1,
          maxLength: 30,
        })}
        type="text"
        onKeyDown={handleKeyDown}
        className="bg-transparent text-[16px] text-white border-none outline-none appearance-none w-full"
        disabled={isSubmitting}
        autoFocus
      />
    </form>
  );
};

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onEditTodoItem?: (updatedTodo: Todo) => void;
  goal?: Goal;
}

export const TodoCard = ({ todo, dayOfWeek, onToggleTodo, onEditTodoItem, goal }: MobileWeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const { trackButtonClick } = useGTMActions();

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.TODO_CHECK,
    });
    const newChecked = !checked;
    mutate(todo.id, newChecked);
    setChecked(newChecked);
    onToggleTodo(dayOfWeek, todo.id);
  };

  const handleClickEdit = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.TODO,
    });
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg px-[14px] py-[8px] flex items-center gap-3">
      <div className="flex items-center">
        <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      </div>
      <div className="flex-1 flex items-center gap-2" onBlur={handleBlur}>
        <TodoEditInput
          todo={todo}
          isEditing={isEditing}
          onEditTodoItem={onEditTodoItem || (() => {})}
          onEditCancel={handleEditCancel}
        />
        {!isEditing && (
          <span
            title="클릭하여 수정"
            className={`text-sm ${todo.isCompleted ? 'line-through text-[#70737C]' : 'text-white'} whitespace-normal cursor-pointer`}
            onClick={handleClickEdit}
          >
            {todo.content}
          </span>
        )}
      </div>
      {/* 더보기 메뉴 */}
      {!isEditing && goal && <EditTodoButton todo={todo} goal={goal} onSubmit={onEditTodoItem || (() => {})} />}
    </div>
  );
};
