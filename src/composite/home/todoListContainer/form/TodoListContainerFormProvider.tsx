'use client';

import { useState } from 'react';
import type { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoListContainerFormValues, TodoListContainerFormProviderProps } from './types';
import { getEditingTodoDefault } from '../helper';

/** Container 상태 관리용 Form Provider (Render Props 패턴) */
export const TodoListContainerFormProvider = ({ children }: TodoListContainerFormProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [calendarView, setCalendarView] = useState<TodoListContainerFormValues['calendarView']>('weekly');
  const [editingTodo, setEditingTodo] = useState<GoalTodo>(() => getEditingTodoDefault());

  return children({
    selectedDate,
    calendarView,
    editingTodo,
    setSelectedDate,
    setCalendarView,
    setEditingTodo,
  });
};
