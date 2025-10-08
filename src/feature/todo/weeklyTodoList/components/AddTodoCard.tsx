import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchAddTodo } from '../hooks/useFetchAddTodo';
import { Goal } from '@/shared/type/goal';
import { useTodoBoardActions } from '@/model/todo/todoList';
import { useToast } from '@/shared/components/feedBack/toast';
import { PlusIcon } from '@/shared/constants/icons';

interface AddTodoCardProps {
  goal: Goal;
  selectedPlanId: string;
  selectedDate: Date | null;
}

interface AddTodoFormData {
  content: string;
}

export const AddTodoCard = ({ goal, selectedPlanId, selectedDate }: AddTodoCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();
  const { refreshTodoList } = useTodoBoardActions();
  const { addTodo, loading } = useFetchAddTodo({
    onSuccess: () => {
      refreshTodoList();
      reset({ content: '' });
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 300);
    },
    onError: error => {
      showToast(error?.response?.data.message || '투두 추가에 실패했습니다.', 'error');
    },
  });

  const { register, handleSubmit, reset } = useForm<AddTodoFormData>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: AddTodoFormData) => {
    if (!selectedDate) return;

    if (data.content.trim()) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      await addTodo({
        goalId: goal.id,
        planId: selectedPlanId,
        date: formattedDate,
        content: data.content.trim(),
      });
    }
  };

  const handleBlur = () => {
    reset({ content: '' });
  };

  const handlePlusClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 300);
    }
  };

  return (
    <div className="rounded-lg px-[14px] py-[8px] flex items-center gap-3">
      <div className="flex items-center">
        <button type="button" onClick={handlePlusClick} title="Todo 추가">
          <PlusIcon className="text-[#70737C]" />
        </button>
      </div>
      <div className="flex-1 flex items-center gap-2 h-[36px] relative">
        <form
          className="flex-1 h-[36px] grid grid-cols-[1fr_auto] items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('content', {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
            ref={e => {
              register('content').ref(e);
              inputRef.current = e;
            }}
            enterKeyHint="next"
            type="text"
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="bg-transparent text-[16px] text-white border-none outline-none appearance-none w-full"
            disabled={loading}
            placeholder="Todo 추가"
          />
        </form>
      </div>
    </div>
  );
};
