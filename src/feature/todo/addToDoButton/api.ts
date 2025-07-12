import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { Todo } from '@/shared/type/Todo';

interface AddTodoRequest {
  goalId: string;
  planId: string;
  date: string; // '2025-06-30';
  content: string;
}

interface AddTodoResponse extends CommonResponse<{ id: string }> {}

export async function postAddTodo(request: AddTodoRequest) {
  const response = await apiClient.post<AddTodoResponse, AddTodoRequest>('/todos', request);
  return response.data;
}
