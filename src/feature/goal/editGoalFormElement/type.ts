import { Goal, GoalCategoryEnum } from '@/shared/type/goal';

export interface EditGoalFormData extends Goal {
  durationPeriod: number;
}
