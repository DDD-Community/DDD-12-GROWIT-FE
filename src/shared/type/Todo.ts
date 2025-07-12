export interface Todo {
  id: string;
  goalId: string;
  planId: string;
  date: string;
  content: string;
  isCompleted: boolean;
}

export type DAY_OF_THE_WEEK = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
