'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import Button from '@/shared/components/input/Button';
import { Z_INDEX } from '@/shared/lib/z-index';
import { TodoList } from '@/feature/todo/todoList';
import { TodoBottomSheet } from '@/feature/todo/todoBottomSheet';
import { Calendar } from '@/feature/todo/calendar';
import { TodoFormData, Goal } from '@/feature/todo/todoBottomSheet/types';
import { CheerMessageCard } from './components/cheerMessageCard';
import { DEMO_INDICATORS } from './mock';
import { TodoListContainerFormProvider } from './form';
import { convertToFormData, createNewTodo } from './helper';
import { FolderPlusIcon } from '@/feature/todo/todoBottomSheet/components/shared/icons';
import { ROUTES } from '@/shared/constants/routes';
import { usePatchTodoStatus, usePutTodo, useDeleteTodo, usePostAddTodo } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';

export const TodoListContainer = () => {
  const [editingTodo, setEditingTodo] = useState<GoalTodo | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const addSheet = useBottomSheet();
  const editSheet = useBottomSheet();

  // Mutations
  const patchTodoStatusMutation = usePatchTodoStatus();
  const putTodoMutation = usePutTodo();
  const deleteTodoMutation = useDeleteTodo();
  const postAddTodoMutation = usePostAddTodo();

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

        // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
        const dateString = format(selectedDate, 'yyyy-MM-dd');

        // 목표 목록을 캐시에서 가져오기
        const goals = useMemo<Goal[]>(() => {
          const cachedData = queryClient.getQueryData(todoListQueryKeys.getTodosByDate(dateString));
          const todosData = cachedData as Array<{ todo: GoalTodo; goal: any }> | undefined;

          if (!todosData) return [];

          const uniqueGoals = new Map<string, Goal>();
          todosData.forEach(item => {
            const goalId = item.goal.id ?? item.goal.name;
            if (!uniqueGoals.has(goalId)) {
              uniqueGoals.set(goalId, { id: goalId, name: item.goal.name });
            }
          });
          return Array.from(uniqueGoals.values());
        }, [queryClient, dateString]);

        // Todo 완료 상태 토글
        const handleToggle = useCallback(
          async (todoId: string, isCompleted: boolean) => {
            try {
              await patchTodoStatusMutation.mutateAsync({ todoId, isCompleted });
              // 쿼리 무효화하여 데이터 다시 가져오기
              queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
            } catch (error) {
              console.error('Todo 상태 변경 실패:', error);
            }
          },
          [patchTodoStatusMutation, queryClient, dateString]
        );

        // Todo 편집 제출
        const handleEditSubmit = useCallback(
          async (data: TodoFormData) => {
            if (!editingTodo) return;

            try {
              await putTodoMutation.mutateAsync({
                todoId: editingTodo.id,
                date: format(new Date(editingTodo.date), 'yyyy-MM-dd'),
                content: data.content,
              });
              // 쿼리 무효화하여 데이터 다시 가져오기
              queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
              setEditingTodo(null);
              editSheet.closeSheet();
            } catch (error) {
              console.error('Todo 수정 실패:', error);
            }
          },
          [editingTodo, putTodoMutation, queryClient, dateString, editSheet]
        );

        // Todo 삭제 (해당 투두만 삭제)
        const handleDelete = useCallback(async () => {
          if (!editingTodo) return;

          try {
            await deleteTodoMutation.mutateAsync(editingTodo.id);
            // 쿼리 무효화하여 데이터 다시 가져오기
            queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
            setEditingTodo(null);
            editSheet.closeSheet();
          } catch (error) {
            console.error('Todo 삭제 실패:', error);
          }
        }, [editingTodo, deleteTodoMutation, queryClient, dateString, editSheet]);

        // 전체 반복 투두 삭제
        const handleDeleteAllRepeats = useCallback(async () => {
          if (!editingTodo?.routine) return;

          const editingRoutine = editingTodo.routine;

          try {
            // 캐시에서 현재 날짜의 todos 가져오기
            const cachedData = queryClient.getQueryData(todoListQueryKeys.getTodosByDate(dateString));
            const todosData = cachedData as Array<{ todo: GoalTodo; goal: any }> | undefined;

            if (!todosData) {
              console.error('캐시된 데이터를 찾을 수 없습니다.');
              return;
            }

            // API 응답을 GoalTodo[] 형식으로 변환
            const todos: GoalTodo[] = todosData.map(item => ({
              ...item.todo,
              goal: item.goal,
            }));

            // 같은 routine을 가진 모든 투두 삭제
            // routine의 startDate와 endDate, repeatType이 모두 일치하는 투두들을 찾아 삭제
            const todosToDelete = todos.filter(todo => {
              if (!todo.routine) return false;
              const todoRoutine = todo.routine;
              return (
                editingRoutine.duration.startDate === todoRoutine.duration.startDate &&
                editingRoutine.duration.endDate === todoRoutine.duration.endDate &&
                editingRoutine.repeatType === todoRoutine.repeatType
              );
            });

            // 모든 투두 삭제
            await Promise.all(todosToDelete.map(todo => deleteTodoMutation.mutateAsync(todo.id)));

            // 쿼리 무효화하여 데이터 다시 가져오기
            queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
            setEditingTodo(null);
            editSheet.closeSheet();
          } catch (error) {
            console.error('반복 투두 삭제 실패:', error);
          }
        }, [editingTodo, deleteTodoMutation, queryClient, dateString, editSheet]);

        // 신규 Todo 추가
        const handleAddSubmit = async (data: TodoFormData) => {
          try {
            await postAddTodoMutation.mutateAsync({
              goalId: data.goalId ?? null,
              date: format(selectedDate, 'yyyy-MM-dd'),
              content: data.content,
              isImportant: data.isImportant,
              routine:
                data.repeatType !== 'none' && data.routineDuration
                  ? {
                      repeatType: data.repeatType,
                      duration: {
                        startDate: data.routineDuration.startDate,
                        endDate: data.routineDuration.endDate,
                      },
                    }
                  : undefined,
            });
            // 쿼리 무효화하여 데이터 다시 가져오기
            queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
            addSheet.closeSheet();
          } catch (error) {
            console.error('Todo 추가 실패:', error);
          }
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
                    <TodoList selectedDate={selectedDate} onToggle={handleToggle} onEdit={handleEdit} />

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
              goals={goals}
              isOpen={addSheet.isOpen}
              onOpen={addSheet.showSheet}
              onClose={addSheet.closeSheet}
              onSubmit={handleAddSubmit}
              onAddGoal={handleAddGoal}
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
                onDeleteAllRepeats={handleDeleteAllRepeats}
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
