import { Goal } from '@/shared/type/goal';

export const convertFormDataToGoal = (initGoal?: Goal): Goal => {
  if (!initGoal) {
    return defaultValues;
  }
  return {
    ...initGoal,
    id: initGoal.id,
    name: initGoal.name,
    duration: {
      startDate: initGoal.duration.startDate,
      endDate: initGoal.duration.endDate,
    },
  };
};

const defaultValues: Goal = {
  id: '',
  name: '',
  duration: {
    startDate: '',
    endDate: '',
  },
  status: 'PROGRESS',
  analysis: null,
  isChecked: false,
  planet: {
    name: '',
    image: {
      done: '',
      progress: '',
    },
  },
};
