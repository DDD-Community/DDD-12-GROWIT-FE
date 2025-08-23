'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { getTodayDayOfWeek, getWeekStartDate, getAllWeekDates } from './utils';

interface SelectedDayState {
  selectedDay: DAY_OF_THE_WEEK;
  selectedDate: Date | null;
  weekDates: Array<{ key: DAY_OF_THE_WEEK; label: string; date: Date }>;
}

interface SelectedDayActions {
  updateDateInfo: (date: Date | string) => void;
  resetToToday: () => void;
  updateWeekDates: (startDate: string, weekIndex: number) => void;
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
  const [weekDates, setWeekDates] = useState<Array<{ key: DAY_OF_THE_WEEK; label: string; date: Date }>>([]);

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

  const updateWeekDates = useCallback(
    (startDate: string, weekIndex: number) => {
      const weekStart = getWeekStartDate(startDate, weekIndex - 1);
      const dates = getAllWeekDates(weekStart);
      setWeekDates(dates);

      // Update selectedDate if it's in the new week
      const currentDayDate = dates.find(d => d.key === selectedDay);
      if (currentDayDate) {
        setSelectedDateState(currentDayDate.date);
      }
    },
    [selectedDay]
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
    updateDateInfo,
    updateWeekDates,
    resetToToday,
  };

  return (
    <SelectedDayStateContext.Provider value={state}>
      <SelectedDayActionsContext.Provider value={actions}>{children}</SelectedDayActionsContext.Provider>
    </SelectedDayStateContext.Provider>
  );
};
