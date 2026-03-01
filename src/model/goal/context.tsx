'use client';

import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { useState, createContext, useContext, createElement, useEffect } from 'react';
import { Goal } from '@/shared/type/goal';
import { GoalQuery } from './queries';
import { useQuery } from '@tanstack/react-query';

interface GoalContextType {
  progressGoals: Goal[];
  isLoadingGoals: boolean;
  currentGoal: Goal | null;
  setCurrentGoal: (goal: Goal | null) => void;
}

const GoalContext = createContext<GoalContextType | null>(null);

// 렌더링 이후 최초에만 계산되면 되기 때문에 바깥에 위치
const msUntilEndOfDay = getMsUntilEndOfDay();

export function GoalProvider({ children }: { children: React.ReactNode }) {
  //const { showToast } = useToast();
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

  const { data: progressGoals = [], isLoading } = useQuery(
    GoalQuery.getProgressGoals({
      // 캐시 무효화가 없다면, 현재 시간부터 하루가 끝나기전까지 유지되어도 괜찮다 판단
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );

  useEffect(() => {
    // 최초에 현재 선택된 목표값 초기화
    if (progressGoals) {
      setCurrentGoal(progressGoals[0] || null);
    }
  }, [progressGoals]);

  const value: GoalContextType = {
    progressGoals: progressGoals ? progressGoals : [],
    isLoadingGoals: isLoading,
    currentGoal,
    setCurrentGoal,
  };

  return createElement(GoalContext.Provider, { value }, children);
}

export function useGoalSelector() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoalSelector must be used within a GoalProvider');
  }
  return context;
}
