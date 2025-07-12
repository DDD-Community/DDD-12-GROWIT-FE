import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface ChangeTodoStatusRequest {
  todoId: string;
  isCompleted: boolean;
}

export async function patchTodoStatus(req: ChangeTodoStatusRequest) {
  const { todoId, isCompleted } = req;
  const { data } = await apiClient.patch<CommonResponse>(`/todos/${todoId}`, { isCompleted });
  return data.data;
}
