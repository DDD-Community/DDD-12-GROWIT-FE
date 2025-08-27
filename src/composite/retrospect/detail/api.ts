import { apiClient } from '@/shared/lib/apiClient';
import { Analysis, WeekOfDayTodo } from './type';
import { Goal } from '@/shared/type/goal';

interface GoalRetrospectResponse {
  data: {
    id: string;
    goalId: string;
    todoCompletedRate: number;
    analysis: Analysis;
    content: string;
  };
}

interface getGoalsResponse {
  data: Goal[];
}

interface GetGoalByIdResponse {
  data: Goal;
}

export type WeeklyTodosData = Record<string, WeekOfDayTodo[]>;
interface WeeklyTodosResponse {
  data: WeeklyTodosData;
}

export const getGoalRetrosepctById = async (id: string) => {
  try {
    const response = await apiClient.get<GoalRetrospectResponse>(`/goal-retrospects/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompletedGoals = async () => {
  try {
    const response = await apiClient.get<getGoalsResponse>(`/goals?status=ENDED`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getGoalById = async (goalId: string) => {
  try {
    const response = await apiClient.get<GetGoalByIdResponse>(`/goals/${goalId}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getWeeklyTodos = async (goalId: string, planId: string) => {
  try {
    const response = await apiClient.get<WeeklyTodosResponse>(`/todos?goalId=${goalId}&planId=${planId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
