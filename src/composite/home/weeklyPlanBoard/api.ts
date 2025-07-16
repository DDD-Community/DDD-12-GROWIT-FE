import { Goal } from '@/shared/type/goal';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import qs from 'qs';

interface GoalListResponse extends CommonResponse<Goal[]> {}
interface TodoListResponse extends CommonResponse<Record<DAY_OF_THE_WEEK, Todo[]>> {}

export interface TodoWeeklyListRequest {
  goalId: string;
  planId: string;
}

export async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data;
}

export async function getWeeklyTodoList(req: TodoWeeklyListRequest) {
  const queryString = qs.stringify({
    goalId: req.goalId,
    planId: req.planId,
  });
  const { data } = await apiClient.get<TodoListResponse>(`/todos?${queryString}`);
  return data.data;
}
