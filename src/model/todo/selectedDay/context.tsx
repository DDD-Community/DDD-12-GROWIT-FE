'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { getTodayDayOfWeek } from '@/feature/todo/weeklyTodoList/utils';

interface SelectedDayState {
  selectedDay: DAY_OF_THE_WEEK;
}

interface SelectedDayActions {
  setSelectedDay: (day: DAY_OF_THE_WEEK) => void;
  resetToToday: () => void;
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

  const setSelectedDay = useCallback((day: DAY_OF_THE_WEEK) => {
    setSelectedDayState(day);
  }, []);

  const resetToToday = useCallback(() => {
    setSelectedDayState(getTodayDayOfWeek());
  }, []);

  const state: SelectedDayState = {
    selectedDay,
  };

  const actions: SelectedDayActions = {
    setSelectedDay,
    resetToToday,
  };

  return (
    <SelectedDayStateContext.Provider value={state}>
      <SelectedDayActionsContext.Provider value={actions}>{children}</SelectedDayActionsContext.Provider>
    </SelectedDayStateContext.Provider>
  );
};
