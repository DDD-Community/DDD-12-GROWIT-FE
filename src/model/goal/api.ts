import { apiClient } from '@/shared/lib/apiClient';
import { Goal } from '@/shared/type/goal';
import { CommonResponse } from '@/shared/type/response';

interface GoalListResponse extends CommonResponse<Goal[]> {}

export async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data;
}

export async function getCurrentProgressGoal() {
  const { data } = await apiClient.get<GoalListResponse>('/goals?status=progress');
  return data.data;
}
