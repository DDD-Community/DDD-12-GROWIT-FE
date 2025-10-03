import { AIMentor } from '@/feature/home/type';

export enum GoalCategoryEnum {
  STUDY = 'STUDY',
  FINANCE = 'FINANCE',
  IT_PROJECT = 'IT_PROJECT',
}

export interface Goal {
  id: string;
  name: string;
  mentor: AIMentor;
  category: GoalCategoryEnum;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
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
