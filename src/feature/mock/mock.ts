import { mockApiClient } from '@/shared/lib/mockApiClient';
import { CommonResponse } from '@/shared/type/response';
import { Todo, DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Goal } from '@/shared/type/goal';
import qs from 'qs';

// Mock API 전용 네임스페이스
export const todoMock = {
  // Goal 관련 API
  getGoals: async () => {
    console.log('Mock API 호출: getGoals');
    try {
      const { data } = await mockApiClient.get<CommonResponse<Goal[]>>('/mock/goals');
      console.log('Mock API 응답: getGoals', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getGoals', error);
      throw error;
    }
  },

  // 주간 Todo 리스트 조회 (요일별로 그룹화)
  getWeeklyTodoList: async (req: { goalId: string; planId: string }) => {
    console.log('Mock API 호출: getWeeklyTodoList', req);
    const queryString = qs.stringify({
      goalId: req.goalId,
      planId: req.planId,
    });
    try {
      const { data } = await mockApiClient.get<CommonResponse<Record<DAY_OF_THE_WEEK, Todo[]>>>(
        `/mock/todos?${queryString}`
      );
      console.log('Mock API 응답: getWeeklyTodoList', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getWeeklyTodoList', error);
      throw error;
    }
  },

  // Todo CRUD 작업
  createTodo: async (todoData: Omit<Todo, 'id'>) => {
    console.log('Mock API 호출: createTodo', todoData);
    try {
      const { data } = await mockApiClient.post<CommonResponse<Todo>>('/mock/todos', todoData);
      console.log('Mock API 응답: createTodo', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: createTodo', error);
      throw error;
    }
  },

  getTodoById: async (todoId: string) => {
    console.log('Mock API 호출: getTodoById', todoId);
    try {
      const { data } = await mockApiClient.get<CommonResponse<Todo>>(`/mock/todos/${todoId}`);
      console.log('Mock API 응답: getTodoById', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getTodoById', error);
      throw error;
    }
  },

  updateTodo: async (todoId: string, todoData: Partial<Todo>) => {
    console.log('Mock API 호출: updateTodo', { todoId, todoData });
    try {
      const { data } = await mockApiClient.put<CommonResponse<Todo>>(`/mock/todos/${todoId}`, todoData);
      console.log('Mock API 응답: updateTodo', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: updateTodo', error);
      throw error;
    }
  },

  deleteTodo: async (todoId: string) => {
    console.log('Mock API 호출: deleteTodo', todoId);
    try {
      const { data } = await mockApiClient.delete<CommonResponse<Todo>>(`/mock/todos/${todoId}`);
      console.log('Mock API 응답: deleteTodo', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: deleteTodo', error);
      throw error;
    }
  },

  updateTodoStatus: async (todoId: string, isCompleted: boolean) => {
    console.log('Mock API 호출: updateTodoStatus', { todoId, isCompleted });
    try {
      const { data } = await mockApiClient.patch<CommonResponse<Todo>>(`/mock/todos/${todoId}`, { isCompleted });
      console.log('Mock API 응답: updateTodoStatus', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: updateTodoStatus', error);
      throw error;
    }
  },

  // Todo 리스트 조회 (기존 호환성 유지)
  getTodos: async (params?: { goalId?: string; planId?: string; date?: string }) => {
    console.log('Mock API 호출: getTodos', params);
    try {
      const { data } = await mockApiClient.get<CommonResponse<Todo[]>>('/mock/todos/all', { params });
      console.log('Mock API 응답: getTodos', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getTodos', error);
      throw error;
    }
  },

  getTodayTodos: async (goalId?: string) => {
    console.log('Mock API 호출: getTodayTodos', goalId);
    const params = goalId ? { goalId } : {};
    try {
      const { data } = await mockApiClient.get<CommonResponse<Todo[]>>('/mock/todos/today', { params });
      console.log('Mock API 응답: getTodayTodos', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getTodayTodos', error);
      throw error;
    }
  },

  getWeeklyTodos: async (params: { goalId?: string; startDate: string; endDate: string }) => {
    console.log('Mock API 호출: getWeeklyTodos', params);
    try {
      const { data } = await mockApiClient.get<CommonResponse<Record<string, Todo[]>>>('/mock/todos/weekly', {
        params,
      });
      console.log('Mock API 응답: getWeeklyTodos', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: getWeeklyTodos', error);
      throw error;
    }
  },

  // 기존 컴포넌트용 API
  patchTodoStatus: async (req: { todoId: string; isCompleted: boolean }) => {
    console.log('Mock API 호출: patchTodoStatus', req);
    const { todoId, isCompleted } = req;
    try {
      const { data } = await mockApiClient.patch<CommonResponse>(`/mock/todos/${todoId}`, { isCompleted });
      console.log('Mock API 응답: patchTodoStatus', data);
      return data.data;
    } catch (error) {
      console.error('Mock API 에러: patchTodoStatus', error);
      throw error;
    }
  },
};
