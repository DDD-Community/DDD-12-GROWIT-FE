import { AIMentor } from '@/feature/home/type';

export enum GoalCategoryEnum {
  STUDY = 'STUDY',
  FINANCE = 'FINANCE',
  IT_PROJECT = 'IT_PROJECT',
}

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
