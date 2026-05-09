'use client';

import { useState } from 'react';
import { isSameDay, addDays, subDays } from 'date-fns';
import { motion, useMotionValue } from 'motion/react';
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

/** Figma 196:1611 — 매트릭스 영역 좌우 swipe 시 ±1일 이동 */
const DAY_SWIPE_THRESHOLD = 60;

export const TodoListContainer = () => {
  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();
  const [addDefaultCategory, setAddDefaultCategory] = useState<TodoFormData['category']>('NOW');
  // Figma 169:1559 — 선택된 날짜 재클릭 시 "중요 태스크 현황" 뷰로 토글
  const [showStatus, setShowStatus] = useState(false);
  // Figma 196:1611 — 매트릭스 영역 swipe 트래킹용 motion value
  const swipeX = useMotionValue(0);

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
          <div className="relative w-full">
            <div
              className={`bg-[#09090B] shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT}`}
            >
              <div className="flex flex-col h-screen">
                {/* Figma 196:1556 — iOS Safe Area (status bar) */}
                <div
                  aria-hidden="true"
                  className="w-full shrink-0"
                  style={{ height: 'max(34px, env(safe-area-inset-top, 0px))' }}
                />
                <div className="flex flex-col flex-1 px-5 pt-3 gap-2 min-h-0">
                  <Calendar
                    view={calendarView}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onViewChange={handleViewChange}
                  />
                  {/* Figma 196:1611 — 주뷰에서 매트릭스 영역 좌우 swipe → ±1일 이동 */}
                  <motion.div
                    className="flex flex-1 min-h-0 flex-col"
                    style={{ x: swipeX, touchAction: 'pan-y' }}
                    drag={!isMonthlyView ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      if (isMonthlyView) return;
                      if (info.offset.x <= -DAY_SWIPE_THRESHOLD) {
                        setSelectedDate(addDays(selectedDate, 1));
                        setShowStatus(false);
                      } else if (info.offset.x >= DAY_SWIPE_THRESHOLD) {
                        setSelectedDate(subDays(selectedDate, 1));
                        setShowStatus(false);
                      }
                      swipeX.set(0);
                    }}
                  >
                    <TodoList
                      selectedDate={selectedDate}
                      viewMode={viewMode}
                      onEdit={handleEdit}
                      onAdd={handleAdd}
                    />
                  </motion.div>
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
