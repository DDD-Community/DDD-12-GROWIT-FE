import { CreateGoalRequestType } from '@/model/goal/dto';
import { apiClient } from '@/shared/lib/apiClient';
import { GoalFormData } from '@/shared/type/form';
import { CommonResponse } from '@/shared/type/response';

export interface CreateGoalResponseData {
  id: string;
  planet: {
    name: string;
    image: {
      done: string;
      progress: string;
    };
  };
}

type CreateGoalResponseType = CommonResponse<CreateGoalResponseData>;

export async function postCreateGoal(formData: GoalFormData) {
  const { duration, durationDate, ...rest } = formData;
  const dto: CreateGoalRequestType = {
    ...rest,
    duration: durationDate,
  };
  const { data } = await apiClient.post<CreateGoalResponseType, CreateGoalRequestType>('/goals', dto);

  return data.data;
}
