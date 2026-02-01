import { CalendarView } from '@/feature/todo/calendar';
import { GoalTodo } from '@/shared/type/GoalTodo';

/** Form 상태 값 */
export interface TodoListContainerFormValues {
  selectedDate: Date;
  calendarView: CalendarView;
  editingTodo: GoalTodo;
}
