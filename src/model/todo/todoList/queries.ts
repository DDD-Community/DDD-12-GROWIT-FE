import { useQuery, useMutation } from '@tanstack/react-query';
import {
  TodoByDateRequest,
  TodoCountByDateRequest,
  PatchTodoStatusRequest,
  PutTodoRequest,
  PostAddTodoRequest,
  DeleteTodoRequest,
} from './dto';
import { todoListQueryKeys } from './queryKeys';
import { todoListApi } from './api';

export const useTodosByDate = (req: TodoByDateRequest) => {
  return useQuery({
    queryKey: todoListQueryKeys.getTodosByDate(req.date),
    queryFn: () => todoListApi.getTodosByDate(req),
    enabled: !!req.date,
  });
};

export const useTodoCountByDate = (req: TodoCountByDateRequest) => {
  return useQuery({
    queryKey: todoListQueryKeys.getTodoCountByDate(req),
    queryFn: () => todoListApi.getTodoCountByDate(req),
    enabled: !!req.from && !!req.to,
  });
};

export const usePatchTodoStatus = () => {
  return useMutation({
    mutationKey: todoListQueryKeys.patchTodoStatus(),
    mutationFn: (req: PatchTodoStatusRequest) => todoListApi.patchTodoStatus(req),
  });
};

export const usePutTodo = () => {
  return useMutation({
    mutationKey: todoListQueryKeys.putTodo(),
    mutationFn: (req: PutTodoRequest) => todoListApi.putTodo(req),
  });
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationKey: todoListQueryKeys.deleteTodo(),
    mutationFn: (req: DeleteTodoRequest) => todoListApi.deleteTodo(req),
  });
};

export const usePostAddTodo = () => {
  return useMutation({
    mutationKey: todoListQueryKeys.postAddTodo(),
    mutationFn: (req: PostAddTodoRequest) => todoListApi.postAddTodo(req),
  });
};
