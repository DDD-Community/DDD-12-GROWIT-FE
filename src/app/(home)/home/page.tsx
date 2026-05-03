'use client';

import { TodoListContainer } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { TodoListProvider } from '@/model/todo/todoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <SelectedDayProvider>
            <TodoListContainer />
          </SelectedDayProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
