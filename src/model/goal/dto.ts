import { z } from 'zod';

// post /goals 목표 생성 요청 스키마
export const createGoalRequestSchema = z.object({
  name: z.string().min(1, '목표를 입력해주세요'),
  duration: z.object({
    startDate: z.string().min(1, '시작일을 선택해주세요'),
    endDate: z.string().min(1, '종료일을 선택해주세요'),
  }),
});

export type CreateGoalRequestType = z.infer<typeof createGoalRequestSchema>;
