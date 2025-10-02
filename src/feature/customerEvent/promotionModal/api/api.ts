import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface PromotionModalRequest {
  code: string;
}

interface PromotionModalResponse extends CommonResponse<string> {}

export async function postPromotionModal(request: PromotionModalRequest) {
  const { data } = await apiClient.post<PromotionModalResponse, PromotionModalRequest>(
    `${process.env.NEXT_PUBLIC_API_URL}/externals/invitations`,
    request
  );
  return data.data;
}
