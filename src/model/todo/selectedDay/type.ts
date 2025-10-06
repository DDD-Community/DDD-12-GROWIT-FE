import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';

export interface DatePicker {
  key: DAY_OF_THE_WEEK;
  label: string;
  date: Date;

  /**
   * 목표 시작 날짜 전인지 여부
   */
  isBeforeStart: boolean;

  /**
   * 목표 종료 날짜 후인지 여부
   */
  isAfterEnd: boolean;
}
