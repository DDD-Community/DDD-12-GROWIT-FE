'use client';

import { useState, useMemo } from 'react';
import { CheerMessageCard } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { TodoListProvider } from '@/model/todo/todoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { AIMentorProvider } from '@/model/aiMentor/context';
import { Z_INDEX } from '@/shared/lib/z-index';
import { Calendar, CalendarView } from '@/feature/todo/calendar';
import { TodoList } from '@/feature/todo/todoList';

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>('weekly');

  const isMonthlyView = calendarView === 'monthly';

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
                {!isMonthlyView && <CheerMessageCard type="grorong" />}
                <div
                  className={`absolute left-0 right-0 max-w-sm:mx-[20px] sm:mx-[40px] mx-auto bg-normal shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT} ${
                    isMonthlyView ? 'top-0 rounded-none' : 'top-[140px] rounded-t-3xl'
                  }`}
                >
                  <div className={`flex flex-col ${isMonthlyView ? 'h-screen' : 'h-[calc(100vh-140px)]'}`}>
                    <div className="flex flex-col flex-1 gap-6">
                      <div className="px-4 md:px-0 pt-[24px]">
                        <Calendar
                          selectedDate={selectedDate}
                          onDateSelect={setSelectedDate}
                          indicators={demoIndicators}
                          view={calendarView}
                          onViewChange={setCalendarView}
                        />
                        <TodoList />
                      </div>
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
