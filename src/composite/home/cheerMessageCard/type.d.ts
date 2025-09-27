import { CommonResponse } from '@/shared/type/response';

export interface GrorongAdvice {
  saying: string;
  message: string;
  mood: 'HAPPY' | 'NORMAL' | 'SAD';
}

export interface GrorongAdviceResponse extends CommonResponse<GrorongAdvice> {}
