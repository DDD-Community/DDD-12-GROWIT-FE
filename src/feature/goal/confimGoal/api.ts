import { apiClient } from '@/shared/lib/apiClient';
import { GoalFormData } from '@/shared/type/form';
import { CommonResponse } from '@/shared/type/response';
import { MentorCharacterType } from '../mentorCharacterCard';

// API Request DTO - duration 필드 제외
export interface CreateGoalRequestDto {
  category: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  toBe: string;
  plans: {
    content: string;
    weekOfMonth: number;
  }[];
}

export interface CreateGoalResponseData {
  id: string;
  mentor: MentorCharacterType;
}

interface CreateGoalResponseDto extends CommonResponse<CreateGoalResponseData> {}

export async function postCreateGoal(formData: GoalFormData) {
  const { duration, durationDate, ...rest } = formData;
  const dto: CreateGoalRequestDto = {
    ...rest,
    duration: durationDate,
  };
  const { data } = await apiClient.post<CreateGoalResponseDto, CreateGoalRequestDto>('/goals', dto);

  return data.data;
}
