'use client';

import { CheerMessageCard, GoalBanner } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { WeeklyPlanBoard } from '@/composite/home/planBoard';
import { TodoListProvider } from '@/model/todo/todoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { AIMentorProvider } from '@/model/aiMentor/context';
import { AttendanceStreakPopup } from '@/feature/todo/weeklyTodoList/components/AttendanceStreakPopup';
import { Z_INDEX } from '@/shared/lib/z-index';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <SelectedDayProvider>
            <AIMentorProvider>
              <div className="relative w-full">
                <CheerMessageCard type="grorong" />
                <div
                  className={`absolute top-[160px] left-0 right-0 max-w-sm:mx-[20px] sm:mx-[40px] mx-auto bg-normal rounded-t-3xl shadow-xl ${Z_INDEX.CONTENT}`}
                >
                  <div className="flex flex-col h-[calc(100vh-160px)]">
                    <div className="flex flex-col flex-1 gap-6">
                      <GoalBanner />
                      <div className="px-4 md:px-0">
                        <WeeklyPlanBoard />
                      </div>
                    </div>
                    <div className="w-full px-4 mt-[32px] pb-[calc(100px+env(safe-area-inset-bottom))]">
                      <CheerMessageCard type="aiMentor" />
                    </div>
                  </div>
                </div>
              </div>
              <AttendanceStreakPopup />
            </AIMentorProvider>
          </SelectedDayProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
