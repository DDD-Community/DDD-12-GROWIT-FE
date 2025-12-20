'use client';

import { useState, useMemo, useCallback } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { Z_INDEX } from '@/shared/lib/z-index';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';
import { Calendar } from '@/feature/todo/calendar';
import { TodoFormData, Goal } from '@/feature/todo/todoBottomSheet/types';
import { MOCK_TODOS } from '@/feature/todo/todoList/mockData';
import { CheerMessageCard } from './components/cheerMessageCard';
import { DEMO_INDICATORS } from './mock';
import { TodoListContainerFormProvider } from './form';
import { convertToFormData, createNewTodo } from './helper';

export const TodoListContainer = () => {
  const [todos, setTodos] = useState<GoalTodo[]>(MOCK_TODOS);
  const [editingTodo, setEditingTodo] = useState<GoalTodo | null>(null);

  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();

  // 목표 목록
  const goals = useMemo<Goal[]>(() => {
    const uniqueGoals = new Map<string, Goal>();
    todos.forEach(todo => {
      const goalId = todo.goal.id ?? todo.goal.name;
      if (!uniqueGoals.has(goalId)) {
        uniqueGoals.set(goalId, { id: goalId, name: todo.goal.name });
      }
    });
    return Array.from(uniqueGoals.values());
  }, [todos]);

  // Todo 완료 상태 토글
  const handleToggle = useCallback((todoId: string, isCompleted: boolean) => {
    setTodos(prev => prev.map(todo => (todo.id === todoId ? { ...todo, isCompleted } : todo)));
  }, []);

  // Todo 편집 클릭
  const handleEdit = useCallback(
    (todo: GoalTodo) => {
      setEditingTodo(todo);
      editSheet.showSheet();
    },
    [editSheet]
  );

  // Todo 편집 제출
  const handleEditSubmit = useCallback(
    (data: TodoFormData) => {
      if (!editingTodo) return;

      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingTodo.id
            ? {
                ...todo,
                content: data.content,
                goal: { ...todo.goal, id: data.goalId ?? undefined },
                isImportant: data.isImportant,
                routine:
                  data.repeatType !== 'none' && data.routineDuration
                    ? { repeatType: data.repeatType, duration: data.routineDuration }
                    : undefined,
              }
            : todo
        )
      );
      setEditingTodo(null);
    },
    [editingTodo]
  );

  // Todo 삭제
  const handleDelete = useCallback(() => {
    if (!editingTodo) return;
    setTodos(prev => prev.filter(todo => todo.id !== editingTodo.id));
    setEditingTodo(null);
  }, [editingTodo]);

  // 편집 바텀시트 닫기
  const handleCloseEditSheet = useCallback(() => {
    editSheet.closeSheet();
    setEditingTodo(null);
  }, [editSheet]);

  return (
    <TodoListContainerFormProvider>
      {({ selectedDate, calendarView, setSelectedDate, setCalendarView }) => {
        const isMonthlyView = calendarView === 'monthly';

        // 신규 Todo 추가
        const handleAddSubmit = (data: TodoFormData) => {
          const newTodo = createNewTodo(data, selectedDate, goals);
          setTodos(prev => [...prev, newTodo]);
        };

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
              <div className={`flex flex-col ${isMonthlyView ? 'h-screen' : 'h-[calc(100vh-140px)]'}`}>
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
                    <TodoList todos={todos} onToggle={handleToggle} onEdit={handleEdit} />
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
              goals={goals}
              isOpen={addSheet.isOpen}
              onOpen={addSheet.showSheet}
              onClose={addSheet.closeSheet}
              onSubmit={handleAddSubmit}
            />

            {/* 편집용 TodoBottomSheet */}
            {editingTodo && (
              <TodoBottomSheet
                mode="edit"
                selectedDate={new Date(editingTodo.date)}
                goals={goals}
                initialData={convertToFormData(editingTodo)}
                todoId={editingTodo.id}
                isOpen={editSheet.isOpen}
                onOpen={editSheet.showSheet}
                onClose={handleCloseEditSheet}
                onSubmit={handleEditSubmit}
                onDelete={handleDelete}
              />
            )}
          </div>
        );
      }}
    </TodoListContainerFormProvider>
  );
};

export default TodoListContainer;
