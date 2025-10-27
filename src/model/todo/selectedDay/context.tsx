'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { getTodayDayOfWeek, getWeekStartDate, getAllWeekDates } from './utils';
import { DatePicker } from './type';

interface SelectedDayState {
  selectedDay: DAY_OF_THE_WEEK;
  selectedDate: Date | null;
  weekDates: DatePicker[];
}

interface SelectedDayActions {
  updateDateInfo: (date: Date | string) => void;
  resetToToday: () => void;
  initWeekDates: (goalStartDate: string, goalEndDate: string, weekIndex: number) => void;
  initWeekDatesToMonday: (goalStartDate: string, goalEndDate: string, weekIndex: number) => void;
}

export const useSelectedDay = () => {
  const state = useSelectedDayState();
  const actions = useSelectedDayActions();
  return { ...state, ...actions };
};

const SelectedDayStateContext = createContext<SelectedDayState | null>(null);
const SelectedDayActionsContext = createContext<SelectedDayActions | null>(null);

export const useSelectedDayState = () => {
  const context = useContext(SelectedDayStateContext);
  if (!context) {
    throw new Error('useSelectedDayState must be used within SelectedDayProvider');
  }
  return context;
};

export const useSelectedDayActions = () => {
  const context = useContext(SelectedDayActionsContext);
  if (!context) {
    throw new Error('useSelectedDayActions must be used within SelectedDayProvider');
  }
  return context;
};

interface SelectedDayProviderProps {
  children: ReactNode;
}

export const SelectedDayProvider = ({ children }: SelectedDayProviderProps) => {
  const [selectedDay, setSelectedDayState] = useState<DAY_OF_THE_WEEK>(getTodayDayOfWeek());
  const [selectedDate, setSelectedDateState] = useState<Date | null>(new Date());
  const [weekDates, setWeekDates] = useState<DatePicker[]>([]);

  const updateDateInfo = useCallback((date: Date | string) => {
    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return;
    } else {
      dateObj = date;
    }
    setSelectedDateState(dateObj);
    const dayOfWeek = dateObj.getDay();
    const dayMap: Record<number, DAY_OF_THE_WEEK> = {
      0: 'SUNDAY',
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY',
    };
    setSelectedDayState(dayMap[dayOfWeek] || 'MONDAY');
  }, []);

  const initWeekDates = useCallback(
    (goalStartDate: string, goalEndDate: string, weekIndex: number) => {
      const weekStartDate = getWeekStartDate(goalStartDate, weekIndex - 1);
      const goalStartDateDate = new Date(goalStartDate);
      const goalEndDateDate = new Date(goalEndDate);
      const dates = getAllWeekDates(weekStartDate, goalStartDateDate, goalEndDateDate);
      setWeekDates(dates);
    },
    [selectedDay]
  );

  const initWeekDatesToMonday = useCallback(
    (goalStartDate: string, goalEndDate: string, weekIndex: number) => {
      const weekStartDate = getWeekStartDate(goalStartDate, weekIndex - 1);
      const goalStartDateDate = new Date(goalStartDate);
      const goalEndDateDate = new Date(goalEndDate);
      const dates = getAllWeekDates(weekStartDate, goalStartDateDate, goalEndDateDate);

      // 월요일 찾기 (또는 첫 번째 유효한 날짜)
      const monday =
        dates.find(d => !d.isBeforeStart && !d.isAfterEnd && d.date.getDay() === 1) ||
        dates.find(d => !d.isBeforeStart && !d.isAfterEnd) ||
        dates[0];

      setWeekDates(dates);
      updateDateInfo(monday.date);
    },
    [updateDateInfo]
  );

  const resetToToday = useCallback(() => {
    const today = new Date();
    setSelectedDayState(getTodayDayOfWeek());
    setSelectedDateState(today);
  }, []);

  const state: SelectedDayState = {
    selectedDay,
    selectedDate,
    weekDates,
  };

  const actions: SelectedDayActions = {
    resetToToday,
    initWeekDates,
    initWeekDatesToMonday,
    updateDateInfo,
  };

  return (
    <SelectedDayStateContext.Provider value={state}>
      <SelectedDayActionsContext.Provider value={actions}>{children}</SelectedDayActionsContext.Provider>
    </SelectedDayStateContext.Provider>
  );
};
