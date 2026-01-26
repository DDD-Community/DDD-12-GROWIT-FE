import { z } from 'zod';

const AdviceFormSchema = z.object({
  week: z.number(),
  goalId: z.string().min(1, '목표 ID는 필수값입니다'),
  userMessage: z.string().min(1, '조언 요청 메시지는 최소 1자 이상이어야 합니다'),
  adviceStyle: z.enum(['BASIC', 'WARM', 'FACTUAL', 'STRATEGIC']).default('BASIC'),
});

export { AdviceFormSchema };
