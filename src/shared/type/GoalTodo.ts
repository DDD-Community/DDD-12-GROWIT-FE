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
  content: string;
  routine?: GoalTodoRoutine;
  isCompleted: boolean;
  isImportant?: boolean;
}
