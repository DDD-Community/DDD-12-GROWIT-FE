import { AIMentor } from '@/feature/home/type';

export interface Goal {
  id: string;
  name: string;
  mentor: AIMentor;
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
