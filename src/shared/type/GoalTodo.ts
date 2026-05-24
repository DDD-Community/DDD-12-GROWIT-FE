export type RepeatType = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'YEARLY';

export interface GoalTodoRoutine {
  duration: {
    startDate: string;
    endDate: string;
  };
  repeatType: RepeatType;
}

export interface GoalTodoGoal {
  id?: string;
  name: string;
}

export interface GoalTodo {
  id: string;
  goal: GoalTodoGoal;
  date: string;
  /** 투두 시간 (HH:mm, optional) */
  time?: string | null;
  content: string;
  routine?: GoalTodoRoutine;
  isCompleted: boolean;
  category?: 'URGENT' | 'CONSISTENT' | 'DEFERABLE' | 'DELETABLE';
}
