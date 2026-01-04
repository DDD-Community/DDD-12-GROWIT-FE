import { useState, useMemo } from 'react';
import { WeeklyTodosData } from '../api';

const dayMapping = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
} as const;

// 날짜에서 해당 주의 각 요일 날짜를 계산하는 함수
const getWeekDates = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const dates: { [key: string]: string } = {};

  // 월요일부터 시작하여 7일간 계산
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = dayNames[currentDate.getDay()];

    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    dates[dayName] = `${month}/${day}`;
  }

  return dates;
};

export const useWeeklyTodos = (totalWeeklyTodos: WeeklyTodosData[], plans: any[]) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string>('월');

  // 현재 주차의 todos 데이터
  const currentWeekTodos = totalWeeklyTodos[currentWeek - 1] || {
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  };

  // 현재 주차의 plans 데이터
  const currentPlan = plans[currentWeek - 1];

  // 현재 주차의 각 요일별 날짜 계산
  const weekDates = useMemo(() => {
    if (!currentPlan?.duration) {
      return {};
    }
    return getWeekDates(currentPlan.duration.startDate, currentPlan.duration.endDate);
  }, [currentPlan]);

  const weeklyStates = useMemo(() => {
    return Object.entries(dayMapping).map(([korDay, engDay]) => {
      const todos = currentWeekTodos[engDay] || [];
      const completedTodosCount = todos.filter(todo => todo.isCompleted).length;
      const progress = todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0;

      return {
        korDay,
        todos,
        progress,
        hasContent: todos.length > 0,
        dateString: weekDates[engDay] || '',
      };
    });
  }, [currentWeekTodos, weekDates]);

  const selectedDayTodos = useMemo(() => {
    if (!selectedDay) return [];
    const englishDay = dayMapping[selectedDay as keyof typeof dayMapping];
    return currentWeekTodos[englishDay] || [];
  }, [selectedDay, currentWeekTodos]);

  // 주차 변경 핸들러
  const handleWeekChange = (direction: number) => {
    const newWeek = currentWeek + direction;
    const maxWeeks = totalWeeklyTodos.length;

    if (newWeek >= 1 && newWeek <= maxWeeks) {
      setCurrentWeek(newWeek);
      setSelectedDay('월'); // 주차 변경 시 선택된 요일 초기화
    }
  };

  return {
    currentWeek,
    weeklyStates,
    selectedDay,
    setSelectedDay,
    selectedDayTodos,
    handleWeekChange,
  };
};
