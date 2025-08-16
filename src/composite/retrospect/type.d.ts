export interface Duration {
  startDate: string;
  endDate: string;
}

interface Plan {
  id: string;
  weekOfMonth: number;
  isCurrentWeek: boolean;
  content: string;
}

interface Retrospect {
  id: string;
  content: string;
}
