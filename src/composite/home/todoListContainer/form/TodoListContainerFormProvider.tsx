'use client';

import { useForm } from 'react-hook-form';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoListContainerFormValues, TodoListContainerFormProviderProps } from './types';
import { getEditingTodoDefault } from '../helper';

/** Container 상태 관리용 Form Provider (Render Props 패턴) */
export const TodoListContainerFormProvider = ({ children }: TodoListContainerFormProviderProps) => {
  const methods = useForm<TodoListContainerFormValues>({
    defaultValues: {
      calendarView: 'weekly',
      selectedDate: new Date(),
      editingTodo: getEditingTodoDefault(),
    },
  });

  const selectedDate = methods.watch('selectedDate');
  const calendarView = methods.watch('calendarView');
  const editingTodo = methods.watch('editingTodo');

  const setSelectedDate = (date: Date) => methods.setValue('selectedDate', date);
  const setCalendarView = (view: TodoListContainerFormValues['calendarView']) => methods.setValue('calendarView', view);
  const setEditingTodo = (todo: GoalTodo) => methods.setValue('editingTodo', todo);

  return children({
    selectedDate,
    calendarView,
    editingTodo,
    setSelectedDate,
    setCalendarView,
    setEditingTodo,
  });
};
