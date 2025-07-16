import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface AddRetrospectRequest {
  date: string; //'2025-06-30';
  content: string;
}

interface AddRetrospectResponse extends CommonResponse<{ id: string }> {}

export async function postAddRetrospect(req: AddRetrospectRequest) {
  const { data } = await apiClient.post<AddRetrospectResponse, AddRetrospectRequest>('/retrospects', req);
  return data.data;
}
