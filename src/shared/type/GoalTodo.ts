export type RepeatType = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
export type RepeatDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface GoalTodoRoutine {
  duration: {
    startDate: string;
    endDate: string;
  };
  repeatType: RepeatType;
  repeatDays?: RepeatDay[] | null;
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
  category?: 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';
}
