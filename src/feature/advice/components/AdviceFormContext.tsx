import { createContext } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AdviceChat, AdviceChatRequest } from '@/model/advice/types';

/** 폼 제출 함수, 제출 상태 컨텍스트 */
type TAdviceFormContext = {
  requestAdvice: UseMutateAsyncFunction<AdviceChat, Error, AdviceChatRequest, unknown>;
  isSendingRequest: boolean;
  remainingCount: number;
};
export const AdviceFormContext = createContext<TAdviceFormContext | null>(null);

/** 조언 스타일 선택 시트 열림 상태, 열기/닫기 함수 컨텍스트 */
type TAdviceStyleSelectContext = {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

export const AdviceStyleSelectContext = createContext<TAdviceStyleSelectContext | null>(null);
