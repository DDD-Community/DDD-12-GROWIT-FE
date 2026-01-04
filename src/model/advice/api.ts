import { apiClient } from '@/shared/lib/apiClient';
import { AdviceChatResponse, AdviceChatRequest } from './types';

const AdviceApi = {
  getAdviceChat: async () => {
    try {
      const { data } = await apiClient.get<AdviceChatResponse>('/advice/chat');
      return data.data;
    } catch (error) {
      throw new Error('조언 내역 조회에 실패했습니다.');
    }
  },

  requestAdvice: async (req: AdviceChatRequest) => {
    try {
      const { data } = await apiClient.post<AdviceChatResponse, AdviceChatRequest>('/advice/chat', req);
      return data.data;
    } catch (error) {
      throw new Error('조언 생성에 실패했습니다.');
    }
  },
};

export default AdviceApi;
