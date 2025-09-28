import { Retrospect } from '@/composite/retrospect/type';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface AddRetrospectRequest {
  goalId: string;
  planId: string;
  kpt: {
    keep: string;
    problem: string;
    tryNext: string;
  };
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
  kpt: {
    keep: string;
    problem: string;
    tryNext: string;
  };
}

interface AddRetrospectResponse extends CommonResponse<{ id: string }> {}

export interface GetRetroSpectDto {
  plan: {
    content: string;
    id: string;
    isCurrentWeek: boolean;
    weekOfMonth: number;
  };
  retrospect: Retrospect;
}

interface GetRetrospectResponse extends CommonResponse<GetRetroSpectDto[]> {}

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
  const { data } = await apiClient.put<CommonResponse<string>>(`/retrospects/${req.retrospectId}`, req);
  return data.data;
}

export async function getRetrospectById(retrospectId: string) {
  const { data } = await apiClient.get<CommonResponse<GetRetroSpectDto>>(`/retrospects/${retrospectId}`);
  return data.data;
}
