'use client';

import { CheerMessageCard, GoalBanner, GrowitTitle } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { WeeklyPlanBoard } from '@/composite/home/planBoard';
import { TodoListProvider } from '@/model/todo/todoList';
import { TodayTodoListProvider } from '@/model/todo/todayTodoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
//import { TodayMissionBoard } from '@/feature/todo/todayMissionBoard';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <TodayTodoListProvider>
            <SelectedDayProvider>
              <div className="flex w-full flex-col overflow-y-scroll">
                <GrowitTitle />
                <div className="max-sm:mx-[20px] sm:mx-[40px] mt-[32px] pb-3">
                  <CheerMessageCard />
                </div>
                <div className="flex max-sm:flex-col mt-8 sm:flex-1 max-sm:mb-[170px] sm:mb-[80px]">
                  <div className="flex flex-col flex-1 max-sm:mx-[20px] sm:mx-[40px] sm:gap-[48px] max-sm:gap-[24px]">
                    <GoalBanner />
                    <WeeklyPlanBoard />
                  </div>
                  {/* <div className="flex flex-col gap-8 w-[335px] sm:mr-[40px] max-sm:w-auto max-sm:mx-[20px]">
                    <TodayMissionBoard />
                  </div> */}
                </div>
              </div>
            </SelectedDayProvider>
          </TodayTodoListProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
