import { apiClient } from '@/shared/lib/apiClient';
import { Goal } from '@/shared/type/goal';
import { CommonResponse } from '@/shared/type/response';
import qs from 'qs';
import { CreateGoalRequestType } from './dto';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';

interface GoalListResponse extends CommonResponse<Goal[]> {}

export interface GetGoalOption {
  goalId: string;
}

export interface GetGoalListOption {
  year: number;
}

const GoalApi = {
  getAllGoals: async (): Promise<Goal[]> => {
    const { data } = await apiClient.get<GoalListResponse>('/goals');
    return data.data;
  },

  getProgressGoals: async (): Promise<Goal[]> => {
    const { data } = await apiClient.get<GoalListResponse>('/goals?status=PROGRESS');
    return data.data;
  },

  getEndedGoals: async (): Promise<Goal[]> => {
    const { data } = await apiClient.get<GoalListResponse>('/goals?status=ENDED');
    return data.data;
  },

  getGoalList: async (option?: GetGoalListOption) => {
    const queryString = option ? qs.stringify(option) : '';
    const { data } = await apiClient.get<GoalListResponse>(`/goals?${queryString}`);
    return data.data;
  },

  getGoalItem: async (req?: GetGoalOption) => {
    const url = req?.goalId ? `/goals/${req.goalId}` : '/goals?status=PROGRESS';
    const { data } = await apiClient.get<CommonResponse<Goal>>(url);

    // TODO : Array 벗겨지면 해당 분기처리 코드 삭제필요
    return Array.isArray(data.data) ? data.data[0] : data.data;
  },

  deleteGoal: async (goalId: string) => {
    const { data } = await apiClient.delete<CommonResponse<string>>(`/goals/${goalId}`);
    return data.data;
  },

  putEditGoal: async (req: Goal) => {
    const { data } = await apiClient.put<CommonResponse<string>>(`/goals/${req.id}`, req);
    return data.data;
  },

  postGoal: async (formData: CreateGoalRequestType) => {
    const { data } = await apiClient.post<CommonResponse<CreateGoalResponseData>>('/goals', formData);
    return data.data;
  },
};

// Named exports for backward compatibility
export const getAllGoals = GoalApi.getAllGoals;
export const getProgressGoals = GoalApi.getProgressGoals;
export const getEndedGoals = GoalApi.getEndedGoals;
export const getGoalList = GoalApi.getGoalList;
export const getGoalItem = GoalApi.getGoalItem;
export const deleteGoal = GoalApi.deleteGoal;
export const putEditGoal = GoalApi.putEditGoal;

export default GoalApi;
