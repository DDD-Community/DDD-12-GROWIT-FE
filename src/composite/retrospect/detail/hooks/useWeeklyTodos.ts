import { useState, useMemo } from 'react';
import { WeekOfDayTodo } from '../type';

const dayMapping = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
} as const;

export const useWeeklyTodos = (weeklyData: Record<string, WeekOfDayTodo[]>) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const weeklyStates = useMemo(() => {
    return Object.entries(dayMapping).map(([korDay, engDay]) => {
      const todos = weeklyData[engDay] || [];
      const completedTodosCount = todos.filter(todo => todo.isCompleted).length;
      const progress = todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0;
      // 현재 api 응답 기준으로는
      // const date =
      //   todos.length > 0
      //     ? new Date(todos[0].date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
      //     : '';

      return {
        korDay,
        todos,
        progress,
        hasContent: todos.length > 0,
      };
    });
  }, [weeklyData]);

  const selectedDayTodos = useMemo(() => {
    if (!selectedDay) return [];
    const englishDay = dayMapping[selectedDay as keyof typeof dayMapping];
    return weeklyData[englishDay] || [];
  }, [selectedDay, weeklyData]);

  return {
    weeklyStates,
    selectedDay,
    setSelectedDay,
    selectedDayTodos,
  };
};
