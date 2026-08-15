'use client';

import { useState } from 'react';
import { isSameDay } from 'date-fns';
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
  // Figma 169:1559 — 선택된 날짜 재클릭 시 "중요 태스크 현황" 뷰로 토글
  const [showStatus, setShowStatus] = useState(false);
  return (
    <TodoListContainerFormProvider>
      {({ selectedDate, calendarView, editingTodo, setSelectedDate, setCalendarView, setEditingTodo }) => {
        const isMonthlyView = calendarView === 'monthly';

        const handleDateSelect = (date: Date) => {
          if (isSameDay(date, selectedDate)) {
            setShowStatus(prev => !prev);
            return;
          }
          setSelectedDate(date);
          setShowStatus(false);
        };

        const handleViewChange = (view: 'weekly' | 'monthly') => {
          setShowStatus(false);
          setCalendarView(view);
        };

        const viewMode: 'matrix' | 'list' | 'status' =
          showStatus && !isMonthlyView ? 'status' : isMonthlyView ? 'list' : 'matrix';

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
          <div className="relative min-h-full w-full">
            <div
              className={`min-h-full bg-[#09090B] shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT}`}
            >
              <div className="flex min-h-full flex-col">
                {/* Figma 196:1556 — iOS Safe Area (status bar) */}
                <div
                  aria-hidden="true"
                  className="w-full shrink-0"
                  style={{ height: 'max(34px, env(safe-area-inset-top, 0px))' }}
                />
                <div className="flex flex-1 flex-col gap-2 px-5 pt-3">
                  <Calendar
                    view={calendarView}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onViewChange={handleViewChange}
                  />
                  <div className="flex flex-1 flex-col">
                    <TodoList
                      selectedDate={selectedDate}
                      viewMode={viewMode}
                      onEdit={handleEdit}
                      onAdd={handleAdd}
                    />
                  </div>
                </div>
              </div>
            </div>

            <FloatingButton
              onClick={() => handleAdd()}
              aria-label="투두 추가"
              className="bottom-[calc(25px+env(safe-area-inset-bottom,0px))]"
            />

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
