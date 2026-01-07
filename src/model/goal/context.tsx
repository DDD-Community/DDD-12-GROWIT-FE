'use client';

import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { useState, createContext, useContext, createElement, useEffect } from 'react';
import { Goal } from '@/shared/type/goal';
//import { useToast } from '@/shared/components/feedBack/toast';
import { GoalQuery } from './queries';
import { useQuery } from '@tanstack/react-query';

// interface ServerRequest<Request> {
//   request: Request;
//   onSuccess?: () => void;
//   onError?: () => void;
// }

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

  // 서버에서 prerendering 시점에 데이터를 불러올 수 없기 때문에 useSuspenseQuery 대신에 클라이언트 사이드에서만 실행되는 useQuery로 대체
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
