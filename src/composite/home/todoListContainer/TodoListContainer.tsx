'use client';

import { GoalTodo } from '@/shared/type/GoalTodo';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { Z_INDEX } from '@/shared/lib/z-index';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';
import { Calendar } from '@/feature/todo/calendar';
import { AddGoalButton } from './components/addGoalButton';
import { TodoListContainerFormProvider } from './form';
import { convertToFormData, getEditingTodoDefault } from './helper';
import { HomeBanner } from '../homeBanner';

export const TodoListContainer = () => {
  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();

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

            <FloatingButton onClick={addSheet.showSheet} aria-label="투두 추가" />

            {/* 추가용 TodoBottomSheet */}
            <TodoBottomSheet
              mode="add"
              isOpen={addSheet.isOpen}
              onOpen={addSheet.showSheet}
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
      }}
    </TodoListContainerFormProvider>
  );
};

export default TodoListContainer;
