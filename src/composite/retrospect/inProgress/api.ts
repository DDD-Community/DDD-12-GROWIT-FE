import { apiClient } from '@/shared/lib/apiClient';
import { HttpResponse, http } from 'msw';

interface Retrospect {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
}

interface RetrospectResponse {
  id: string;
  isCompleted: boolean;
  goal: Retrospect;
}

interface Plan {
  id: string;
  weekOfMonth: number;
  content: string;
}

export interface WeeklyRetrospectResponse {
  id: string;
  goalId: string;
  plan: Plan;
  content: string;
}

const mockRetrospects: RetrospectResponse[] = [
  {
    id: '1',
    isCompleted: false,
    goal: {
      id: 'goal1',
      name: '그로잇 서비스 출시',
      duration: {
        startDate: '2025-07-01',
        endDate: '2025-08-31',
      },
    },
  },
];

export const mockRetrospectHandler = http.get('https://api.grow-it.me/goal-retrospects', () => {
  return HttpResponse.json(mockRetrospects, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

export const getRetrospects = async (year: number) => {
  try {
    const response = await apiClient.get<RetrospectResponse>(`/goal-retrospects?year=${year}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching retrospects:', error);
    throw error;
  }
};

export const getWeeklyRetrospect = async (goalId: string) => {
  try {
    const response = await apiClient.get<WeeklyRetrospectResponse[]>(`/retrospects?goalId=${goalId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching weekly retrospects:', error);
    throw error;
  }
};
