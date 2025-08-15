export interface GoalFormData {
  category: string; // 임시로 넣고 BE 와 논의 필요
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
