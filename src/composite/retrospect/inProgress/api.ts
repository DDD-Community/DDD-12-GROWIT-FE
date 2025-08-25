import { apiClient } from '@/shared/lib/apiClient';
import { Retrospect, Plan } from '../type';
import { Goal } from '@/shared/type/goal';

/**
 * @deprecated - Goal 타입으로 대체
 */
// interface InprogressRetrospectResponse {
//   data: {
//     id: string;
//     userName: string;
//     name: string;
//     duration: Duration;
//     toBe: string;
//     categoray: string;
//     plans: Plan[];
//   }[];
// }

interface InProgressRetrospectResponse {
  data: Goal[];
}

export interface WeeklyRetrospectResponse {
  data: {
    plan: Plan;
    retrospect: Retrospect;
  }[];
}

// FIX : model/goal 의 Context 를 적용 필요 -> 붎필요 fetch 함수
export const getProgressRetrospect = async () => {
  try {
    const response = await apiClient.get<InProgressRetrospectResponse>('/goals?status=PROGRESS');
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
