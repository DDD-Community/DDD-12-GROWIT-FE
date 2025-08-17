export interface Goal {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
}

export interface GoalRetrospect {
  id: string; // 회고 아이디
  isCompleted: boolean; // 회고 생성은 했지만 회고 내용을 작성 안함 (true일때)
}

export interface CompletedGoals {
  goal: Goal;
  goalRetrospect: GoalRetrospect;
}
