export enum GoalCategoryEnum {
  STUDY = 'STUDY',
  FINANCE = 'FINANCE',
  IT_PROJECT = 'IT_PROJECT',
}

//type UpdateStatus = 'ENDED' | 'PARTIALLY_UPDATABLE' | 'NOT_UPDATABLE' | 'string';

export interface Goal {
  id: string;
  name: string;
  planet: {
    name: string;
    image: {
      done: string;
      progress: string;
    };
  };
  duration: {
    startDate: string;
    endDate: string;
  };
  status: 'PROGRESS' | 'ENDED';
  analysis: null;
  isChecked: boolean;
}

// export interface Plan {
//   id: string;
//   content: string;
//   weekOfMonth: number;
//   duration?: {
//     startDate: string;
//     endDate: string;
//   };
// }
