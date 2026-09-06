import { apiClient } from '@/shared/lib/apiClient';
import type { CommonResponse } from '@/shared/type/response';
import type { TodoByDateItem, TodoCountByDateItem } from '@/model/todo/todoList/dto';

export interface HomeBootstrapRequest {
  date: string;
  from: string;
  to: string;
}

export interface HomeBootstrapData {
  hasOnboarded: boolean;
  todos: TodoByDateItem[];
  todoCounts: TodoCountByDateItem[];
}

export const getHomeBootstrap = async (request: HomeBootstrapRequest) => {
  const { data } = await apiClient.get<CommonResponse<HomeBootstrapData>>('/home/bootstrap', {
    params: request,
  });
  return data.data;
};
