export type TodoBottomSheetMode = 'add' | 'edit';

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Goal {
  id: string;
  name: string;
}

export interface TodoFormData {
  content: string;
  goalId: string | null;
  repeatType: RepeatType;
  isImportant: boolean;
}

export const TODO_DEFAULT_VALUES: TodoFormData = {
  content: '',
  goalId: null,
  repeatType: 'none',
  isImportant: false,
};

export const REPEAT_TYPE_LABELS: Record<RepeatType, string> = {
  none: '없음',
  daily: '매일',
  weekly: '매주',
  monthly: '매월',
};
