export type TodoBottomSheetMode = 'add' | 'edit';

/** 바텀시트 내부 뷰 상태 */
export type TodoBottomSheetView = 'main' | 'repeatSelect' | 'dateSelect';

/** 날짜 선택 탭 타입 */
export type DateSelectTab = 'startDate' | 'endDate';

/** 반복 타입 (API 스펙과 동일) */
export type RepeatType = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

/** 내부 폼에서 사용하는 반복 타입 (none 포함) */
export type FormRepeatType = 'none' | RepeatType;

export interface Goal {
  id: string;
  name: string;
}

/** 루틴 기간 설정 */
export interface RoutineDuration {
  startDate: string; // 'YYYY-MM-DD'
  endDate: string; // 'YYYY-MM-DD'
}

/** 루틴 설정 */
export interface RoutineSettings {
  duration: RoutineDuration;
  repeatType: RepeatType;
}

export interface TodoFormData {
  content: string;
  goalId: string | null;
  repeatType: FormRepeatType;
  isImportant: boolean;
  /** 루틴 기간 설정 (반복이 none이 아닐 때만 사용) */
  routineDuration?: RoutineDuration;
}

export const TODO_DEFAULT_VALUES: TodoFormData = {
  content: '',
  goalId: null,
  repeatType: 'none',
  isImportant: false,
  routineDuration: undefined,
};

export const REPEAT_TYPE_LABELS: Record<FormRepeatType, string> = {
  none: '없음',
  DAILY: '매일',
  WEEKLY: '매주',
  BIWEEKLY: '격주',
  MONTHLY: '매월',
};
