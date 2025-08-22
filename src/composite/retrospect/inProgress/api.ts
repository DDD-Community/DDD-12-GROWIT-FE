import { apiClient } from '@/shared/lib/apiClient';
import { Duration, Retrospect, Plan } from '../type';

interface InprogressRetrospectResponse {
  data: {
    id: string;
    userId: string;
    name: string;
    duration: Duration;
    toBe: string;
    plans: Plan[];
  }[];
}
export interface WeeklyRetrospectResponse {
  data: {
    plan: Plan;
    retrospect: Retrospect;
  }[];
}

export const getProgressRetrospect = async () => {
  try {
    const response = await apiClient.get<InprogressRetrospectResponse>('/goals?status=PROGRESS');
    const data = response.data;
    return data;
  } catch (error) {
    console.log('진행중인 목표 조회 과정 중 오류가 발생했습니다', error);
    throw error;
  }
};

export const getWeeklyRetrospectByGoalId = async (goalId: string) => {
  try {
    const response = await apiClient.get<WeeklyRetrospectResponse>(`/retrospects?goalId=${goalId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching weekly retrospects:', error);
    throw error;
  }
};
