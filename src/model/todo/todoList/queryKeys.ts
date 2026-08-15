import { TodoCountByDateRequest } from './dto';

export const todoListQueryKeys = {
  all: ['todos'] as const,
  lists: () => [...todoListQueryKeys.all, 'getTodosByDate'] as const,
  getTodosByDate: (date: string) => [...todoListQueryKeys.lists(), date] as const,
  detail: (todoId: string) => [...todoListQueryKeys.all, 'detail', todoId] as const,
  counts: () => [...todoListQueryKeys.all, 'getTodoCountByDate'] as const,
  getTodoCountByDate: (req: TodoCountByDateRequest) => [...todoListQueryKeys.counts(), req.from, req.to] as const,
  patchTodoStatus: () => [...todoListQueryKeys.all, 'patchTodoStatus'] as const,
  putTodo: () => [...todoListQueryKeys.all, 'putTodo'] as const,
  deleteTodo: () => [...todoListQueryKeys.all, 'deleteTodo'] as const,
  postAddTodo: () => [...todoListQueryKeys.all, 'postAddTodo'] as const,
};
