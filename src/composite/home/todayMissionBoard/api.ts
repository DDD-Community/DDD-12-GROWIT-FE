import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { Todo } from '@/shared/type/Todo';

interface TodoListTodayResponse extends CommonResponse<Todo[]> {}

export async function getTodayMissionList() {
  const { data } = await apiClient.get<TodoListTodayResponse>('/todos?date=today');
  return data.data;
}
