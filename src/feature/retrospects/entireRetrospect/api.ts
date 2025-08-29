import { RetrospectAIResponse } from './type';
import { apiClient } from '@/shared/lib/apiClient';
import { AxiosError } from 'axios';

interface CompletedGoalRetrospectResponse {
  data: RetrospectAIResponse;
  content: string;
}

export const postCompletedGoalRetrospect = async (goalId: string) => {
  try {
    const response = await apiClient.post<CompletedGoalRetrospectResponse>(`/goal-retrospects`, { goalId: goalId });
    const data = response.data;
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error(error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const patchCompletedGoalRetrospect = async (goalId: string, content: string) => {
  try {
    const response = await apiClient.patch(`/goal-retrospects/${goalId}`, { content });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error(error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getCompletedGoalRetrospect = async (goalRetrospectId: string) => {
  try {
    const response = await apiClient.get<CompletedGoalRetrospectResponse>(`/goal-retrospects/${goalRetrospectId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
