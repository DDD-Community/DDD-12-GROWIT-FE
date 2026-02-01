'use client';

import { useCallback } from 'react';

import { Z_INDEX } from '@/shared/lib/z-index';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { useGTMActions } from '@/shared/hooks/useGTM';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

import { Calendar } from '@/feature/todo/calendar';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';

import { HomeBanner } from '../homeBanner';
import { useTodoListContainerForm } from './form';
import { AddGoalButton } from './components/addGoalButton';
import { convertToFormData, getEditingTodoDefault } from './helper';

export const TodoListContainer = () => {
  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();
  const { trackButtonClick } = useGTMActions();
  const { selectedDate, calendarView, editingTodo, setSelectedDate, setCalendarView, setEditingTodo } =
    useTodoListContainerForm();

  const isMonthlyView = calendarView === 'monthly';

  const handleOpenAddSheet = useCallback(() => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME,
      buttonName: GTM_BUTTON_NAME.TODO_ADD,
    });
    addSheet.showSheet();
  }, [trackButtonClick, addSheet]);

  const handleEdit = useCallback((todo: GoalTodo) => {
    editSheet.showSheet();
    setEditingTodo(todo);
  },[editSheet, setEditingTodo]);

  const handleCloseEditSheet = useCallback(() => {
    editSheet.closeSheet();
    setEditingTodo(getEditingTodoDefault());
  }, [editSheet, setEditingTodo]);

  return (
    <div className="relative w-full">
      <HomeBanner />
      <div
        className={`absolute left-0 right-0 mx-auto bg-[#0F0F10] shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT} ${
          isMonthlyView ? 'top-0 rounded-none' : 'top-[140px] rounded-t-3xl'
        }`}
      >
        <div className={`flex flex-col ${isMonthlyView ? 'h-screen' : 'h-[calc(100vh-100px)]'}`}>
          <div className="flex flex-col flex-1 gap-6">
            <div className="px-4 pt-[24px]">
              <Calendar
                view={calendarView}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onViewChange={setCalendarView}
              />
              <TodoList selectedDate={selectedDate} onEdit={handleEdit} />
              <AddGoalButton selectedDate={selectedDate} />
            </div>
          </div>
        </div>
      </div>

      <FloatingButton onClick={handleOpenAddSheet} aria-label="투두 추가" />

      {/* 추가용 TodoBottomSheet */}
      <TodoBottomSheet
        mode="add"
        isOpen={addSheet.isOpen}
        onOpen={handleOpenAddSheet}
        onClose={addSheet.closeSheet}
        selectedDate={selectedDate}
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
};

export default TodoListContainer;
