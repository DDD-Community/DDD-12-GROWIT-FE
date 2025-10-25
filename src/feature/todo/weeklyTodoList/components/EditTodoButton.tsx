import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Goal } from '@/shared/type/goal';
import { Todo } from '@/shared/type/Todo';
import { useToast } from '@/shared/components/feedBack/toast';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useFetchEditTodo } from '../hooks/useFetchEditTodo';
import { useFetchDeleteTodo } from '../hooks/useFetchDeleteTodo';
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/shared/components/ui/sheet';
import { TextArea } from '@/shared/components/input/TextArea';
import { DateSelector } from './DateSelector';
import { Z_INDEX } from '@/shared/lib/z-index';
import { useTodoBoardActions } from '@/model/todo/todoList';

interface EditTodoButtonProps {
  todo: Todo;
  goal: Goal;
  onSubmit: (updated: Todo) => void;
}

interface EditTodoFormData {
  content: string;
  selectedDate: Date | undefined;
}

export const EditTodoButton = ({ todo, goal, onSubmit }: EditTodoButtonProps) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const { trackButtonClick } = useGTMActions();
  const { refreshTodoList } = useTodoBoardActions();

  const { isLoading, editTodo } = useFetchEditTodo({
    onSuccess: updatedTodo => {
      onSubmit(updatedTodo);
      setOpen(false);
      refreshTodoList();
    },
  });

  const { deleteTodoItem } = useFetchDeleteTodo({
    onSuccess: () => {
      showToast('투두가 삭제되었습니다.', 'success');
      setOpen(false);
      refreshTodoList();
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || '투두 삭제에 실패했습니다.';
      showToast(errorMessage, 'error');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<EditTodoFormData>({
    mode: 'onChange',
    defaultValues: {
      content: todo?.content || '',
      selectedDate: todo?.date ? new Date(todo.date) : undefined,
    },
  });

  const watchedContent = watch('content');
  const watchedSelectedDate = watch('selectedDate');
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  useEffect(() => {
    if (todo) {
      reset({
        content: todo.content || '',
        selectedDate: todo.date ? new Date(todo.date) : undefined,
      });
    }
  }, [todo, reset]);

  const onSubmitForm = async (data: EditTodoFormData) => {
    if (!todo || !data.selectedDate) return;

    const year = data.selectedDate.getFullYear();
    const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(data.selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    await editTodo(todo.id, data.content.trim(), formattedDate);
  };

  const handleDateSelect = (date: Date) => {
    setValue('selectedDate', date, { shouldValidate: true });
  };

  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodoItem(todo.id);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      trackButtonClick({
        eventName: GTM_EVENTS.SHEET_CLOSE,
        buttonName: GTM_BUTTON_NAME.EDIT_TODO_SHEET,
      });
    }
  };

  const handleEditClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.TODO_EDIT,
    });
    trackButtonClick({
      eventName: GTM_EVENTS.SHEET_OPEN,
      buttonName: GTM_BUTTON_NAME.EDIT_TODO_SHEET,
    });
    setOpen(true);
  };

  // selectedDate 필드 등록 (숨겨진 input으로)
  const { ref: dateRef, ...dateRegister } = register('selectedDate', {
    required: '날짜를 선택해주세요.',
    validate: value => {
      if (!value) {
        return '날짜를 선택해주세요.';
      }
      return true;
    },
  });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="p-1 rounded hover:bg-[#2A2B31] transition-colors hover:cursor-pointer"
          onClick={handleEditClick}
        >
          <span className="text-white text-lg">⋮</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className={`h-[50vh] ${Z_INDEX.SHEET}`}>
        <SheetHeader>
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={handleDelete} className="label-1-normal font-bold text-status-negative">
              삭제
            </button>
            <DateSelector
              selectedDate={watchedSelectedDate}
              onDateSelect={handleDateSelect}
              minDate={startDate}
              maxDate={endDate}
              placeholder="날짜 선택"
            />
            <button
              type="button"
              onClick={handleSubmit(onSubmitForm)}
              disabled={isLoading || !isValid}
              className="label-1-normal font-bold text-label-normal"
            >
              완료
            </button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col h-full">
          <div className="flex-1 p-4">
            <input type="hidden" {...dateRegister} ref={dateRef} />
            <TextArea
              className="min-h-[120px] h-full"
              maxLength={30}
              {...register('content', {
                required: '내용을 입력해주세요.',
                minLength: {
                  value: 5,
                  message: '5글자 이상 입력해주세요.',
                },
                validate: value => {
                  if (!value.trim()) {
                    return '내용을 입력해주세요.';
                  }
                  return true;
                },
              })}
              placeholder="투두 내용을 입력하세요"
              isError={!!errors.content}
              errorMessage={errors.content?.message}
            />
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
