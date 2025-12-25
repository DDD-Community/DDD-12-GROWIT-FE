'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import Button from '@/shared/components/input/Button';
import { Z_INDEX } from '@/shared/lib/z-index';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';
import { Calendar } from '@/feature/todo/calendar';
import { CheerMessageCard } from './components/cheerMessageCard';
import { DEMO_INDICATORS } from './mock';
import { TodoListContainerFormProvider } from './form';
import { convertToFormData } from './helper';
import { FolderPlusIcon } from '@/feature/todo/todoBottomSheet/components/shared/icons';
import { ROUTES } from '@/shared/constants/routes';

export const TodoListContainer = () => {
  const [editingTodo, setEditingTodo] = useState<GoalTodo | null>(null);
  const router = useRouter();

  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();

  // Todo 편집 클릭
  const handleEdit = useCallback(
    (todo: GoalTodo) => {
      setEditingTodo(todo);
      editSheet.showSheet();
    },
    [editSheet]
  );

  // 편집 바텀시트 닫기
  const handleCloseEditSheet = useCallback(() => {
    editSheet.closeSheet();
    setEditingTodo(null);
  }, [editSheet]);

  // 목표 추가 핸들러 (바텀시트에서 목표 추가 버튼 클릭 시)
  const handleAddGoal = useCallback(() => {
    router.push(ROUTES.CREATE_GOAL);
  }, [router]);

  return (
    <TodoListContainerFormProvider>
      {({ selectedDate, calendarView, setSelectedDate, setCalendarView }) => {
        const isMonthlyView = calendarView === 'monthly';

        return (
          <div className="relative w-full">
            {/* 응원 메시지 카드 (주간 뷰일 때만 표시) */}
            {!isMonthlyView && <CheerMessageCard type="grorong" />}

            {/* 메인 컨텐츠 영역 */}
            <div
              className={`absolute left-0 right-0 max-w-sm:mx-[20px] sm:mx-[40px] mx-auto bg-normal shadow-xl transition-all duration-300 ease-in-out ${Z_INDEX.CONTENT} ${
                isMonthlyView ? 'top-0 rounded-none' : 'top-[140px] rounded-t-3xl'
              }`}
            >
              <div className={`flex flex-col ${isMonthlyView ? 'h-screen' : 'h-[calc(100vh-100px)]'}`}>
                <div className="flex flex-col flex-1 gap-6">
                  <div className="px-4 md:px-0 pt-[24px]">
                    {/* 캘린더 */}
                    <Calendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      indicators={DEMO_INDICATORS}
                      view={calendarView}
                      onViewChange={setCalendarView}
                    />

                    {/* Todo 리스트 */}
                    <TodoList selectedDate={selectedDate} onEdit={handleEdit} />

                    {/* 목표 추가 버튼 */}
                    <div className="flex justify-center mb-[120px]">
                      <Button
                        size="ml"
                        variant="tertiary"
                        layout="icon-left"
                        text="목표 추가하기"
                        icon={<FolderPlusIcon />}
                        onClick={handleAddGoal}
                        className="w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 버튼 */}
            <FloatingButton onClick={addSheet.showSheet} aria-label="투두 추가" />

            {/* 추가용 TodoBottomSheet */}
            <TodoBottomSheet
              mode="add"
              selectedDate={selectedDate}
              isOpen={addSheet.isOpen}
              onOpen={addSheet.showSheet}
              onClose={addSheet.closeSheet}
              onAddGoal={handleAddGoal}
            />

            {/* 편집용 TodoBottomSheet */}
            {editingTodo && (
              <TodoBottomSheet
                mode="edit"
                selectedDate={new Date(editingTodo.date)}
                initialData={convertToFormData(editingTodo)}
                todoId={editingTodo.id}
                editingTodo={editingTodo}
                isOpen={editSheet.isOpen}
                onOpen={editSheet.showSheet}
                onClose={handleCloseEditSheet}
                onAddGoal={handleAddGoal}
              />
            )}
          </div>
        );
      }}
    </TodoListContainerFormProvider>
  );
};

export default TodoListContainer;
