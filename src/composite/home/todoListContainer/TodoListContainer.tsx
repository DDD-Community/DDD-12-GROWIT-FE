'use client';

import { useState } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { Z_INDEX } from '@/shared/lib/z-index';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';
import { Calendar } from '@/feature/todo/calendar';
import { TodoListContainerFormProvider } from './form';
import { convertToFormData, getEditingTodoDefault } from './helper';
import type { TodoFormData } from '@/feature/todo/todoBottomSheet/types';

export const TodoListContainer = () => {
  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();
  const [addDefaultCategory, setAddDefaultCategory] = useState<TodoFormData['category']>('NOW');

  return (
    <TodoListContainerFormProvider>
      {({ selectedDate, calendarView, editingTodo, setSelectedDate, setCalendarView, setEditingTodo }) => {
        const isMonthlyView = calendarView === 'monthly';

        const handleEdit = (todo: GoalTodo) => {
          editSheet.showSheet();
          setEditingTodo(todo);
        };

        const handleCloseEditSheet = () => {
          editSheet.closeSheet();
          setEditingTodo(getEditingTodoDefault());
        };

        const handleAdd = (category?: string) => {
          if (category === 'NOW' || category === 'STEADY' || category === 'SKIP' || category === 'DELETE') {
            setAddDefaultCategory(category);
          } else {
            setAddDefaultCategory('NOW');
          }
          addSheet.showSheet();
        };

        return (
          <div className="relative w-full">
            <div
              className={`bg-[#09090B] shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT}`}
            >
              <div className="flex flex-col h-screen">
                <div className="flex flex-col flex-1 gap-6">
                  <div className="px-5 pt-3">
                    <Calendar
                      view={calendarView}
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      onViewChange={setCalendarView}
                    />
                    <TodoList
                      selectedDate={selectedDate}
                      viewMode={isMonthlyView ? 'list' : 'matrix'}
                      onEdit={handleEdit}
                      onAdd={handleAdd}
                    />
                  </div>
                </div>
              </div>
            </div>

            <FloatingButton onClick={() => handleAdd()} aria-label="투두 추가" />

            {/* 추가용 TodoBottomSheet */}
            <TodoBottomSheet
              mode="add"
              isOpen={addSheet.isOpen}
              onOpen={addSheet.showSheet}
              onClose={addSheet.closeSheet}
              selectedDate={selectedDate}
              defaultCategory={addDefaultCategory}
            />

            {/* 편집용 TodoBottomSheet */}
            <TodoBottomSheet
              mode="edit"
              isOpen={editSheet.isOpen}
              onOpen={editSheet.showSheet}
              onClose={handleCloseEditSheet}
              selectedDate={new Date(editingTodo.date)}
              values={convertToFormData(editingTodo)}
              todoId={editingTodo.id}
            />
          </div>
        );
      }}
    </TodoListContainerFormProvider>
  );
};

export default TodoListContainer;
