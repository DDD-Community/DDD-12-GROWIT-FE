import { apiClient } from '@/shared/lib/apiClient';
import { GoalFormData } from '@/shared/type/form';

interface CreateGoalRequest extends GoalFormData {}

export async function postCreateGoal(req: CreateGoalRequest) {
  return await apiClient.post<CreateGoalRequest>('/goals', req);
}
