import { Goal } from '@/shared/type/goal';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { GoalFormData } from '@/app/main/create-goal/page';

interface GoalListResponse extends CommonResponse<{ goals: Goal[] }> {}

interface CreateGoalRequest extends GoalFormData {}

export async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data.goals;
}

export async function postCreateGoal(req: CreateGoalRequest) {
  return await apiClient.post<CreateGoalRequest>('/goals', req);
}
