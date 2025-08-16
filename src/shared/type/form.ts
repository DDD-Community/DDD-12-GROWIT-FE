export interface GoalFormData {
  category: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  toBe: string;
  plans: {
    content: string;
    weekOfMonth: number;
  }[];
}
