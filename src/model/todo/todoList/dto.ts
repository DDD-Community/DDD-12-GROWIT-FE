import { CommonResponse } from '@/shared/type/response';
import { GoalTodo, GoalTodoGoal } from '@/shared/type/GoalTodo';

export interface TodoByDateRequest {
  date: string; // YYYY-MM-DD 형식
}

export interface TodoByDateItem {
  todo: GoalTodo;
  goal: GoalTodoGoal;
}

export interface TodoByDateResponse extends CommonResponse<TodoByDateItem[]> {}

export interface PatchTodoStatusRequest {
  todoId: string;
  isCompleted: boolean;
}

export type RepeatType = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'YEARLY';

export interface TodoRoutine {
  duration: {
    startDate: string; // 'YYYY-MM-DD'
    endDate: string; // 'YYYY-MM-DD'
  };
  repeatType: RepeatType;
}

export interface PutTodoRequest {
  todoId: string; // URL 파라미터용
  goalId: string | null; // 목표 ID (기타일 경우 null)
  date: string; // 'YYYY-MM-DD'
  content: string;
  isImportant: boolean;
  routine?: TodoRoutine; // 루틴 설정 (옵셔널)
}

export interface PostAddTodoRequest {
  goalId: string | null; // 옵셔널 - 기타 일땐 null로 넣어주세요
  date: string; // 'YYYY-MM-DD'
  content: string;
  isImportant: boolean;
  routine?: TodoRoutine; // 루틴 설정 (옵셔널)
}

export interface PostAddTodoResponse extends CommonResponse<{ id: string }> {}

export interface TodoCountByDateRequest {
  from: string; // YYYY-MM-DD 형식
  to: string; // YYYY-MM-DD 형식
}

export interface TodoCountByGoal {
  id: string;
  todoCount: number;
}

export interface TodoCountByDateItem {
  date: string; // YYYY-MM-DD 형식
  goals: TodoCountByGoal[];
}

export interface TodoCountByDateResponse extends CommonResponse<TodoCountByDateItem[]> {}

/** 반복 투두 삭제 타입 */
export type RoutineDeleteType = 'SINGLE' | 'FROM_DATE' | 'ALL';

export interface DeleteTodoRequest {
  todoId: string;
  routineDeleteType: RoutineDeleteType;
}
