'use client';

import { TodoListContainer } from '@/composite/home';
import { GoalProvider } from '@/model/goal/context';
import { PlanProvider } from '@/model/todo/planSelector';
import { TodoListProvider } from '@/model/todo/todoList';
import { SelectedDayProvider } from '@/model/todo/selectedDay';
import { AIMentorProvider } from '@/model/aiMentor/context';

export default function MainPage() {
  return (
    <GoalProvider>
      <PlanProvider>
        <TodoListProvider>
          <SelectedDayProvider>
            <AIMentorProvider>
              <TodoListContainer />
            </AIMentorProvider>
          </SelectedDayProvider>
        </TodoListProvider>
      </PlanProvider>
    </GoalProvider>
  );
}
