'use client';

import { useForm } from 'react-hook-form';
import { TodoListContainerFormValues, TodoListContainerFormProviderProps } from './types';

/** Container 상태 관리용 Form Provider (Render Props 패턴) */
export const TodoListContainerFormProvider = ({ children }: TodoListContainerFormProviderProps) => {
  const methods = useForm<TodoListContainerFormValues>({
    defaultValues: {
      selectedDate: new Date(),
      calendarView: 'weekly',
    },
  });

  const selectedDate = methods.watch('selectedDate');
  const calendarView = methods.watch('calendarView');

  const setSelectedDate = (date: Date) => methods.setValue('selectedDate', date);
  const setCalendarView = (view: TodoListContainerFormValues['calendarView']) => methods.setValue('calendarView', view);

  return children({
    selectedDate,
    calendarView,
    setSelectedDate,
    setCalendarView,
  });
};
