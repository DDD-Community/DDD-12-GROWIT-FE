import { CommonResponse } from '@/shared/type/response';

export type GrorongMood = 'HAPPY' | 'NORMAL' | 'SAD';

export type GrorongAdvice = {
  saying: string;
  message: string;
  mood: GrorongMood;
};

export type GrorongAdviceResponse = CommonResponse<GrorongAdvice>;
