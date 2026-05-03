import { apiClient } from '@/shared/lib/apiClient';
import { GrorongAdviceResponse } from './types';

const AdviceApi = {
  getGrorongAdvice: async () => {
    try {
      const { data } = await apiClient.get<GrorongAdviceResponse>('/advice/grorong');
      return data.data;
    } catch (error) {
      throw new Error('그로롱 조언 조회에 실패했습니다.');
    }
  },
};

export default AdviceApi;
