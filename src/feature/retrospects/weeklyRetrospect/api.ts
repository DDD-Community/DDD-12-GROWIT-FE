import { apiClient } from '@/shared/lib/apiClient';

export const putWeeklyRetrospect = async (id: string, content: string) => {
  try {
    const response = await apiClient.put(`/retrospects/${id}`, {
      content: content,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
