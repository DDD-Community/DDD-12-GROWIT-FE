export const todoListQueryKeys = {
  all: ['todos'] as const,
  getTodosByDate: (date: string) => [...todoListQueryKeys.all, 'getTodosByDate', date] as const,
  patchTodoStatus: () => [...todoListQueryKeys.all, 'patchTodoStatus'] as const,
  putTodo: () => [...todoListQueryKeys.all, 'putTodo'] as const,
  deleteTodo: () => [...todoListQueryKeys.all, 'deleteTodo'] as const,
  postAddTodo: () => [...todoListQueryKeys.all, 'postAddTodo'] as const,
};
