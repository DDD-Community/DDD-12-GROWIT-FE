import { Goal, GoalCategoryEnum } from '@/shared/type/goal';
import { EditGoalFormData } from './type';
import { parseDateFromYYYYMMDD } from '../createGoalFormElement/utils';

export const convertFormDataToGoal = (initGoal?: Goal): EditGoalFormData => {
  if (!initGoal) {
    return defaultValues;
  }
  return {
    ...initGoal,
    id: initGoal.id,
    name: initGoal.name,
    category: GoalCategoryEnum[initGoal.category] || GoalCategoryEnum.STUDY,
    duration: {
      startDate: initGoal.duration.startDate,
      endDate: initGoal.duration.endDate,
    },
    durationPeriod: Math.ceil(
      (parseDateFromYYYYMMDD(initGoal.duration.endDate).getTime() -
        parseDateFromYYYYMMDD(initGoal.duration.startDate).getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    ),
    toBe: initGoal.toBe,
  };
};

const defaultValues: EditGoalFormData = {
  id: '',
  name: '',
  mentor: {} as any,
  category: GoalCategoryEnum.STUDY,
  duration: {
    startDate: '',
    endDate: '',
  },
  durationPeriod: 4,
  plans: [
    { id: '1', content: '', weekOfMonth: 1 },
    { id: '2', content: '', weekOfMonth: 2 },
    { id: '3', content: '', weekOfMonth: 3 },
    { id: '4', content: '', weekOfMonth: 4 },
  ],
  toBe: '목표 달성',
};
