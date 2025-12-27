import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoFormData, FormRepeatType, Goal } from '@/feature/todo/todoBottomSheet/types';

/** editingTodo 기본값 생성 함수 */
export const getEditingTodoDefault = (): GoalTodo => ({
  id: '',
  goal: { name: '' },
  date: format(new Date(), 'yyyy-MM-dd'),
  content: '',
  isCompleted: false,
});

/** GoalTodo를 TodoFormData로 변환 */
export const convertToFormData = (todo: GoalTodo): TodoFormData => ({
  content: todo.content,
  goalId: todo.goal.id ?? null,
  repeatType: (todo.routine?.repeatType as FormRepeatType) ?? 'none',
  isImportant: todo.isImportant ?? false,
  routineDuration: todo.routine?.duration,
});

/** TodoFormData를 GoalTodo로 변환 (신규 추가용) */
export const createNewTodo = (data: TodoFormData, selectedDate: Date, goals: Goal[]): GoalTodo => {
  const goal = goals.find(g => g.id === data.goalId) ?? { name: '미분류' };

  return {
    id: `todo-${Date.now()}`,
    goal: { id: data.goalId ?? undefined, name: goal.name },
    date: selectedDate.toISOString().split('T')[0],
    content: data.content,
    isCompleted: false,
    isImportant: data.isImportant,
    routine:
      data.repeatType !== 'none' && data.routineDuration
        ? { repeatType: data.repeatType, duration: data.routineDuration }
        : undefined,
  };
};
