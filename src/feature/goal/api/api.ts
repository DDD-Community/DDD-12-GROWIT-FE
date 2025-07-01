import { Goal } from '@/shared/type/goal';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { GoalFormData } from '@/app/home/create-goal/page';

interface GoalListResponse extends CommonResponse<Goal[]> {}

interface CreateGoalRequest extends GoalFormData {}

export async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data;
}

export async function postCreateGoal(req: CreateGoalRequest) {
  return await apiClient.post<CreateGoalRequest>('/goals', req);
}
