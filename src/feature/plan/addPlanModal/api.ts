import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface UpdatePlanRequest {
  content: string;
  goalId: string;
  planId: string;
}

interface UpdatePlanResponse extends CommonResponse<string> {}

export async function putUpdatePlan(request: UpdatePlanRequest) {
  const { goalId, planId, content } = request;
  const { data } = await apiClient.put<UpdatePlanResponse>(`/goals/me/updatePlan?goalId=${goalId}&planId=${planId}`, {
    content,
  });
  return data.data;
}
