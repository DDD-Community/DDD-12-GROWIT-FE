export type TodoBottomSheetMode = 'add' | 'edit';

export interface TodoFormData {
  content: string;
  groupId: string | null;
  isImportant: boolean;
}

export const TODO_DEFAULT_VALUES: TodoFormData = {
  content: '',
  groupId: null,
  isImportant: false,
};
