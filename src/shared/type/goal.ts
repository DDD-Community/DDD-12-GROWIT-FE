export interface Goal {
  id: string;
  name: string;
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
