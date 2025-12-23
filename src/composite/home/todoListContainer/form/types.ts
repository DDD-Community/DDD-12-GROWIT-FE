import { ReactNode } from 'react';
import { CalendarView } from '@/feature/todo/calendar';

/** Form 상태 값 */
export interface TodoListContainerFormValues {
  selectedDate: Date;
  calendarView: CalendarView;
}

/** Form 액션 */
export interface TodoListContainerFormActions {
  setSelectedDate: (date: Date) => void;
  setCalendarView: (view: CalendarView) => void;
}

/** Render Props로 전달되는 전체 Props */
export type TodoListContainerFormProps = TodoListContainerFormValues & TodoListContainerFormActions;

/** Provider Props */
export interface TodoListContainerFormProviderProps {
  children: (props: TodoListContainerFormProps) => ReactNode;
}
