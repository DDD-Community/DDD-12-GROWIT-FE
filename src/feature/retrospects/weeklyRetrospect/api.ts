import { apiClient } from '@/shared/lib/apiClient';
import { AxiosError } from 'axios';

type PutWeeklyRetrospectResponse = { isSuccess: true; data: any } | { isSuccess: false; message: string };

export const putWeeklyRetrospect = async (id: string, content: string): Promise<PutWeeklyRetrospectResponse> => {
  try {
    const response = await apiClient.put(`/retrospects/${id}`, {
      content: content,
    });
    return { isSuccess: true, data: response.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.message) {
      const errorMessage = error.response.data.message;
      return { isSuccess: false, message: errorMessage || '알 수 없는 에러 발생' };
    }
    return { isSuccess: false, message: '알 수 없는 에러 발생' };
  }
};
