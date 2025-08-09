'use client';

import { CheerMessageCard } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { WeeklyPlanBoard } from '@/composite/home/planBoard';
import { TodoListProvider } from '@/model/todo/todoList';
import { TodayTodoListProvider } from '@/model/todo/todayTodoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { TodayMissionBoard } from '@/feature/todo';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <TodayTodoListProvider>
            <SelectedDayProvider>
              <div className="flex w-full flex-col">
                <div className="max-sm:mx-[20px] sm:mx-[40px] mt-[32px]">
                  <CheerMessageCard />
                </div>
                <div className="flex max-sm:flex-col overflow-y-scroll sm:flex-1 mb-[48px]">
                  <div className="flex flex-col flex-1 max-sm:mx-[20px] sm:mx-[40px] gap-[48px]">
                    <WeeklyPlanBoard />
                  </div>
                  <div className="flex flex-col gap-8 sm:overflow-y-scroll w-[335px] sm:mr-[40px] sm:mt-[42px] max-sm:w-auto max-sm:mx-[20px]">
                    <TodayMissionBoard />
                  </div>
                </div>
              </div>
            </SelectedDayProvider>
          </TodayTodoListProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
