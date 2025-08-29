import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface CheerMessageResponse
  extends CommonResponse<{
    message: string;
    from: string;
  }> {}

export async function getCheerMessage() {
  const response = await apiClient.get<CheerMessageResponse>('/resource/saying');
  return response.data.data;
}
