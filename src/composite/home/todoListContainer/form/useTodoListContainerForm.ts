'use client';

import { useForm } from 'react-hook-form';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { CalendarView } from '@/feature/todo/calendar';
import { TodoListContainerFormValues } from './types';
import { getEditingTodoDefault } from '../helper';

export const useTodoListContainerForm = () => {
  const methods = useForm<TodoListContainerFormValues>({
    defaultValues: {
      calendarView: 'weekly',
      selectedDate: new Date(),
      editingTodo: getEditingTodoDefault(),
    },
  });

  return {
    selectedDate: methods.watch('selectedDate'),
    calendarView: methods.watch('calendarView'),
    editingTodo: methods.watch('editingTodo'),
    setSelectedDate: (date: Date) => methods.setValue('selectedDate', date),
    setCalendarView: (view: CalendarView) => methods.setValue('calendarView', view),
    setEditingTodo: (todo: GoalTodo) => methods.setValue('editingTodo', todo),
  };
};
