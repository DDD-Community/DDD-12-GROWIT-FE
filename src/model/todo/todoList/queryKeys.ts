import { TodoCountByDateRequest } from './dto';

export const todoListQueryKeys = {
  all: ['todos'] as const,
  getTodosByDate: (date: string) => [...todoListQueryKeys.all, 'getTodosByDate', date] as const,
  getTodoCountByDate: (req: TodoCountByDateRequest) =>
    [...todoListQueryKeys.all, 'getTodoCountByDate', req.from, req.to] as const,
  patchTodoStatus: () => [...todoListQueryKeys.all, 'patchTodoStatus'] as const,
  putTodo: () => [...todoListQueryKeys.all, 'putTodo'] as const,
  deleteTodo: () => [...todoListQueryKeys.all, 'deleteTodo'] as const,
  postAddTodo: () => [...todoListQueryKeys.all, 'postAddTodo'] as const,
};
