import { AIMentor } from '@/feature/home/type';

export enum GoalCategoryEnum {
  STUDY = 'STUDY',
  FINANCE = 'FINANCE',
  IT_PROJECT = 'IT_PROJECT',
}

type UpdateStatus = 'ENDED' | 'PARTIALLY_UPDATABLE' | 'NOT_UPDATABLE' | 'string';

export interface Goal {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  toBe?: string;
  mentor: AIMentor;
  category: GoalCategoryEnum;
  plans: Plan[];
  updateStatus?: UpdateStatus;
}

export interface Plan {
  id: string;
  content: string;
  weekOfMonth: number;
  duration?: {
    startDate: string;
    endDate: string;
  };
}
