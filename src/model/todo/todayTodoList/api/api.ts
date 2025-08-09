import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { Todo } from '@/shared/type/Todo';

interface TodoListTodayResponse extends CommonResponse<Todo[]> {}

interface ChangeTodoStatusRequest {
  todoId: string;
  isCompleted: boolean;
}

export async function getTodayMissionList() {
  const { data } = await apiClient.get<TodoListTodayResponse>('/todos?date=today');
  return data.data;
}

export async function patchTodoStatus(req: ChangeTodoStatusRequest) {
  const { todoId, isCompleted } = req;
  const { data } = await apiClient.patch<CommonResponse>(`/todos/${todoId}`, { isCompleted });
  return data.data;
}
