'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CheerMessageCard, GoalBanner } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { WeeklyPlanBoard } from '@/composite/home/planBoard';
import { TodoListProvider } from '@/model/todo/todoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { AIMentorProvider } from '@/model/aiMentor/context';
import { Z_INDEX } from '@/shared/lib/z-index';
import { Calendar } from '@/feature/todo/calendar';

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const demoIndicators = useMemo(() => {
    return {
      '2025-12-01': ['#35D942', '#FFD95C', '#FF6363'],
      '2025-12-02': ['#35D942'],
      '2025-12-03': ['#FFD95C', '#35D942'],
      '2025-12-05': [null],
    };
  }, [selectedDate]);
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <SelectedDayProvider>
            <AIMentorProvider>
              <div className="relative w-full">
                <CheerMessageCard type="grorong" />
                <div
                  className={`absolute top-[140px] left-0 right-0 max-w-sm:mx-[20px] sm:mx-[40px] mx-auto bg-normal rounded-t-3xl shadow-xl ${Z_INDEX.CONTENT}`}
                >
                  <div className="flex flex-col h-[calc(100vh-140px)]">
                    <div className="flex flex-col flex-1 gap-6">
                      <GoalBanner />
                      <div className="px-4 md:px-0">
                        <Calendar
                          selectedDate={selectedDate}
                          onDateSelect={setSelectedDate}
                          indicators={demoIndicators}
                        />
                        <WeeklyPlanBoard />
                      </div>
                    </div>
                    <div className="w-full px-4 mt-[32px] pb-[calc(100px+env(safe-area-inset-bottom))]">
                      <CheerMessageCard type="aiMentor" />
                    </div>
                  </div>
                </div>
              </div>
            </AIMentorProvider>
          </SelectedDayProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
