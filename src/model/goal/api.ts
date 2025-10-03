import { apiClient } from '@/shared/lib/apiClient';
import { Goal } from '@/shared/type/goal';
import { CommonResponse } from '@/shared/type/response';
import qs from 'qs';

interface GoalListResponse extends CommonResponse<Goal[]> {}

export interface GetGoalOption {
  year: number;
}

export async function getGoalList(option?: GetGoalOption) {
  const queryString = option ? qs.stringify(option) : '';
  const { data } = await apiClient.get<GoalListResponse>(`/goals?${queryString}`);
  return data.data;
}

export async function getCurrentProgressGoal() {
  const { data } = await apiClient.get<GoalListResponse>('/goals?status=PROGRESS');
  return data.data;
}

export async function deleteGoal(goalId: string) {
  const { data } = await apiClient.delete<CommonResponse<string>>(`/goals/${goalId}`);
  return data.data;
}

export async function putEditGoal(req: Goal) {
  const { data } = await apiClient.put<CommonResponse<string>>(`/goals/${req.id}`, req);
  return data.data;
}
