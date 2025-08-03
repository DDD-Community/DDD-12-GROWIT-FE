export interface Todo {
  id: string;
  goalId: string;
  planId: string;
  date: string;
  content: string;
  isCompleted: boolean;
}

export type Contribution = 'NOT_STARTED' | 'NONE' | 'COMPLETED' | 'IN_PROGRESS';

export type DAY_OF_THE_WEEK = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface TodoResponse {
  id: string;
  plan: {
    id: string;
    weekOfMonth: number;
  };
}
