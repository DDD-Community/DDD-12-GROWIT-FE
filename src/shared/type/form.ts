import { GoalCategoryEnum } from '../constants/goalCategory';

export interface GoalFormData {
  category: GoalCategoryEnum;
  name: string;
  duration: number; // 4, 8, 12 중 선택된 주차
  durationDate: {
    startDate: string;
    endDate: string;
  };
  toBe: string;
  plans: {
    content: string;
    weekOfMonth: number;
  }[];
}
