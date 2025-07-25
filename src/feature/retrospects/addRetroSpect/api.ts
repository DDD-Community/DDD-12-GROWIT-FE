import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface AddRetrospectRequest {
  goalId: string;
  planId: string;
  content: string;
}

interface GetRetrospectRequest {
  goalId: string;
  planId: string;
}

interface DeleteRetrospectRequest {
  retrospectId: string;
}

interface PutRetrospectRequest {
  retrospectId: string;
  planId: string;
  content: string;
}

interface AddRetrospectResponse extends CommonResponse<{ id: string }> {}

interface GetRetrospectResponse
  extends CommonResponse<{
    id: string;
    goalId: string;
    plan: {
      id: string;
      weekOfMonth: number;
      content: string;
    };
    content: string;
  }> {}

export async function postAddRetrospect(req: AddRetrospectRequest) {
  const { data } = await apiClient.post<AddRetrospectResponse, AddRetrospectRequest>('/retrospects', req);
  return data.data;
}

export async function getRetrospects(req: GetRetrospectRequest) {
  const { goalId, planId } = req;
  const { data } = await apiClient.get<GetRetrospectResponse>(`/retrospects?goalId=${goalId}&planId=${planId}`);
  return data.data;
}

export async function deleteRetrospect(req: DeleteRetrospectRequest) {
  const { data } = await apiClient.delete<CommonResponse>(`/retrospects/${req.retrospectId}`);
  return data.data;
}

export async function putRetrospect(req: PutRetrospectRequest) {
  const { data } = await apiClient.put<CommonResponse>(`/retrospects/${req.retrospectId}`, req);
  return data.data;
}
