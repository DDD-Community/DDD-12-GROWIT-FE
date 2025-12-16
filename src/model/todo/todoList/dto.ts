import { CommonResponse } from '@/shared/type/response';
import { TodoResponse } from '@/shared/type/Todo';
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

export interface PutTodoRequest {
  todoId: string;
  date: string;
  content: string;
}

export interface PostAddTodoRequest {
  goalId: string;
  planId: string;
  date: string; // 'YYYY-MM-DD'
  content: string;
}

export interface PostAddTodoResponse extends CommonResponse<TodoResponse> {}
