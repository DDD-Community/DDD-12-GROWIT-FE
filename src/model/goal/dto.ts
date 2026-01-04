import { z } from 'zod';

/** POST /goals, PUT /goals/:id 요청 스키마 */
export const goalRequestSchema = z.object({
  name: z.string().min(1, '목표를 입력해주세요'),
  duration: z.object({
    startDate: z.string().min(1, '시작일을 선택해주세요'),
    endDate: z.string().min(1, '종료일을 선택해주세요'),
  }),
});

export type GoalRequestType = z.infer<typeof goalRequestSchema>;

export const createGoalResponseSchema = z.object({
  id: z.string(),
  planet: z.object({
    name: z.string(),
    image: z.object({
      done: z.string(),
      progress: z.string(),
    }),
  }),
});

export type CreateGoalResponseType = z.infer<typeof createGoalResponseSchema>;
