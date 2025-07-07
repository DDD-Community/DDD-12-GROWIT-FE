export interface GoalFormData {
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
  plans: {
    content: string;
    weekOfMonth: number;
  }[];
}
