'use client';

import { z } from 'zod';

/**
 * 반복 타입 enum
 */
const repeatTypeSchema = z.enum(['none', 'DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY']);

/**
 * 루틴 기간 스키마
 */
const routineDurationSchema = z.object({
  startDate: z.string().min(1, '시작일을 선택해주세요'),
  endDate: z.string().min(1, '종료일을 선택해주세요'),
});

/**
 * Todo Form 유효성 검증 스키마
 */
export const todoFormSchema = z
  .object({
    /** 할 일 내용 */
    content: z
      .string()
      .min(1, '할 일을 입력해주세요')
      .max(34, '34자 이내로 입력해주세요')
      .transform(v => v.trim())
      .refine(v => v.length > 0, '할 일을 입력해주세요'),

    /** 목표 ID (선택 사항) */
    goalId: z.string().nullable(),

    /** 반복 타입 */
    repeatType: repeatTypeSchema,

    /** 중요 표시 */
    isImportant: z.boolean(),

    /** 투두 날짜 (YYYY-MM-DD 형식) */
    date: z.string().min(1, '날짜를 선택해주세요'),

    /** 루틴 기간 설정 (반복이 none이 아닐 때만 사용) */
    routineDuration: routineDurationSchema.optional(),
  })
  .refine(
    data => {
      // repeatType이 'none'이면 routineDuration 검증 불필요
      if (data.repeatType === 'none') return true;
      // 반복 설정 시 routineDuration 필수
      return data.routineDuration?.startDate && data.routineDuration?.endDate;
    },
    {
      message: '반복 기간을 설정해주세요',
      path: ['routineDuration'],
    }
  )
  .refine(
    data => {
      // repeatType이 'none'이거나 routineDuration이 없으면 검증 불필요
      if (data.repeatType === 'none' || !data.routineDuration) return true;
      // 종료일이 시작일 이후인지 확인
      return new Date(data.routineDuration.startDate) <= new Date(data.routineDuration.endDate);
    },
    {
      message: '종료일은 시작일 이후여야 합니다',
      path: ['routineDuration'],
    }
  );

/**
 * Todo Form 데이터 타입 (스키마에서 추론)
 */
export type TodoFormSchemaType = z.infer<typeof todoFormSchema>;

export default todoFormSchema;
