import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { TodoResponse } from '@/shared/type/Todo';

interface ChangeTodoStatusRequest {
  todoId: string;
  isCompleted: boolean;
}

interface ChangeTodoRequest {
  todoId: string;
  date: string;
  content: string;
}

export async function patchTodoStatus(req: ChangeTodoStatusRequest) {
  const { todoId, isCompleted } = req;
  const { data } = await apiClient.patch<CommonResponse>(`/todos/${todoId}`, { isCompleted });
  return data.data;
}

export async function putTodo(req: ChangeTodoRequest) {
  const { todoId, ...putReq } = req;
  const { data } = await apiClient.put<CommonResponse<TodoResponse>>(`/todos/${todoId}`, putReq);
  return data.data;
}

export async function deleteTodo(todoId: string) {
  const { data } = await apiClient.delete<CommonResponse>(`/todos/${todoId}`);
  return data.data;
}
