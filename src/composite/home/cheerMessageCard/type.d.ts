import { CommonResponse } from '@/shared/type/response';

export interface GrorongAdvice {
  saying: string;
  message: string;
  mood: 'HAPPY' | 'NORMAL' | 'SAD';
}

export interface GrorongAdviceResponse extends CommonResponse<GrorongAdvice> {}

export interface AIMentorAdvice {
  isChecked: boolean;
  message: string;
  kpt: {
    keep: string;
    problem: string;
    tryNext: string;
  };
}

export interface AIMentorAdviceResponse extends CommonResponse<AIMentorAdvice> {}
