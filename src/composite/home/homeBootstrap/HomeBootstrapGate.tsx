'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { getWeekRange } from '@/feature/todo/calendar/utils';
import { ROUTES } from '@/shared/constants/routes';
import { getHomeBootstrap } from './api';

interface HomeBootstrapGateProps {
  children: ReactNode;
}

const HomeInitialSkeleton = () => (
  <div className="flex min-h-full w-full animate-pulse flex-col px-5">
    <div
      aria-hidden="true"
      className="w-full shrink-0"
      style={{ height: 'max(34px, env(safe-area-inset-top, 0px))' }}
    />
    <div className="mt-4 h-8 w-28 rounded-xl bg-[#27272A]" />
    <div className="mt-5 flex justify-between gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="h-[50px] flex-1 rounded-full bg-[#1F1F22]" />
      ))}
    </div>
    <div className="mt-8 flex gap-2">
      <div className="h-[295px] flex-1 rounded-3xl bg-[#1F1F22]" />
      <div className="h-[295px] flex-1 rounded-3xl bg-[#1F1F22]" />
    </div>
  </div>
);

export const HomeBootstrapGate = ({ children }: HomeBootstrapGateProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [initialDate] = useState(() => new Date());
  const [isSeeded, setIsSeeded] = useState(false);

  const request = useMemo(() => {
    const [weekStart, weekEnd] = getWeekRange(initialDate);
    return {
      date: format(initialDate, 'yyyy-MM-dd'),
      from: format(weekStart, 'yyyy-MM-dd'),
      to: format(weekEnd, 'yyyy-MM-dd'),
    };
  }, [initialDate]);

  const { data, isError, refetch, isFetching } = useQuery({
    queryKey: ['home', 'bootstrap', request.date, request.from, request.to],
    queryFn: () => getHomeBootstrap(request),
    staleTime: 5 * 60_000,
    retry: 1,
  });

  useEffect(() => {
    if (!data) return;

    if (!data.hasOnboarded) {
      router.replace(ROUTES.CREATE_GOAL_ONBOARD);
      return;
    }

    queryClient.setQueryData(todoListQueryKeys.getTodosByDate(request.date), data.todos);
    queryClient.setQueryData(
      todoListQueryKeys.getTodoCountByDate({ from: request.from, to: request.to }),
      data.todoCounts
    );
    setIsSeeded(true);
  }, [data, queryClient, request, router]);

  if (isError) {
    return (
      <div className="flex min-h-full w-full flex-col items-center justify-center gap-3 text-white">
        <p className="text-sm text-[#A1A1A1]">홈 데이터를 불러오지 못했어요.</p>
        <button
          type="button"
          className="rounded-full bg-[#27272A] px-4 py-2 text-sm"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!isSeeded) return <HomeInitialSkeleton />;

  return <>{children}</>;
};
