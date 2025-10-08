'use client';

import { CheerMessageCard, GoalBanner, GrowitTitle } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { WeeklyPlanBoard } from '@/composite/home/planBoard';
import { TodoListProvider } from '@/model/todo/todoList';
import { TodayTodoListProvider } from '@/model/todo/todayTodoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { AIMentorProvider } from '@/model/aiMentor/context';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <SelectedDayProvider>
            <div className="flex w-full flex-col overflow-y-scroll">
              <GrowitTitle />
              <AIMentorProvider>
                <div className="max-sm:mx-[20px] sm:mx-[40px] mt-[32px] pb-3">
                  <CheerMessageCard />
                </div>
                <div className="flex flex-col mt-8 flex-1 mb-[80px]">
                  <div className="flex flex-col flex-1 max-sm:mx-[20px] sm:mx-[40px] sm:gap-[48px] max-sm:gap-[24px]">
                    <GoalBanner />
                    <WeeklyPlanBoard />
                  </div>
                </div>
              </AIMentorProvider>
            </div>
          </SelectedDayProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
