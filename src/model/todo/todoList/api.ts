import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { DAY_OF_THE_WEEK, Todo, TodoResponse } from '@/shared/type/Todo';
import qs from 'qs';
import {
  TodoByDateRequest,
  TodoByDateResponse,
  PatchTodoStatusRequest,
  PutTodoRequest,
  PostAddTodoRequest,
  PostAddTodoResponse,
  TodoCountByDateRequest,
  TodoCountByDateResponse,
  DeleteTodoRequest,
} from './dto';

export const todoListApi = {
  getTodosByDate: async (req: TodoByDateRequest) => {
    const { data } = await apiClient.get<TodoByDateResponse>(`/todos?date=${req.date}`);
    return data.data;
  },

  patchTodoStatus: async (req: PatchTodoStatusRequest) => {
    const { todoId, isCompleted } = req;
    const { data } = await apiClient.patch<CommonResponse>(`/todos/${todoId}`, { isCompleted });
    return data.data;
  },

  putTodo: async (req: PutTodoRequest) => {
    const { todoId, routineUpdateType, ...putReq } = req;
    const queryParam = routineUpdateType ? `?routineUpdateType=${routineUpdateType}` : '';
    const { data } = await apiClient.put<CommonResponse<TodoResponse>>(`/todos/${todoId}${queryParam}`, putReq);
    return data.data;
  },

  deleteTodo: async (req: DeleteTodoRequest) => {
    const { todoId, routineDeleteType } = req;
    const { data } = await apiClient.delete<CommonResponse<string>>(
      `/todos/${todoId}?routineDeleteType=${routineDeleteType}`
    );
    return data.data;
  },

  postAddTodo: async (req: PostAddTodoRequest) => {
    const response = await apiClient.post<PostAddTodoResponse, PostAddTodoRequest>('/todos', req);
    return response.data;
  },

  getTodoCountByDate: async (req: TodoCountByDateRequest) => {
    const { from, to } = req;
    const { data } = await apiClient.get<TodoCountByDateResponse>(`/todos/count?from=${from}&to=${to}`);
    return data.data;
  },
};

// ============ Legacy API (기존 API) ============

type TodoListResponse = CommonResponse<Record<DAY_OF_THE_WEEK, Todo[]>>;

export interface TodoWeeklyListRequest {
  goalId: string;
  planId: string;
}

export async function getWeeklyTodoList(req: TodoWeeklyListRequest) {
  const queryString = qs.stringify({
    goalId: req.goalId,
    planId: req.planId,
  });
  const { data } = await apiClient.get<TodoListResponse>(`/todos?${queryString}`);
  return data.data;
}
