import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Goal } from '@/shared/type/goal';
import { useTodoBoardActions } from '@/model/todo/todoList';
import { useToast } from '@/shared/components/feedBack/toast';
import { PlusIcon } from '@/shared/constants/icons';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useFetchAddTodo } from '../hooks/useFetchAddTodo';
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/shared/components/ui/sheet';
import { TextArea } from '@/shared/components/input/TextArea';
import { DateSelector } from './DateSelector';
import { Z_INDEX } from '@/shared/lib/z-index';

interface AddTodoButtonProps {
  goal: Goal;
  selectedPlanId: string;
  selectedDate: Date | null;
}

interface AddTodoFormData {
  content: string;
  selectedDate: Date | undefined;
}

export const AddTodoButton = ({ goal, selectedPlanId, selectedDate }: AddTodoButtonProps) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const { trackButtonClick } = useGTMActions();
  const { refreshTodoList } = useTodoBoardActions();

  const { addTodo, loading } = useFetchAddTodo({
    onSuccess: () => {
      refreshTodoList();
      reset({ content: '', selectedDate: selectedDate || undefined });
      setOpen(false);
      showToast('투두가 추가되었습니다.', 'success');
    },
    onError: error => {
      showToast(error?.response?.data.message || '투두 추가에 실패했습니다.', 'error');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<AddTodoFormData>({
    mode: 'onChange',
    defaultValues: {
      content: '',
      selectedDate: selectedDate || undefined,
    },
  });

  const watchedContent = watch('content');
  const watchedSelectedDate = watch('selectedDate');
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  const onSubmit = async (data: AddTodoFormData) => {
    if (!data.selectedDate) return;

    if (data.content.trim()) {
      const year = data.selectedDate.getFullYear();
      const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(data.selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      await addTodo({
        goalId: goal.id,
        planId: selectedPlanId,
        date: formattedDate,
        content: data.content.trim(),
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    setValue('selectedDate', date, { shouldValidate: true });
  };

  const handlePlusClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.ADD_TODO,
    });
    trackButtonClick({
      eventName: GTM_EVENTS.SHEET_OPEN,
      buttonName: GTM_BUTTON_NAME.ADD_TODO_SHEET,
    });
    setOpen(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      trackButtonClick({
        eventName: GTM_EVENTS.SHEET_CLOSE,
        buttonName: GTM_BUTTON_NAME.ADD_TODO_SHEET,
      });
      reset({ content: '', selectedDate: selectedDate || undefined });
    }
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
          onClick={handlePlusClick}
          className="rounded-lg px-[14px] py-[8px] flex items-center gap-3"
          title="Todo 추가"
        >
          <PlusIcon className="text-[#70737C]" />
          <span className="text-[#70737C] text-[16px]">Todo 추가</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className={`h-[50vh] ${Z_INDEX.SHEET}`}>
        <SheetHeader>
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="label-1-normal font-bold text-status-negative"
            >
              닫기
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
              onClick={handleSubmit(onSubmit)}
              disabled={loading || !isValid}
              className="label-1-normal font-bold text-label-normal"
            >
              완료
            </button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 px-4">
            <input type="hidden" {...dateRegister} ref={dateRef} />
            <TextArea
              className="h-full"
              maxLength={30}
              {...register('content', {
                required: '내용을 입력해주세요.',
                minLength: {
                  value: 1,
                  message: '1글자 이상 입력해주세요.',
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
