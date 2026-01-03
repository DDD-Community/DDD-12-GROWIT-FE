import z from 'zod';
import { createGoalRequestSchema } from '@/model/goal/dto';

export const createGoalFormSchema = createGoalRequestSchema.refine(
  data => {
    const start = new Date(data.duration.startDate);
    const end = new Date(data.duration.endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // 최소 7일(1주일), 최대 365일 (1년)
    return diffDays >= 7 && diffDays <= 365;
  },
  {
    message: '목표 기간은 최소 1주, 최대 1년까지 설정 가능합니다.',
    path: ['duration'],
  }
);

export type CreateGoalFormType = z.infer<typeof createGoalRequestSchema>;
