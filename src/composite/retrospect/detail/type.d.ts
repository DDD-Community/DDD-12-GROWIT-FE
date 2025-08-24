export interface Analysis {
  summary: string;
  advice: string;
}

export interface WeekOfDayTodo {
  id: string;
  goalId: string;
  planId: string;
  date: string;
  content: string;
  isCompleted: boolean;
}
