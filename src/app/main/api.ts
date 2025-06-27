import { Goal } from '@/shared/type/goal';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface GoalListResponse extends CommonResponse<{ goals: Goal[] }> {}

export async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goal');
  return data.data.goals;
}
