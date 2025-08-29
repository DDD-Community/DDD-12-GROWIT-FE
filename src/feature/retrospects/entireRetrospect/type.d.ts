export interface RetrospectAIResponse {
  id: string;
  goalId: string;
  todoCompletedRate: number;
  analysis: {
    summary: string;
    advice: string;
  };
  content: string;
}
