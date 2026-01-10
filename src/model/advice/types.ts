import { CommonResponse } from '@/shared/type/response';

export type AdviceChatMessage = {
  userMessage: string;
  grorongResponse: string;
  timestamp: string;
};

export type AdviceChat = {
  remainingCount: number;
  isGoalOnboardingCompleted: boolean;
  conversations: AdviceChatMessage[];
};

export type AdviceChatResponse = CommonResponse<AdviceChat>;

export type AdviceStyle = 'BASIC' | 'WARM' | 'FACTUAL' | 'STRATEGIC';

export type AdviceChatRequest = {
  week: number;
  goalId: string;
  userMessage: string;
  adviceStyle: AdviceStyle;
  // 온보딩 메시지의 응답이 필요한가에 대해서 Optional
  isGoalOnboardingCompleted?: boolean;
};

export type GrorongMood = 'HAPPY' | 'NORMAL' | 'SAD';

export type GrorongAdvice = {
  saying: string;
  message: string;
  mood: GrorongMood;
};

export type GrorongAdviceResponse = CommonResponse<GrorongAdvice>;
