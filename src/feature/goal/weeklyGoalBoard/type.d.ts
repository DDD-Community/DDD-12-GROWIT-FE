export interface GoalRecommendation {
  id: string;
  uid: string;
  promptId: string;
  output: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalRecommendationResponse {
  data: GoalRecommendation;
}
