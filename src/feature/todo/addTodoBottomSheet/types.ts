export interface AddTodoFormData {
  content: string;
  groupId: string | null;
  isImportant: boolean;
}

export const ADD_TODO_DEFAULT_VALUES: AddTodoFormData = {
  content: '',
  groupId: null,
  isImportant: false,
};
