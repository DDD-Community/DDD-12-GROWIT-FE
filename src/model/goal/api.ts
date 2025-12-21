import { apiClient } from '@/shared/lib/apiClient';
import { Goal } from '@/shared/type/goal';
import { CommonResponse } from '@/shared/type/response';
import qs from 'qs';

interface GoalListResponse extends CommonResponse<Goal[]> {}

export interface GetGoalOption {
  goalId: string;
}

export interface GetGoalListOption {
  year: number;
}

export async function getAllGoals(): Promise<Goal[]> {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data;
}

export async function getProgressGoals(): Promise<Goal[]> {
  const { data } = await apiClient.get<GoalListResponse>('/goals?status=PROGRESS');
  return data.data;
}

export async function getEndedGoals(): Promise<Goal[]> {
  const { data } = await apiClient.get<GoalListResponse>('/goals?status=ENDED');
  return data.data;
}

export async function getGoalList(option?: GetGoalListOption) {
  const queryString = option ? qs.stringify(option) : '';
  const { data } = await apiClient.get<GoalListResponse>(`/goals?${queryString}`);
  return data.data;
}

export async function getGoalItem(req?: GetGoalOption) {
  const url = req?.goalId ? `/goals/${req.goalId}` : '/goals?status=PROGRESS';
  const { data } = await apiClient.get<CommonResponse<Goal>>(url);

  // TODO : Array 벗겨지면 해당 분기처리 코드 삭제필요
  return Array.isArray(data.data) ? data.data[0] : data.data;
}

export async function deleteGoal(goalId: string) {
  const { data } = await apiClient.delete<CommonResponse<string>>(`/goals/${goalId}`);
  return data.data;
}

export async function putEditGoal(req: Goal) {
  const { data } = await apiClient.put<CommonResponse<string>>(`/goals/${req.id}`, req);
  return data.data;
}
